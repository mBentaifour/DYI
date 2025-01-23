# Documentation Backend - E-commerce DIY Store

## Configuration du Projet

### Structure des Dossiers
```
backend/
├── app/
│   ├── __init__.py
│   ├── config.py
│   ├── extensions.py
│   ├── models.py
│   └── routes/
│       └── api.py
├── instance/
├── venv/
├── .env
├── init_db.py
└── run.py
```

### Installation et Configuration

1. **Création de l'environnement virtuel**
```bash
# Dans Git Bash
python -m venv venv
source venv/Scripts/activate

# Dans PowerShell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

2. **Installation des dépendances**
```bash
pip install flask==2.3.3
pip install flask-sqlalchemy==3.1.1
pip install flask-cors==4.0.0
pip install flask-jwt-extended==4.5.2
pip install python-dotenv==1.0.0
pip install python-slugify
```

3. **Variables d'environnement (.env)**
```
FLASK_APP=run.py
FLASK_ENV=development
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///instance/app.db
```

## Base de Données

### Modèles

#### Category
- `id`: Integer, Primary Key
- `name`: String(100), Required
- `slug`: String(100), Unique, Required
- `description`: Text
- `image_url`: String(255)
- `products`: Relationship avec Product

#### Product
- `id`: Integer, Primary Key
- `name`: String(100), Required
- `slug`: String(100), Unique, Required
- `description`: Text
- `price`: Float, Required
- `stock`: Integer, Default 0
- `image_url`: String(255)
- `featured`: Boolean, Default False
- `category_id`: Integer, Foreign Key

### Initialisation de la Base de Données
```bash
# Supprimer l'ancienne base de données si elle existe
rm -f instance/app.db

# Créer et initialiser la nouvelle base de données
python init_db.py
```

## API Endpoints

### Catégories

#### GET /api/categories
- Description: Récupère toutes les catégories
- Réponse: Liste des catégories
```json
[
    {
        "id": 1,
        "name": "Outils électriques",
        "slug": "outils-electriques",
        "description": "...",
        "image_url": "..."
    }
]
```

#### GET /api/categories/<slug>
- Description: Récupère une catégorie spécifique
- Paramètres URL: slug (string)
- Réponse: Détails de la catégorie

### Produits

#### GET /api/products
- Description: Récupère tous les produits
- Paramètres Query:
  - category_id (optional): Filtre par catégorie
  - featured (optional): Filtre les produits mis en avant
- Réponse: Liste des produits

#### GET /api/products/<slug>
- Description: Récupère un produit spécifique
- Paramètres URL: slug (string)
- Réponse: Détails du produit

#### GET /api/products/featured
- Description: Récupère les produits mis en avant
- Réponse: Liste des produits featured

### Recherche

#### GET /api/search
- Description: Recherche des produits
- Paramètres Query:
  - q: Terme de recherche
- Réponse: Liste des produits correspondants

## Démarrage du Serveur

```bash
# Dans Git Bash
cd backend
source venv/Scripts/activate
python run.py

# Dans PowerShell
cd backend
.\venv\Scripts\Activate.ps1
python run.py
```

Le serveur démarre sur http://localhost:5000

## Résolution des Problèmes Courants

1. **ModuleNotFoundError: No module named 'flask'**
   - Solution: Activer l'environnement virtuel et réinstaller les dépendances

2. **sqlite3.OperationalError: no such table**
   - Solution: Réinitialiser la base de données avec `python init_db.py`

3. **"featured" is an invalid keyword argument**
   - Solution: Vérifier que le modèle Product inclut bien le champ featured

4. **CORS error in frontend**
   - Solution: Vérifier la configuration CORS dans extensions.py et __init__.py 