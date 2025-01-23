from flask import Blueprint, jsonify, request, current_app
from models import db, Product, Category, Review, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import or_

api = Blueprint('api', __name__)

@api.route('/')
def index():
    current_app.logger.info('Accessing API root')
    return jsonify({
        'status': 'success',
        'message': 'DIY Store API is running',
        'version': '1.0',
        'endpoints': {
            'products': '/api/products',
            'categories': '/api/categories',
            'product_detail': '/api/products/<id>',
        }
    })

@api.route('/products', methods=['GET'])
def get_products():
    current_app.logger.info('Fetching products with params: %s', request.args)
    category_id = request.args.get('category')
    search = request.args.get('search')
    sort = request.args.get('sort', 'name')
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)
    
    query = Product.query
    
    if category_id:
        query = query.filter_by(category_id=category_id)
    
    if search:
        search_term = f"%{search}%"
        query = query.filter(or_(
            Product.name.ilike(search_term),
            Product.description.ilike(search_term)
        ))
    
    if min_price is not None:
        query = query.filter(Product.price >= min_price)
    
    if max_price is not None:
        query = query.filter(Product.price <= max_price)
    
    if sort == 'price_asc':
        query = query.order_by(Product.price.asc())
    elif sort == 'price_desc':
        query = query.order_by(Product.price.desc())
    elif sort == 'newest':
        query = query.order_by(Product.created_at.desc())
    else:
        query = query.order_by(Product.name.asc())
    
    products = query.all()
    current_app.logger.info('Found %d products', len(products))
    
    return jsonify([{
        'id': p.id,
        'name': p.name,
        'description': p.description,
        'price': p.price,
        'old_price': p.old_price,
        'stock': p.stock,
        'image_url': p.image_url,
        'category_id': p.category_id,
        'average_rating': p.average_rating
    } for p in products])

@api.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify({
        'id': product.id,
        'name': product.name,
        'description': product.description,
        'price': product.price,
        'old_price': product.old_price,
        'stock': product.stock,
        'image_url': product.image_url,
        'category_id': product.category_id,
        'category': {
            'id': product.category.id,
            'name': product.category.name,
            'slug': product.category.slug
        },
        'average_rating': product.average_rating,
        'reviews': [{
            'id': r.id,
            'rating': r.rating,
            'comment': r.comment,
            'user': {
                'id': r.user.id,
                'name': f"{r.user.first_name} {r.user.last_name}"
            },
            'created_at': r.created_at.isoformat()
        } for r in product.reviews]
    })

@api.route('/categories', methods=['GET'])
def get_categories():
    current_app.logger.info('Fetching all categories')
    categories = Category.query.all()
    current_app.logger.info('Found %d categories', len(categories))
    return jsonify([{
        'id': c.id,
        'name': c.name,
        'slug': c.slug,
        'description': c.description,
        'image_url': c.image_url
    } for c in categories])

@api.route('/categories/<slug>', methods=['GET'])
def get_category_by_slug(slug):
    current_app.logger.info('Fetching category with slug: %s', slug)
    category = Category.query.filter_by(slug=slug).first_or_404()
    return jsonify({
        'id': category.id,
        'name': category.name,
        'slug': category.slug,
        'description': category.description,
        'image_url': category.image_url
    })

@api.route('/products/<int:id>/reviews', methods=['POST'])
@jwt_required()
def add_review(id):
    user_id = get_jwt_identity()
    data = request.get_json()
    
    # Vérifier si l'utilisateur a déjà laissé un avis
    existing_review = Review.query.filter_by(
        product_id=id,
        user_id=user_id
    ).first()
    
    if existing_review:
        return jsonify({
            'error': 'Vous avez déjà laissé un avis pour ce produit'
        }), 400
    
    review = Review(
        rating=data['rating'],
        comment=data['comment'],
        product_id=id,
        user_id=user_id
    )
    
    db.session.add(review)
    db.session.commit()
    
    return jsonify({
        'id': review.id,
        'rating': review.rating,
        'comment': review.comment,
        'user': {
            'id': review.user.id,
            'name': f"{review.user.first_name} {review.user.last_name}"
        },
        'created_at': review.created_at.isoformat()
    }), 201 