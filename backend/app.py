from flask import Flask, jsonify, request, send_from_directory, send_file
from flask_cors import CORS
import os
import json
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create Flask app with static folder pointing to React build
app = Flask(__name__, static_folder='static', static_url_path='/')

# Configure CORS - CORRIGIDO para permitir todas as origens
CORS(app, resources={r"/*": {"origins": "*"}})

# Create orders directory if it doesn't exist
ORDERS_DIR = 'orders'
os.makedirs(ORDERS_DIR, exist_ok=True)

# Startup checks - usando app_context em vez de before_first_request
with app.app_context():
    logger.info("🍔 Burger House API starting...")
    logger.info(f"📦 Static folder: {app.static_folder}")
    logger.info(f"📂 Working directory: {os.getcwd()}")
    
    # List contents of current directory
    logger.info("📋 Directory contents:")
    for item in os.listdir('.'):
        logger.info(f"   {item}")
    
    # Check static folder
    if os.path.exists(app.static_folder):
        logger.info(f"✅ Static folder exists: {app.static_folder}")
        static_files = os.listdir(app.static_folder)
        logger.info(f"📄 Static files: {static_files}")
        
        if 'index.html' in static_files:
            logger.info("✅ index.html found")
        else:
            logger.warning("⚠️ index.html not found in static folder")
    else:
        logger.error(f"❌ Static folder not found: {app.static_folder}")

# Rota para página admin - NOVA ROTA ADICIONADA
@app.route('/adm-pagina.html')
def serve_admin():
    try:
        return send_from_directory('templates', 'adm-pagina.html')
    except Exception as e:
        logger.error(f"Error serving admin page: {str(e)}")
        return jsonify({"error": "Admin page not found"}), 404

# API Routes
@app.route('/api/health')
def health_check():
    return jsonify({
        "status": "healthy",
        "message": "🍔 Burger House API is running!",
        "timestamp": datetime.now().isoformat(),
        "static_folder_exists": os.path.exists(app.static_folder),
        "index_html_exists": os.path.exists(os.path.join(app.static_folder, 'index.html')) if os.path.exists(app.static_folder) else False
    })

@app.route('/api/test')
def test_endpoint():
    return jsonify({
        "message": "Test endpoint working!",
        "cwd": os.getcwd(),
        "static_folder": app.static_folder,
        "files_in_static": os.listdir(app.static_folder) if os.path.exists(app.static_folder) else "Static folder not found"
    })

@app.route('/api/burgers')
def get_burgers():
    burgers = [
        {
            "id": 1,
            "name": "Big Burger",
            "price": 25.99,
            "description": "Hambúrguer artesanal com carne 200g, queijo cheddar, alface e tomate",
            "image": "/images/big-burger.jpg"
        },
        {
            "id": 2,
            "name": "Cheese Burger", 
            "price": 19.99,
            "description": "Hambúrguer clássico com carne 150g e queijo derretido",
            "image": "/images/cheese-burger.jpg"
        },
        {
            "id": 3,
            "name": "Chicken Burger",
            "price": 22.99,
            "description": "Hambúrguer de frango grelhado com maionese temperada",
            "image": "/images/chicken-burger.jpg"
        }
    ]
    return jsonify({"burgers": burgers})

# ✅✅✅ NOVA ROTA ADICIONADA: GET /api/orders ✅✅✅
@app.route('/api/orders', methods=['GET'])
def get_orders():
    try:
        logger.info("📋 Loading orders...")
        orders = []
        if os.path.exists(ORDERS_DIR):
            order_files = os.listdir(ORDERS_DIR)
            logger.info(f"📁 Found {len(order_files)} order files")
            
            for filename in order_files:
                if filename.endswith('.json'):
                    with open(os.path.join(ORDERS_DIR, filename), 'r') as f:
                        order_data = json.load(f)
                        orders.append(order_data)
        
        logger.info(f"✅ Returning {len(orders)} orders")
        return jsonify({"orders": orders})
    except Exception as e:
        logger.error(f"❌ Error getting orders: {str(e)}")
        return jsonify({"error": "Failed to get orders"}), 500

@app.route('/api/orders', methods=['POST'])
def create_order():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        order_id = f"order_{int(datetime.now().timestamp())}"
        order = {
            "id": order_id,
            "timestamp": datetime.now().isoformat(),
            "items": data.get('items', []),
            "customer": data.get('customer', {}),
            "total": data.get('total', 0),
            "status": "confirmed"
        }
        
        # Save order to JSON file
        with open(os.path.join(ORDERS_DIR, f"{order_id}.json"), 'w') as f:
            json.dump(order, f, indent=2)
        
        logger.info(f"📝 Order created: {order_id}")
        
        return jsonify({
            "success": True,
            "message": "Pedido confirmado!",
            "order_id": order_id,
            "estimated_time": "30-45 minutes"
        })
        
    except Exception as e:
        logger.error(f"Error creating order: {str(e)}")
        return jsonify({"error": "Failed to create order"}), 500
    
    @app.route('/api/orders/<order_id>', methods=['PUT'])
def update_order_status(order_id):
    try:
        data = request.get_json()
        new_status = data.get('status')
        
        if not new_status:
            return jsonify({"error": "Status não fornecido"}), 400
        
        # Encontre o arquivo do pedido
        order_file = os.path.join(ORDERS_DIR, f"{order_id}.json")
        
        if not os.path.exists(order_file):
            return jsonify({"error": "Pedido não encontrado"}), 404
        
        # Atualize o status
        with open(order_file, 'r') as f:
            order = json.load(f)
        
        order['status'] = new_status
        
        with open(order_file, 'w') as f:
            json.dump(order, f, indent=2)
        
        logger.info(f"📝 Order {order_id} status updated to: {new_status}")
        
        return jsonify({"success": True, "message": "Status atualizado"})
        
    except Exception as e:
        logger.error(f"Error updating order status: {str(e)}")
        return jsonify({"error": "Failed to update order status"}), 500
    

# Serve React App (catch all routes)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    # If it's an API route that doesn't exist, return 404
    if path.startswith('api/') or path.startswith('images/') or path.startswith('static/'):
        # Tenta servir o arquivo estático se for uma rota de imagem ou estática
        if os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        return jsonify({"error": "API endpoint or static file not found"}), 404
    
    # Try to serve static file first
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    
    # Otherwise serve index.html (React Router will handle routing)
    try:
        index_path = os.path.join(app.static_folder, 'index.html')
        if os.path.exists(index_path):
            return send_file(index_path)
        else:
            logger.error(f"index.html not found at {index_path}")
            return jsonify({
                "error": "Frontend not available",
                "message": "React app build files not found",
                "debug_info": {
                    "static_folder": app.static_folder,
                    "index_path": index_path,
                    "static_folder_exists": os.path.exists(app.static_folder),
                    "static_contents": os.listdir(app.static_folder) if os.path.exists(app.static_folder) else None
                }
            }), 404
    except Exception as e:
        logger.error(f"Error serving React app: {str(e)}")
        return jsonify({"error": "Server error", "message": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    
    print("🍔 Starting Burger House Application")
    print(f"📡 Server running on port {port}")
    print(f"📁 Static folder: {app.static_folder}")
    print(f"📦 Orders directory: {ORDERS_DIR}")
    print(f"🌍 Environment PORT: {os.environ.get('PORT', 'Not set')}")
    
    app.run(
        host='0.0.0.0',
        port=port,
        debug=False
    )