// Função para formatar data
function formatDate(isoString) {
    if (!isoString) return "Data não disponível";
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "Data inválida";
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('pt-BR', options);
}

// Função para criar o card de pedido
function createOrderCard(order) {
    const orderCard = document.createElement("div");
    orderCard.className = `order-card ${order.status}`;
    orderCard.onclick = () => showOrderDetails(order);

    // ✅ CORREÇÃO: Garantir que a data seja válida antes de exibir
    const orderDate = order.timestamp ? formatDate(order.timestamp) : "Data não disponível";

    orderCard.innerHTML = `
<div class="order-card-body">
    <div class="order-header">
        <div class="flex-grow-1">
            <div class="order-id">Pedido #${order.id.substr(-6)}</div>
            <div class="order-time">${orderDate}</div>
        </div>
        <span class="status-badge status-${order.status}">
            ${getStatusText(order.status)}
        </span>
    </div>
    
    <div class="customer-info">
        <div class="customer-name">
            <i class="fas fa-user me-2 text-muted"></i>${order.customer.name}
        </div>
        <div class="customer-phone">
            <i class="fas fa-phone me-2 text-muted"></i>${order.customer.phone}
        </div>
    </div>
    
    <div class="order-summary">
        <span class="items-count">
            <i class="fas fa-shopping-bag me-1 text-muted"></i>
            ${order.items.length} ${order.items.length === 1 ? 'item' : 'itens'}
        </span>
        <span class="order-total">R$ ${order.total.toFixed(2)}</span>
    </div>
</div>
`;

    return orderCard;
}

// Função para carregar pedidos
async function carregarPedidos() {
    try {
        console.log('📋 Carregando pedidos...');
        const response = await fetch('/api/pedidos');
        const pedidos = await response.json();
        
        console.log('✅ Pedidos carregados:', pedidos);
        
        exibirPedidos(pedidos);
        atualizarEstatisticas(pedidos);
    } catch (error) {
        console.error('❌ Erro ao carregar pedidos:', error);
        mostrarMensagemErro('Erro ao carregar pedidos');
    }
}

// Função para exibir pedidos na tela
function exibirPedidos(pedidos) {
    // Tentar encontrar diferentes containers possíveis
    let container = document.getElementById('lista-pedidos') || 
                   document.getElementById('pedidos-container') ||
                   document.querySelector('.pedidos-list') ||
                   document.querySelector('.orders-container') ||
                   document.querySelector('#orders-list');
    
    if (!container) {
        console.error('❌ Container de pedidos não encontrado');
        // Criar um container se não existir
        container = document.createElement('div');
        container.id = 'pedidos-container';
        container.innerHTML = '<h3>Lista de Pedidos</h3>';
        
        // Tentar adicionar após um elemento conhecido
        const mainContent = document.querySelector('main') || 
                           document.querySelector('.main-content') || 
                           document.body;
        mainContent.appendChild(container);
    }
    
    if (!pedidos || pedidos.length === 0) {
        container.innerHTML = `
            <div class="no-orders">
                <h3>📦 Nenhum pedido encontrado</h3>
                <p>Os pedidos aparecerão aqui quando forem realizados.</p>
            </div>
        `;
        return;
    }
    
    // Limpar container
    container.innerHTML = '<h3>📋 Lista de Pedidos</h3>';
    
    pedidos.forEach(pedido => {
        const pedidoDiv = document.createElement('div');
        pedidoDiv.className = 'pedido-item';
        
        const dataExibicao = pedido.data_formatada || 'Data não disponível';
        const statusClass = pedido.status ? pedido.status.toLowerCase() : 'pending';
        
        pedidoDiv.innerHTML = `
            <div class="pedido-card">
                <div class="pedido-header">
                    <h4>🍔 Pedido #${pedido.id}</h4>
                    <span class="status-badge status-${statusClass}">${pedido.status || 'PENDENTE'}</span>
                </div>
                <div class="pedido-details">
                    <p><strong>📅 Data:</strong> ${dataExibicao}</p>
                    <p><strong>👤 Cliente:</strong> ${pedido.cliente}</p>
                    <p><strong>📞 Telefone:</strong> ${pedido.telefone}</p>
                    <p><strong>💰 Total:</strong> R$ ${Number(pedido.total).toFixed(2)}</p>
                    <p><strong>🛒 Itens:</strong> ${pedido.itens?.length || 0}</p>
                </div>
                <div class="pedido-actions">
                    <button class="btn-details" onclick="mostrarDetalhesPedido('${pedido.id}')">
                        Ver Detalhes
                    </button>
                    <button class="btn-status" onclick="alterarStatus('${pedido.id}')">
                        Alterar Status
                    </button>
                </div>
            </div>
        `;
        
        container.appendChild(pedidoDiv);
    });
    
    // Adicionar estilos CSS se não existirem
    adicionarEstilosCSS();
}

