from flask import Blueprint, jsonify, request
from ..models import Product, Category
from ..extensions import db

api = Blueprint('api', __name__)

# Routes pour les catégories
@api.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([category.to_dict() for category in categories])

@api.route('/categories/<string:slug>', methods=['GET'])
def get_category(slug):
    category = Category.query.filter_by(slug=slug).first_or_404()
    return jsonify(category.to_dict())

# Routes pour les produits
@api.route('/products', methods=['GET'])
def get_products():
    category_id = request.args.get('category_id', type=int)
    featured = request.args.get('featured', type=bool)
    
    query = Product.query
    
    if category_id:
        query = query.filter_by(category_id=category_id)
    if featured is not None:
        query = query.filter_by(featured=featured)
    
    products = query.all()
    return jsonify([product.to_dict() for product in products])

@api.route('/products/<string:slug>', methods=['GET'])
def get_product(slug):
    product = Product.query.filter_by(slug=slug).first_or_404()
    return jsonify(product.to_dict())

@api.route('/products/featured', methods=['GET'])
def get_featured_products():
    products = Product.query.filter_by(featured=True).all()
    return jsonify([product.to_dict() for product in products])

# Route pour la recherche
@api.route('/search', methods=['GET'])
def search():
    query = request.args.get('q', '')
    if not query:
        return jsonify([])
    
    products = Product.query.filter(
        (Product.name.ilike(f'%{query}%')) |
        (Product.description.ilike(f'%{query}%'))
    ).all()
    
    return jsonify([product.to_dict() for product in products]) 