from app import create_app
from app.extensions import db
from app.models import Category, Product

def init_db():
    app = create_app()
    with app.app_context():
        # Drop all tables
        db.drop_all()
        
        # Create all tables
        db.create_all()
        
        # Create categories first
        categories = [
            Category(
                name="Outils électriques",
                description="Outils électriques professionnels pour tous vos travaux",
                image_url="https://images.unsplash.com/photo-1504148455328-c376907d081c",
                slug="outils-electriques"
            ),
            Category(
                name="Outils manuels",
                description="Outils manuels de qualité pour le bricolage",
                image_url="https://images.unsplash.com/photo-1530124566582-a618bc2615dc",
                slug="outils-manuels"
            ),
            Category(
                name="Jardinage",
                description="Tout pour l'entretien de votre jardin",
                image_url="https://images.unsplash.com/photo-1557844352-761f2565b576",
                slug="jardinage"
            )
        ]
        
        # Add and commit categories first
        for category in categories:
            db.session.add(category)
        db.session.commit()
        
        # Then create products
        products = [
            {
                "name": "Perceuse sans fil",
                "description": "Perceuse-visseuse 18V avec 2 batteries",
                "price": 129.99,
                "stock": 50,
                "image_url": "https://images.unsplash.com/photo-1504148455328-c376907d081c",
                "category_id": 1,
                "featured": True,
                "slug": "perceuse-sans-fil"
            },
            {
                "name": "Marteau de charpentier",
                "description": "Marteau professionnel 500g",
                "price": 24.99,
                "stock": 100,
                "image_url": "https://images.unsplash.com/photo-1530124566582-a618bc2615dc",
                "category_id": 2,
                "featured": False,
                "slug": "marteau-charpentier"
            },
            {
                "name": "Tondeuse électrique",
                "description": "Tondeuse électrique 1800W avec bac de ramassage",
                "price": 299.99,
                "stock": 20,
                "image_url": "https://images.unsplash.com/photo-1557844352-761f2565b576",
                "category_id": 3,
                "featured": True,
                "slug": "tondeuse-electrique"
            }
        ]
        
        # Add and commit products
        for product_data in products:
            product = Product(**product_data)
            db.session.add(product)
        
        db.session.commit()
        print("Base de données initialisée avec succès!")

if __name__ == "__main__":
    init_db()

from flask import Flask
from models import db, Category, Product  # adjust imports as needed

def init_db():
    # Create Flask app
    app = Flask(__name__)
    
    # Configure database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///store.db'  # adjust URI as needed
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize db with app
    db.init_app(app)
    
    # Use app context
    with app.app_context():
        # Drop and create tables
        db.drop_all()
        db.create_all()
        
        # Your existing category and product creation code here
        categories = [...]
        for category in categories:
            db.session.add(category)
        db.session.commit()