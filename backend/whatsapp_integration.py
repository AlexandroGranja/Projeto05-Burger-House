import pywhatkit as kit
from datetime import datetime, timedelta
import time
import webbrowser

class WhatsAppIntegration:
    def __init__(self, restaurant_phone="+5521999999999"):
        """
        Inicializa a integração com WhatsApp
        
        Args:
            restaurant_phone (str): Número do restaurante no formato +55DDNNNNNNNNN
        """
        self.restaurant_phone = restaurant_phone
    
    def send_order_notification(self, order_data):
        """
        Envia notificação de pedido via WhatsApp
        
        Args:
            order_data (dict): Dados do pedido
        """
        try:
            message = self._format_order_message(order_data)
            
            # Método 1: Envio instantâneo (abre WhatsApp Web)
            self._send_instant_message(message)
            
            # Método 2: Envio programado (mais confiável)
            # self._send_scheduled_message(message)
            
            return {"status": "success", "message": "Mensagem enviada com sucesso"}
            
        except Exception as e:
            return {"status": "error", "message": f"Erro ao enviar mensagem: {str(e)}"}
    
    def _send_instant_message(self, message):
        """Envia mensagem instantânea via WhatsApp Web"""
        kit.sendwhatmsg_instantly(
            phone_no=self.restaurant_phone,
            message=message,
            wait_time=10,  # Tempo de espera em segundos
            tab_close=True,  # Fecha a aba automaticamente
            close_time=3     # Tempo para fechar a aba
        )
    
    def _send_scheduled_message(self, message):
        """Envia mensagem programada para o próximo minuto"""
        now = datetime.now()
        send_time = now + timedelta(minutes=1)
        
        kit.sendwhatmsg(
            phone_no=self.restaurant_phone,
            message=message,
            time_hour=send_time.hour,
            time_min=send_time.minute,
            wait_time=10,
            tab_close=True,
            close_time=3
        )
    
    def _format_order_message(self, order_data):
        """Formata mensagem do pedido para WhatsApp"""
        customer = order_data['customer']
        items = order_data['items']
        total = order_data['total']
        order_id = order_data.get('id', 'N/A')
        
        # Cabeçalho
        message = f"""🍔 *NOVO PEDIDO - BURGER HOUSE*
📋 *Pedido:* #{order_id}

👤 *DADOS DO CLIENTE*
Nome: {customer['name']}
📱 Telefone: {customer['phone']}

📍 *ENDEREÇO DE ENTREGA*
{customer['address']}
Bairro: {customer['neighborhood']}"""
        
        if customer.get('complement'):
            message += f"\nComplemento: {customer['complement']}"
        
        # Itens do pedido
        message += f"\n\n🛒 *ITENS DO PEDIDO*"
        
        for item in items:
            subtotal = item['price'] * item['quantity']
            message += f"\n• {item['quantity']}x {item['name']}"
            message += f"\n  R$ {item['price']:.2f} cada = R$ {subtotal:.2f}"
        
        # Resumo financeiro
        message += f"\n\n💰 *RESUMO FINANCEIRO*"
        message += f"\nSubtotal: R$ {total:.2f}"
        message += f"\nTaxa de entrega: R$ 5,00"
        message += f"\n*TOTAL: R$ {total + 5:.2f}*"
        
        # Forma de pagamento
        payment_methods = {
            'dinheiro': '💵 Dinheiro',
            'cartao': '💳 Cartão',
            'pix': '📱 PIX'
        }
        payment = payment_methods.get(customer['paymentMethod'], customer['paymentMethod'])
        message += f"\n💳 Pagamento: {payment}"
        
        # Informações adicionais
        message += f"\n\n⏰ *INFORMAÇÕES DO PEDIDO*"
        message += f"\nData/Hora: {datetime.now().strftime('%d/%m/%Y às %H:%M')}"
        message += f"\nTempo estimado: 45-60 minutos"
        message += f"\nStatus: ⏳ Pendente"
        
        message += f"\n\n---"
        message += f"\n🏪 *Burger House*"
        message += f"\n📱 (21) 99999-9999"
        
        return message
    
    def send_status_update(self, order_id, customer_phone, status):
        """
        Envia atualização de status do pedido para o cliente
        
        Args:
            order_id (str): ID do pedido
            customer_phone (str): Telefone do cliente
            status (str): Novo status do pedido
        """
        status_messages = {
            'confirmed': '✅ Seu pedido foi confirmado e está sendo preparado!',
            'preparing': '👨‍🍳 Seu pedido está sendo preparado com carinho!',
            'ready': '🎉 Seu pedido está pronto! Estamos saindo para entrega.',
            'delivered': '🏠 Pedido entregue! Obrigado pela preferência!',
            'cancelled': '❌ Seu pedido foi cancelado. Entre em contato conosco.'
        }
        
        status_msg = status_messages.get(status, f'Status atualizado para: {status}')
        
        message = f"""🍔 *BURGER HOUSE - ATUALIZAÇÃO*
📋 Pedido #{order_id}

{status_msg}

📱 Dúvidas? Entre em contato: (21) 99999-9999"""
        
        try:
            kit.sendwhatmsg_instantly(
                phone_no=customer_phone,
                message=message,
                wait_time=10,
                tab_close=True,
                close_time=3
            )
            return {"status": "success"}
        except Exception as e:
            return {"status": "error", "message": str(e)}

# Exemplo de uso
if __name__ == "__main__":
    # Dados de exemplo
    sample_order = {
        "id": "order_123456",
        "items": [
            {"name": "Burger Clássico", "price": 28.90, "quantity": 2},
            {"name": "Batata Frita", "price": 12.90, "quantity": 1}
        ],
        "total": 70.70,
        "customer": {
            "name": "João Silva",
            "phone": "+5521987654321",
            "address": "Rua das Flores, 123",
            "neighborhood": "Centro",
            "complement": "Apt 201",
            "paymentMethod": "pix"
        }
    }
    
    # Inicializa integração
    whatsapp = WhatsAppIntegration("+5521999999999")
    
    # Envia notificação de pedido
    result = whatsapp.send_order_notification(sample_order)
    print(f"Resultado: {result}")
    
    # Exemplo de atualização de status
    # whatsapp.send_status_update("order_123456", "+5521987654321", "confirmed")