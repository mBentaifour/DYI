from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User
from app.models.product import Product
from app.models.order import Order
from app.models.category import Category
from app import db
from functools import wraps

admin_bp = Blueprint('admin', __name__)

def admin_required(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if not user or not user.is_admin:
            return jsonify({'error': 'Admin access required'}), 403
        return fn(*args, **kwargs)
    return wrapper

@admin_bp.route('/admin/products', methods=['GET'])
@admin_required
def get_all_products():
    products = Product.query.all()
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

@admin_bp.route('/admin/orders', methods=['GET'])
@admin_required
def get_all_orders():
    orders = Order.query.all()
    return jsonify([{
        'id': o.id,
        'user_email': o.user.email,
        'total_amount': o.total_amount,
        'status': o.status,
        'created_at': o.created_at.isoformat()
    } for o in orders])

@admin_bp.route('/admin/users', methods=['GET'])
@admin_required
def get_all_users():
    users = User.query.all()
    return jsonify([{
        'id': u.id,
        'email': u.email,
        'username': u.username,
        'is_admin': u.is_admin,
        'created_at': u.created_at.isoformat()
    } for u in users])

@admin_bp.route('/admin/products', methods=['POST'])
@admin_required
def create_product():
    data = request.get_json()
    
    # Validate category exists
    category = Category.query.get(data.get('category_id'))
    if not category:
        return jsonify({'error': 'Category not found'}), 404
        
    product = Product(
        name=data['name'],
        slug=data['slug'],
        description=data['description'],
        price=data['price'],
        category_id=data['category_id'],
        image_url=data.get('image_url'),
        stock=data.get('stock', 0)
    )
    db.session.add(product)
    db.session.commit()
    
    return jsonify({
        'message': 'Product created successfully',
        'product': {
            'id': product.id,
            'name': product.name,
            'slug': product.slug,
            'description': product.description,
            'price': product.price,
            'stock': product.stock,
            'category_id': product.category_id,
            'category_name': product.category.name,
            'image_url': product.image_url
        }
    }), 201

@admin_bp.route('/admin/products/<int:id>', methods=['PUT'])
@admin_required
def update_product(id):
    product = Product.query.get_or_404(id)
    data = request.get_json()
    
    if 'category_id' in data:
        category = Category.query.get(data['category_id'])
        if not category:
            return jsonify({'error': 'Category not found'}), 404
    
    product.name = data.get('name', product.name)
    product.slug = data.get('slug', product.slug)
    product.description = data.get('description', product.description)
    product.price = data.get('price', product.price)
    product.category_id = data.get('category_id', product.category_id)
    product.image_url = data.get('image_url', product.image_url)
    product.stock = data.get('stock', product.stock)
    
    db.session.commit()
    return jsonify({
        'message': 'Product updated successfully',
        'product': {
            'id': product.id,
            'name': product.name,
            'slug': product.slug,
            'description': product.description,
            'price': product.price,
            'stock': product.stock,
            'category_id': product.category_id,
            'category_name': product.category.name,
            'image_url': product.image_url
        }
    })

@admin_bp.route('/admin/products/<int:id>', methods=['DELETE'])
@admin_required
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted successfully'})

@admin_bp.route('/admin/orders/<int:id>/status', methods=['PUT'])
@admin_required
def update_order_status(id):
    order = Order.query.get_or_404(id)
    data = request.get_json()
    order.status = data['status']
    db.session.commit()
    return jsonify({'message': 'Order status updated successfully'}) 