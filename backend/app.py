# Imports restaurados, MENOS o pywhatkit
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime
# import pywhatkit as kit  # <- ESSA LINHA CONTINUA COMENTADA
import time

app = Flask(__name__)
CORS(app)  # CORS foi reativado

# Pasta para salvar os pedidos
ORDERS_DIR = 'orders'
if not os.path.exists(ORDERS_DIR):
    os.makedirs(ORDERS_DIR)

@app.route('/')
def home():
    # Usamos o jsonify que foi importado novamente
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
        # Como o WhatsApp está desativado, vamos imprimir o pedido no terminal
        # para que você saiba que um novo pedido chegou.
        print("\n--- ✅ NOVO PEDIDO RECEBIDO ---")
        print(json.dumps(order_data, indent=2, ensure_ascii=False))
        print("--------------------------------\n")
        
        # A chamada para a função do WhatsApp continua desativada
        # try:
        #     send_whatsapp_message(order_data)
        # except Exception as e:
        #     print(f"Erro ao tentar enviar WhatsApp: {e}")
        
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

# Todas as outras funções continuam iguais
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

# A função abaixo não será chamada, mas podemos deixá-la para referência futura
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
    message += f"\n\n💰 *Total: R$ {total:.2f}* | 💳 *Pagamento:* {customer['paymentMethod'].title()}"
    return message

# O debug=True foi reativado, o que é útil para desenvolvimento
if __name__ == '__main__':
    app.run(debug=True, port=5000)