# 🍔 Burger House - Landing Page

Landing page completa para lanchonete de hambúrguers artesanais com sistema de pedidos e integração WhatsApp.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React** 18.2.0
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **JavaScript ES6+**

### Backend
- **Python** 3.8+
- **Flask** - API REST
- **PyWhatKit** - Integração WhatsApp
- **JSON** - Armazenamento de dados

## 📋 Funcionalidades

### ✅ Implementadas
- [x] Menu interativo com hambúrguers e acompanhamentos
- [x] Sistema de carrinho de compras
- [x] Formulário de checkout completo
- [x] Cálculo automático de totais
- [x] Design responsivo (mobile/desktop)
- [x] API REST para pedidos
- [x] Integração com WhatsApp
- [x] Armazenamento de pedidos em JSON

### 🔄 Futuras Melhorias
- [ ] Banco de dados (PostgreSQL/MySQL)
- [ ] Sistema de autenticação
- [ ] Painel administrativo
- [ ] Tracking de pedidos em tempo real
- [ ] Integração com pagamento online
- [ ] Upload de imagens dos produtos
- [ ] Sistema de avaliações

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js 16+ e npm
- Python 3.8+
- Git

### 1. Clone o Repositório
```bash
git clone https://github.com/seu-usuario/burger-house.git
cd burger-house
```

### 2. Configuração do Frontend
```bash
# Instalar dependências
npm install

# Instalar Tailwind CSS (se necessário)
npm install -D tailwindcss

# Iniciar servidor de desenvolvimento
npm start
```
O frontend estará disponível em: `http://localhost:3000`

### 3. Configuração do Backend
```bash
# Navegar para pasta do backend
cd backend

# Criar ambiente virtual Python
python -m venv venv

# Ativar ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Iniciar API
python app.py
```
A API estará disponível em: `http://localhost:5000`

## 📱 Configuração do WhatsApp

### 1. Editar Número do Restaurante
No arquivo `backend/app.py`, linha 67:
```python
restaurant_phone = "+5521999999999"  # Substitua pelo seu número
```

### 2. Configurar WhatsApp Web
- Abra o WhatsApp Web no navegador
- Faça login com seu celular
- Mantenha a aba aberta para receber mensagens

### 3. Teste de Envio
```python
# Execute o arquivo de teste
cd backend
python whatsapp_integration.py
```

## 🔧 Configuração da API

### Endpoints Disponíveis

#### POST /api/orders
Cria um novo pedido
```json
{
  "items": [
    {
      "id": 1,
      "name": "Burger Clássico",
      "price": 28.90,
      "quantity": 2
    }
  ],
  "total": 57.80,
  "customer": {
    "name": "João Silva",
    "phone": "+5521987654321",
    "address": "Rua das Flores, 123",
    "neighborhood": "Centro",
    "complement": "Apt 201",
    "paymentMethod": "pix"
  }
}
```

#### GET /api/orders
Lista todos os pedidos

#### PUT /api/orders/:id
Atualiza status do pedido
```json
{
  "status": "confirmed"
}
```

## 🎨 Personalização

### Cores e Branding
Edite as cores no arquivo `src/App.jsx`:
```javascript
// Cores principais
className="bg-red-600"     // Cor primária
className="bg-yellow-400"  // Cor de destaque
className="text-red-600"   // Cor do texto
```

### Menu e Preços
Edite o cardápio no arquivo `src/App.jsx`, variável `menuItems`:
```javascript
const menuItems = [
  {
    id: 1,
    name: "Seu Hambúrguer",
    description: "Descrição do produto",
    price: 29.90,
    image: "URL_DA_IMAGEM"
  }
];
```

### Informações da Empresa
Edite os dados da empresa:
- Nome: Linha 102 (`<h1>`)
- Telefone: Linha 117
- Endereço: Linha 298
- Horário: Linha 113

## 📂 Estrutura de Arquivos

```
burger-house/
├── public/
│   ├── index.html          # HTML base
│   └── favicon.ico         # Ícone do site
├── src/
│   ├── App.jsx            # Componente principal
│   └── index.js           # Entrada da aplicação
├── backend/
│   ├── app.py             # API Flask
│   ├── whatsapp_integration.py  # Integração WhatsApp
│   ├── requirements.txt   # Dependências Python
│   └── orders/           # Pasta para pedidos (criada automaticamente)
├── package.json          # Dependências Node.js
├── README.md            # Documentação
└── .gitignore          # Arquivos ignorados pelo Git
```

## 🚦 Como Usar

### Para Clientes
1. Acesse o site
2. Navegue pelo cardápio
3. Adicione itens ao carrinho
4. Clique em "Finalizar Pedido"
5. Preencha seus dados
6. Confirme o pedido
7. Aguarde contato via WhatsApp

### Para Restaurante
1. Receba notificações via WhatsApp
2. Acesse `http://localhost:5000/api/orders` para ver todos os pedidos
3. Use a API para atualizar status dos pedidos

## 🐛 Solução de Problemas

### Erro: "Module not found"
```bash
npm install
# ou
pip install -r requirements.txt
```

### WhatsApp não envia mensagens
1. Verifique se o WhatsApp Web está aberto
2. Confirme o número de telefone no código
3. Teste a conexão com a internet

### API não conecta com o frontend
1. Verifique se o backend está rodando na porta 5000
2. Configure CORS no Flask
3. Verifique URLs das requisições

## 📞 Suporte

- **Email:** seu-email@exemplo.com
- **WhatsApp:** (21) 99999-9999
- **GitHub:** [Issues](https://github.com/seu-usuario/burger-house/issues)

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 🎯 Roadmap

- **v1.1** - Painel administrativo
- **v1.2** - Integração com pagamentos
- **v1.3** - App mobile
- **v2.0** - Sistema de delivery com rastreamento

---

⭐ **Se este projeto te ajudou, deixe uma estrela no GitHub!**

Desenvolvido com ❤️ para aprender React e Python