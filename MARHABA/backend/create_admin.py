from app import create_app, db
from app.models.user import User

def create_superuser():
    app = create_app()
    with app.app_context():
        email = input("Email du superutilisateur: ")
        username = input("Nom d'utilisateur: ")
        password = input("Mot de passe: ")

        # Vérifier si l'utilisateur existe déjà
        if User.query.filter_by(email=email).first():
            print("Un utilisateur avec cet email existe déjà!")
            return

        user = User(
            email=email,
            username=username,
            is_admin=True
        )
        user.set_password(password)
        
        db.session.add(user)
        db.session.commit()
        print("Superutilisateur créé avec succès!")

if __name__ == "__main__":
    create_superuser() 