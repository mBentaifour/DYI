from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS

# Initialize extensions
db = SQLAlchemy()
jwt = JWTManager()
cors = CORS()

# JWT configuration
@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id if user else None

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    from .models import User
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()

# Error handlers
@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return {"message": "Token has expired"}, 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return {"message": "Invalid token"}, 401

@jwt.unauthorized_loader
def missing_token_callback(error):
    return {"message": "Request does not contain valid token"}, 401 