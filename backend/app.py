# Imports restaurados, MENOS o pywhatkit
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime
import time
import requests   # 🚀 Novo import para mandar pedido ao n8n

app = Flask(__name__)
CORS(app)  # CORS foi reativado

# Pasta para salvar os pedidos
ORDERS_DIR = 'orders'
if not os.path.exists(ORDERS_DIR):
    os.makedirs(ORDERS_DIR)

# URL do Webhook n8n
N8N_WEBHOOK_URL = "https://alexandro-granja.up.railway.app/webhook/order-status-update"

@app.route('/')
def home():
    return jsonify({"message": "API Burger House funcionando!"})

@app.route('/api/orders', methods=['POST'])
def create_order():
    try:
        order_data = request.json
        order_id = f"order_{int(time.time())}"
        order_data['id'] = order_id
        order_data['created_at'] = datetime.now().isoformat()
        order_data['status'] = 'pending'
        
        order_file = os.path.join(ORDERS_DIR, f"{order_id}.json")
        with open(order_file, 'w', encoding='utf-8') as f:
            json.dump(order_data, f, ensure_ascii=False, indent=2)
        
        # --- NOTIFICAÇÃO NO TERMINAL ---
        print("\n--- ✅ NOVO PEDIDO RECEBIDO ---")
        print(json.dumps(order_data, indent=2, ensure_ascii=False))
        print("--------------------------------\n")

        # --- 🚀 ENVIA PEDIDO PARA N8N ---
        try:
            requests.post(N8N_WEBHOOK_URL, json=order_data, timeout=5)
            print("✅ Pedido enviado para n8n com sucesso!")
        except Exception as e:
            print(f"⚠️ Erro ao enviar pedido para n8n: {e}")

        return jsonify({
            "status": "success", 
            "message": "Pedido criado com sucesso!",
            "order_id": order_id
        })
        
    except Exception as e:
        return jsonify({
            "status": "error", 
            "message": f"Erro ao criar pedido: {str(e)}"
        }), 500

@app.route('/api/orders', methods=['GET'])
def get_orders():
    try:
        orders = []
        for filename in sorted(os.listdir(ORDERS_DIR), reverse=True):
            if filename.endswith('.json'):
                with open(os.path.join(ORDERS_DIR, filename), 'r', encoding='utf-8') as f:
                    orders.append(json.load(f))
        return jsonify(orders)
    except Exception as e:
        return jsonify({"status": "error", "message": f"Erro ao buscar pedidos: {str(e)}"}), 500

@app.route('/api/orders/<order_id>', methods=['PUT'])
def update_order_status(order_id):
    try:
        data = request.json
        new_status = data.get('status')
        order_file = os.path.join(ORDERS_DIR, f"{order_id}.json")
        if not os.path.exists(order_file):
            return jsonify({"status": "error", "message": "Pedido não encontrado"}), 404
        with open(order_file, 'r', encoding='utf-8') as f:
            order_data = json.load(f)
        order_data['status'] = new_status
        order_data['updated_at'] = datetime.now().isoformat()
        with open(order_file, 'w', encoding='utf-8') as f:
            json.dump(order_data, f, ensure_ascii=False, indent=2)
        return jsonify({"status": "success", "message": "Status atualizado"})
    except Exception as e:
        return jsonify({"status": "error", "message": f"Erro ao atualizar pedido: {str(e)}"}), 500

def format_order_message(order_data):
    customer = order_data['customer']
    items = order_data['items']
    total = order_data['total']
    message = f"""🍔 *NOVO PEDIDO - BURGER HOUSE*
👤 *Cliente:* {customer['name']} | 📱 *Telefone:* {customer['phone']}
📍 *Endereço:* {customer['address']}, {customer['neighborhood']}"""
    if customer['complement']:
        message += f", {customer['complement']}"
    message += "\n\n🛒 *Itens do Pedido:*"
    for item in items:
        message += f"\n• {item['quantity']}x {item['name']} - R$ {(item['price'] * item['quantity']):.2f}"
    message += f"\n\n💰 *Total: R$ {total:.2f}* | 💳 *Pagamento:* {customer['paymentMethod'].title()}"""
    return message

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  
    app.run(host='0.0.0.0', port=port, debug=False)  