from flask import Blueprint, jsonify, request, current_app
from flask_jwt_extended import jwt_required
from app.models.product import Product
from app.models.category import Category
from sqlalchemy import or_
from app import db

products_bp = Blueprint('products', __name__)

@products_bp.route('/products', methods=['GET'])
def get_products():
    current_app.logger.info('Fetching products with params: %s', request.args)
    category_id = request.args.get('category')
    search = request.args.get('search')
    sort = request.args.get('sort', 'name')
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)
    in_stock = request.args.get('inStock', type=lambda x: x.lower() == 'true')
    
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
        
    if in_stock:
        query = query.filter(Product.stock > 0)
    
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
        'slug': p.slug,
        'description': p.description,
        'price': p.price,
        'stock': p.stock,
        'image_url': p.image_url,
        'category_id': p.category_id,
        'category_name': p.category.name if p.category else None,
        'created_at': p.created_at.isoformat()
    } for p in products])

@products_bp.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify({
        'id': product.id,
        'name': product.name,
        'slug': product.slug,
        'description': product.description,
        'price': product.price,
        'stock': product.stock,
        'image_url': product.image_url,
        'category_id': product.category_id,
        'category_name': product.category.name if product.category else None,
        'created_at': product.created_at.isoformat()
    }) 