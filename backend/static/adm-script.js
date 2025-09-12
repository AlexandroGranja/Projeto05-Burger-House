document.addEventListener('DOMContentLoaded', function () {
    const API_BASE_URL = window.location.origin;
    const N8N_WEBHOOK_URL = 'https://alexandro-granja.up.railway.app/webhook/order-status-update';
    const N8N_STATUS_WEBHOOK_URL = "https://alexandro-granja.up.railway.app/webhook/order-status-update";

    let orders = [];
    let currentFilter = 'all';
    let currentSearchTerm = '';
    let updateInterval;
    let currentSection = 'orders';

    function formatDate(isoString) {
        if (!isoString) return "Data não disponível";
        const date = new Date(isoString);
        if (isNaN(date.getTime())) return "Data inválida";
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        return date.toLocaleString('pt-BR', options).replace(/,/, '');
    }

    function getStatusText(status) {
        const statusMap = {
            'pending': 'Pendente',
            'accepted': 'Aceito',
            'delivery': 'Em Entrega',
            'completed': 'Concluído'
        };
        return statusMap[status] || status;
    }

    function createOrderCard(order) {
        const orderCard = document.createElement('div');
        orderCard.className = `order-card ${order.status}`;
        orderCard.onclick = () => showOrderDetails(order);

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
                    <div class="customer-name"><i class="fas fa-user me-2 text-muted"></i>${order.customer.name}</div>
                    <div class="customer-phone"><i class="fas fa-phone me-2 text-muted"></i>${order.customer.phone}</div>
                </div>
                <div class="order-summary">
                    <span class="items-count"><i class="fas fa-shopping-bag me-1 text-muted"></i>${order.items.length} ${order.items.length === 1 ? 'item' : 'itens'}</span>
                    <span class="order-total">R$ ${order.total.toFixed(2)}</span>
                </div>
            </div>
        `;
        return orderCard;
    }

    async function loadOrders() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/orders`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            orders = await response.json();
            renderOrders();
            updateStats();
        } catch (error) {
            console.error('Erro ao carregar pedidos:', error);
            showToast('Falha ao carregar pedidos.', 'danger');
        }
        updateLastUpdateTime();
    }

    function renderOrders() {
        const ordersContainer = document.getElementById('orders-container');
        const noOrders = document.getElementById('no-orders');
        ordersContainer.innerHTML = '';

        let filteredOrders = filterOrders();

        if (filteredOrders.length === 0) {
            noOrders.style.display = 'block';
            ordersContainer.style.display = 'none';
        } else {
            noOrders.style.display = 'none';
            ordersContainer.style.display = 'grid';
            filteredOrders.forEach(order => {
                const orderCard = createOrderCard(order);
                ordersContainer.appendChild(orderCard);
            });
        }
    }

    function filterOrders() {
        let filtered = Array.isArray(orders) ? [...orders] : [];
        if (currentFilter !== 'all') {
            filtered = filtered.filter(order => order.status === currentFilter);
        }
        if (currentSearchTerm) {
            const searchTerm = currentSearchTerm.toLowerCase();
            filtered = filtered.filter(order =>
                order.id.toLowerCase().includes(searchTerm) ||
                (order.customer && order.customer.name && order.customer.name.toLowerCase().includes(searchTerm)) ||
                (order.customer && order.customer.phone && order.customer.phone.includes(searchTerm))
            );
        }
        return filtered;
    }

    function showOrderDetails(order) {
        document.getElementById('detail-order-id').textContent = order.id;
        document.getElementById('detail-customer-name').textContent = order.customer.name;
        document.getElementById('detail-customer-phone').textContent = order.customer.phone;
        document.getElementById('detail-customer-address').textContent = order.customer.address;
        document.getElementById('detail-customer-neighborhood').textContent = order.customer.neighborhood;
        document.getElementById('detail-customer-complement').textContent = order.customer.complement || 'Nenhum';
        document.getElementById('detail-payment-method').textContent = order.customer.paymentMethod;
        document.getElementById('detail-total').textContent = `R$ ${order.total.toFixed(2)}`;
        document.getElementById('detail-date').textContent = formatDate(order.timestamp);

        const statusBadge = document.getElementById('detail-status');
        statusBadge.textContent = getStatusText(order.status);
        statusBadge.className = `status-badge status-${order.status}`;

        const itemsContainer = document.getElementById('detail-items');
        itemsContainer.innerHTML = '';
        order.items.forEach(item => {
            const itemRow = document.createElement('div');
            itemRow.className = 'item-row';
            itemRow.innerHTML = `
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-description">${item.description || ''}</div>
                </div>
                <div class="item-quantity">${item.quantity}x</div>
                <div class="item-price">R$ ${(item.price * item.quantity).toFixed(2)}</div>
            `;
            itemsContainer.appendChild(itemRow);
        });

        setupActionButtons(order);
        document.getElementById('order-details').style.display = 'flex';
    }

    function setupActionButtons(order) {
        const actionsContainer = document.getElementById('detail-actions');
        actionsContainer.innerHTML = '';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'btn-action btn-close';
        closeBtn.innerHTML = '<i class="fas fa-times me-1"></i>Fechar';
        closeBtn.onclick = closeOrderDetails;
        actionsContainer.appendChild(closeBtn);

        if (order.status === 'pending') {
            const acceptBtn = document.createElement('button');
            acceptBtn.className = 'btn-action btn-accept';
            acceptBtn.innerHTML = '<i class="fas fa-check me-1"></i>Aceitar Pedido';
            acceptBtn.onclick = () => updateOrderStatus(order.id, 'accepted');
            actionsContainer.appendChild(acceptBtn);
        } else if (order.status === 'accepted') {
            const deliveryBtn = document.createElement('button');
            deliveryBtn.className = 'btn-action btn-delivery';
            deliveryBtn.innerHTML = '<i class="fas fa-truck me-1"></i>Enviar para Entrega';
            deliveryBtn.onclick = () => updateOrderStatus(order.id, 'delivery');
            actionsContainer.appendChild(deliveryBtn);
        }
    }

    function closeOrderDetails() {
        document.getElementById('order-details').style.display = 'none';
    }

    async function updateOrderStatus(orderId, newStatus) {
        showToast(`Atualizando status para ${getStatusText(newStatus)}...`, 'info');
        try {
            const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (!response.ok) throw new Error('Falha ao atualizar status');
            const updatedOrder = await response.json();
            const orderIndex = orders.findIndex(o => o.id === orderId);
            if (orderIndex !== -1) {
                orders[orderIndex] = updatedOrder;
            }
            renderOrders();
            updateStats();
            closeOrderDetails();
            showToast('Status atualizado com sucesso!', 'success');
            if (document.getElementById('n8n-integration').checked) {
                sendToN8N(updatedOrder.id, newStatus);
            }
        } catch (error) {
            console.error('Erro ao atualizar status:', error);
            showToast('Erro ao atualizar status.', 'danger');
        }
    }

    async function sendToN8N(orderId, newStatus) {
        const order = orders.find(o => o.id === orderId);
        if (!order) return;
        try {
            const response = await fetch(N8N_STATUS_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId, status: newStatus, customer: order.customer, items: order.items, total: order.total })
            });
            if (!response.ok) throw new Error('Erro ao enviar status para n8n');
            console.log('Status enviado para n8n com sucesso');
        } catch (error) {
            console.error('Erro ao enviar notificação para n8n:', error);
        }
    }

    function updateStats() {
        const stats = { pending: 0, accepted: 0, delivery: 0, total: 0 };
        const today = new Date().toDateString();
        orders.forEach(order => {
            const orderDate = new Date(order.timestamp).toDateString();
            if (orderDate === today) {
                stats.total += order.total;
            }
            if (stats[order.status] !== undefined) {
                stats[order.status]++;
            }
        });
        document.getElementById('stat-pending').textContent = stats.pending;
        document.getElementById('stat-accepted').textContent = stats.accepted;
        document.getElementById('stat-delivery').textContent = stats.delivery;
        document.getElementById('stat-total').textContent = `R$ ${stats.total.toFixed(2)}`;
        document.getElementById('pending-count').textContent = stats.pending;
        document.getElementById('pending-count').style.display = stats.pending > 0 ? 'flex' : 'none';
    }

    function updateLastUpdateTime() {
        const now = new Date();
        document.getElementById('last-update').textContent = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }

    function showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toast-container');
        const toastId = 'toast-' + Date.now();
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white bg-${type} border-0`;
        toast.setAttribute('role', 'alert');
        toast.id = toastId;
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body"><i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;
        toastContainer.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast, { autohide: true, delay: 4000 });
        bsToast.show();
        toast.addEventListener('hidden.bs.toast', () => toast.remove());
    }

    function switchSection(sectionId) {
        currentSection = sectionId;
        document.querySelectorAll('.section-content').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${sectionId}-section`).classList.add('active');
        document.querySelectorAll('.sidebar .nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });
        if (sectionId === 'analytics') {
            generateReport();
        }
    }

    function setupEventListeners() {
        document.getElementById('close-details').addEventListener('click', closeOrderDetails);
        document.querySelectorAll('.filter-option').forEach(option => option.addEventListener('click', handleFilterChange));
        document.getElementById('search-order').addEventListener('input', handleSearch);
        document.getElementById('refresh-orders').addEventListener('click', handleRefresh);
        document.getElementById('toggle-sidebar')?.addEventListener('click', toggleSidebar);
        document.getElementById('order-details').addEventListener('click', e => { if (e.target === this) closeOrderDetails(); });
        document.querySelectorAll('.sidebar .nav-link').forEach(link => {
            if (!link.onclick) { 
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    const section = this.getAttribute('data-section');
                    if (section) switchSection(section);
                });
            }
        });
        document.getElementById('generate-report').addEventListener('click', generateReport);
        document.getElementById('save-settings').addEventListener('click', saveSettings);
        document.getElementById('auto-refresh').addEventListener('change', (e) => {
            if (e.target.checked) {
                startAutoUpdate();
            } else {
                stopAutoUpdate();
            }
        });
    }

    function handleFilterChange(e) {
        e.preventDefault();
        currentFilter = this.getAttribute('data-filter');
        document.querySelectorAll('.filter-option').forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        renderOrders();
    }

    function handleSearch(e) {
        currentSearchTerm = e.target.value;
        renderOrders();
    }

    function handleRefresh() {
        showToast('Atualizando pedidos...', 'info');
        loadOrders();
    }

    function toggleSidebar() {
        document.getElementById('sidebar').classList.toggle('show');
    }

    function startAutoUpdate() {
        if (!updateInterval) {
            updateInterval = setInterval(loadOrders, 30000);
        }
    }

    function stopAutoUpdate() {
        if (updateInterval) {
            clearInterval(updateInterval);
            updateInterval = null;
        }
    }

    function generateReport() {
        showToast('Relatório gerado com sucesso!', 'success');
        document.getElementById('report-total-orders').textContent = orders.length;
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        document.getElementById('report-total-revenue').textContent = `R$ ${totalRevenue.toFixed(2)}`;
        const avgOrder = orders.length > 0 ? totalRevenue / orders.length : 0;
        document.getElementById('report-avg-order').textContent = `R$ ${avgOrder.toFixed(2)}`;
        const totalItems = orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
        document.getElementById('report-total-items').textContent = totalItems;
        updateCharts();
    }

    function setupCharts() {
        const chartOptions = { responsive: true, maintainAspectRatio: false };
        window.salesChart = new Chart(document.getElementById('sales-chart'), { type: 'line', data: { labels: [], datasets: [{ label: 'Vendas (R$)', data: [], borderColor: '#4f46e5', backgroundColor: 'rgba(79, 70, 229, 0.1)', tension: 0.3, fill: true }] }, options: chartOptions });
        window.productsChart = new Chart(document.getElementById('products-chart'), { type: 'bar', data: { labels: [], datasets: [{ label: 'Vendas', data: [], backgroundColor: '#ff6b35' }] }, options: { ...chartOptions, indexAxis: 'y' } });
        window.hoursChart = new Chart(document.getElementById('hours-chart'), { type: 'bar', data: { labels: [], datasets: [{ label: 'Pedidos', data: [], backgroundColor: '#10b981' }] }, options: chartOptions });
    }

    function updateCharts() {
        const salesData = [120, 190, 300, 500, 200, 300, 450];
        const productsData = [65, 59, 80, 45, 56];
        const hoursData = [12, 19, 8, 15, 10, 22, 18, 14, 9, 7];
        window.salesChart.data.labels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
        window.salesChart.data.datasets[0].data = salesData;
        window.salesChart.update();
        window.productsChart.data.labels = ['Produto 1', 'Produto 2', 'Produto 3', 'Produto 4', 'Produto 5'];
        window.productsChart.data.datasets[0].data = productsData;
        window.productsChart.update();
        window.hoursChart.data.labels = ['12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h'];
        window.hoursChart.data.datasets[0].data = hoursData;
        window.hoursChart.update();
    }

    function saveSettings() {
        showToast('Configurações salvas com sucesso!', 'success');
    }

    function logout() {
        if (confirm('Tem certeza que deseja sair?')) {
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
        }
    }
    
    // Inicialização
    function initializeApp() {
        setupEventListeners();
        loadOrders();
        if (document.getElementById('auto-refresh').checked) {
            startAutoUpdate();
        }
        setupCharts();
        const today = new Date();
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(today.getDate() - 7);
        document.getElementById('report-start-date').valueAsDate = oneWeekAgo;
        document.getElementById('report-end-date').valueAsDate = today;
    }

    initializeApp();

    window.addEventListener('beforeunload', () => stopAutoUpdate());
});