// Função para atualizar estatísticas
function atualizarEstatisticas(pedidos) {
    const stats = {
        pendentes: 0,
        aceitos: 0,
        entrega: 0,
        total: 0,
        faturamento: 0
    };
    
    pedidos.forEach(pedido => {
        stats.total++;
        stats.faturamento += Number(pedido.total) || 0;
        
        const status = pedido.status?.toLowerCase() || '';
        if (status.includes('confirmed') || status.includes('pendente')) {
            stats.pendentes++;
        } else if (status.includes('aceito') || status.includes('preparing')) {
            stats.aceitos++;
        } else if (status.includes('entrega') || status.includes('delivery')) {
            stats.entrega++;
        }
    });
    
    // Atualizar elementos da página
    atualizarElementoEstatistica('pedidos-pendentes', stats.pendentes);
    atualizarElementoEstatistica('pedidos-aceitos', stats.aceitos);
    atualizarElementoEstatistica('em-entrega', stats.entrega);
    atualizarElementoEstatistica('total-dia', `R$ ${stats.faturamento.toFixed(2)}`);
    
    console.log('📊 Estatísticas atualizadas:', stats);
}

// Função auxiliar para atualizar elemento de estatística
function atualizarElementoEstatistica(id, valor) {
    const elemento = document.getElementById(id) || 
                    document.querySelector(`[data-stat="${id}"]`) ||
                    document.querySelector(`.${id}`);
    
    if (elemento) {
        elemento.textContent = valor;
    } else {
        console.warn(`⚠️ Elemento de estatística não encontrado: ${id}`);
    }
}

// Função para mostrar detalhes do pedido
function mostrarDetalhesPedido(pedidoId) {
    // Implementar modal ou expandir detalhes
    alert(`Detalhes do pedido ${pedidoId} - Funcionalidade em desenvolvimento`);
}

// Função para alterar status do pedido
function alterarStatus(pedidoId) {
    const novoStatus = prompt('Novo status (CONFIRMED, PREPARING, DELIVERY, COMPLETED):');
    if (novoStatus) {
        // Implementar alteração de status
        console.log(`Alterando status do pedido ${pedidoId} para ${novoStatus}`);
        // Aqui você pode fazer uma requisição PUT para /api/orders/${pedidoId}
    }
}

// Função para mostrar mensagem de erro
function mostrarMensagemErro(mensagem) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div class="error-content">
            <span class="error-icon">⚠️</span>
            <span class="error-text">${mensagem}</span>
            <button class="error-close" onclick="this.parentElement.parentElement.remove()">✕</button>
        </div>
    `;
    
    document.body.appendChild(errorDiv);
    
    // Remover após 5 segundos
    setTimeout(() => {
        if (errorDiv.parentElement) {
            errorDiv.remove();
        }
    }, 5000);
}

// Função para adicionar estilos CSS básicos
function adicionarEstilosCSS() {
    if (document.getElementById('pedidos-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'pedidos-styles';
    styles.textContent = `
        .pedido-item {
            margin-bottom: 20px;
        }
        
        .pedido-card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            border-left: 4px solid #ff6b35;
        }
        
        .pedido-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
        }
        
        .pedido-header h4 {
            margin: 0;
            color: #333;
        }
        
        .status-badge {
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
        }
        
        .status-confirmed {
            background: #ffeaa7;
            color: #d63031;
        }
        
        .status-preparing {
            background: #a8e6cf;
            color: #00b894;
        }
        
        .status-delivery {
            background: #74b9ff;
            color: #0984e3;
        }
        
        .pedido-details p {
            margin: 8px 0;
            color: #555;
        }
        
        .pedido-actions {
            margin-top: 15px;
            display: flex;
            gap: 10px;
        }
        
        .btn-details, .btn-status {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }
        
        .btn-details {
            background: #74b9ff;
            color: white;
        }
        
        .btn-status {
            background: #00b894;
            color: white;
        }
        
        .btn-details:hover, .btn-status:hover {
            opacity: 0.8;
        }
        
        .no-orders {
            text-align: center;
            padding: 40px;
            color: #666;
        }
        
        .error-message {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff6b6b;
            color: white;
            padding: 15px;
            border-radius: 5px;
            z-index: 1000;
        }
        
        .error-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .error-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 16px;
        }
    `;
    
    document.head.appendChild(styles);
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('🍔 Painel Admin carregado');
    
    // Carregar pedidos imediatamente
    carregarPedidos();
    
    // Atualizar a cada 30 segundos
    setInterval(() => {
        console.log('🔄 Atualizando pedidos...');
        carregarPedidos();
    }, 30000);
});

// Adicionar função para recarregar manualmente
window.recarregarPedidos = carregarPedidos;


