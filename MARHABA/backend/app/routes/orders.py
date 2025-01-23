from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.order import Order, OrderItem
from app.models.product import Product
from app import db

orders_bp = Blueprint('orders', __name__)

@orders_bp.route('/orders', methods=['POST'])
@jwt_required()
def create_order():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    order = Order(
        user_id=user_id,
        total_amount=data['total_amount']
    )
    db.session.add(order)
    
    for item in data['items']:
        order_item = OrderItem(
            order=order,
            product_id=item['product_id'],
            quantity=item['quantity'],
            price=item['price']
        )
        db.session.add(order_item)
    
    db.session.commit()
    return jsonify({'message': 'Order created successfully'}), 201

@orders_bp.route('/orders', methods=['GET'])
@jwt_required()
def get_user_orders():
    user_id = get_jwt_identity()
    orders = Order.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': order.id,
        'status': order.status,
        'total_amount': order.total_amount,
        'created_at': order.created_at
    } for order in orders]) 