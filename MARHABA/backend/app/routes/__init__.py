from flask import Blueprint, jsonify, request
from ..models import Category, Product

api = Blueprint('api', __name__)

@api.route('/categories')
def get_categories():
    categories = Category.query.all()
    return jsonify([{
        'id': c.id,
        'name': c.name,
        'slug': c.slug,
        'description': c.description,
        'image_url': c.image_url
    } for c in categories])

@api.route('/products')
def get_products():
    category_id = request.args.get('category_id', type=int)
    query = Product.query
    
    if category_id:
        query = query.filter_by(category_id=category_id)
    
    products = query.all()
    return jsonify([{
        'id': p.id,
        'name': p.name,
        'slug': p.slug,
        'description': p.description,
        'price': p.price,
        'stock': p.stock,
        'image_url': p.image_url,
        'category_id': p.category_id
    } for p in products]) 