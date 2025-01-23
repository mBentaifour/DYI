from flask import Blueprint, jsonify, current_app
from app.models.category import Category

categories_bp = Blueprint('categories', __name__)

@categories_bp.route('/categories', methods=['GET'])
def get_categories():
    current_app.logger.info('Fetching all categories')
    categories = Category.query.all()
    return jsonify([{
        'id': c.id,
        'name': c.name,
        'slug': c.slug,
        'description': c.description,
        'image_url': c.image_url
    } for c in categories])

@categories_bp.route('/categories/<slug>', methods=['GET'])
def get_category_by_slug(slug):
    current_app.logger.info('Fetching category with slug: %s', slug)
    category = Category.query.filter_by(slug=slug).first_or_404()
    return jsonify({
        'id': category.id,
        'name': category.name,
        'slug': category.slug,
        'description': category.description,
        'image_url': category.image_url,
        'products': [{
            'id': p.id,
            'name': p.name,
            'slug': p.slug,
            'description': p.description,
            'price': p.price,
            'stock': p.stock,
            'image_url': p.image_url
        } for p in category.products]
    }) 