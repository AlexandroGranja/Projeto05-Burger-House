from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os
import json
from datetime import datetime

app = Flask(__name__, static_folder='../frontend/build')

# Configurar CORS
CORS(app, origins=["*"])  # Em produção, especifique o domínio

# Diretório para salvar pedidos
ORDERS_DIR = 'orders'
if not os.path.exists(ORDERS_DIR):
    os.makedirs(ORDERS_DIR)

@app.route('/health')
def health_check():
    return jsonify({
        "status": "healthy",
        "message": "🍔 Burger House API funcionando!",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/')
def home():
    return jsonify({
        "message": "🍔 Bem-vindo ao Burger House API",
        "endpoints": {
            "/health": "Health check",
            "/api/burgers": "Lista de hambúrgueres",
            "/api/orders": "Criar pedido (POST)"
        }
    })

@app.route('/api/burgers')
def get_burgers():
    burgers = [
        {
            "id": 1,
            "name": "Big Burger",
            "price": 25.99,
            "description": "Hambúrguer artesanal com carne 200g, queijo cheddar, alface, tomate e molho especial",
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
        },
        {
            "id": 4,
            "name": "Veggie Burger",
            "price": 18.99,
            "description": "Hambúrguer vegetariano com blend de grãos e legumes",
            "image": "/images/veggie-burger.jpg"
        }
    ]
    return jsonify(burgers)

@app.route('/api/orders', methods=['POST'])
def create_order():
    try:
        order_data = request.get_json()
        
        if not order_data:
            return jsonify({"error": "Dados do pedido não fornecidos"}), 400
        
        # Gerar ID único para o pedido
        order_id = f"order_{int(datetime.now().timestamp())}"
        
        # Adicionar informações do pedido
        order = {
            "id": order_id,
            "timestamp": datetime.now().isoformat(),
            "items": order_data.get('items', []),
            "customer": order_data.get('customer', {}),
            "total": order_data.get('total', 0),
            "status": "received"
        }
        
        # Salvar pedido em arquivo JSON
        order_file = os.path.join(ORDERS_DIR, f"{order_id}.json")
        with open(order_file, 'w') as f:
            json.dump(order, f, indent=2)
        
        return jsonify({
            "message": "Pedido criado com sucesso!",
            "order_id": order_id,
            "estimated_time": "30-45 minutos"
        }), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/orders/<order_id>')
def get_order(order_id):
    try:
        order_file = os.path.join(ORDERS_DIR, f"{order_id}.json")
        if os.path.exists(order_file):
            with open(order_file, 'r') as f:
                order = json.load(f)
            return jsonify(order)
        else:
            return jsonify({"error": "Pedido não encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Servir arquivos estáticos do React (fallback)
@app.route('/<path:path>')
def serve_react_app(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    host = '0.0.0.0'
    
    print(f"🚀 Iniciando Burger House API em {host}:{port}")
    print(f"📁 Diretório de pedidos: {ORDERS_DIR}")
    
    app.run(
        host=host,
        port=port,
        debug=False,  # Nunca use debug=True em produção
        threaded=True
    )