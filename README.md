# 🍔 Burger House - Guia de Instalação

Landing page completa e funcional para hamburguerias, construída com **React** (Frontend) e **Flask** (Backend), com sistema de pedidos integrado.

![Burger House](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white) ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 16 ou superior) - [Download aqui](https://nodejs.org/)
- **Python** (versão 3.8 - 3.11 recomendado) - [Download aqui](https://www.python.org/)
- **Git** - [Download aqui](https://git-scm.com/)
- **VS Code** (recomendado) - [Download aqui](https://code.visualstudio.com/)

### ✅ Verificar se está tudo instalado:

```bash
node --version
npm --version
python --version
git --version
```

## 🚀 Instalação

### 1️⃣ **Clonar o Repositório**

```bash
# Clone o projeto
git clone https://github.com/AlexandroGranja/Projeto05-Burger-House.git

# Entre na pasta do projeto
cd Projeto05-Burger-House
```

### 2️⃣ **Abrir no VS Code**

```bash
# Abra o projeto no VS Code
code .
```

### 3️⃣ **Configurar o Backend (Flask/Python)**

**No terminal integrado do VS Code:**

```bash
# Crie um ambiente virtual Python
python -m venv venv

# Ative o ambiente virtual
# Windows (CMD):
venv\Scripts\activate

# Windows (PowerShell):
venv\Scripts\Activate.ps1

# Linux/Mac:
source venv/bin/activate
```

**Instalar dependências do backend:**

```bash
# Instale as dependências básicas
pip install flask flask-cors python-dotenv

# Se existir um arquivo requirements.txt na pasta backend:
cd backend
pip install -r requirements.txt
cd ..
```

### 4️⃣ **Configurar o Frontend (React/Node.js)**

**Em um novo terminal (mantendo o backend ativo):**

```bash
# Instale as dependências do Node.js
npm install

# Se houver problemas, tente:
npm install --legacy-peer-deps
```

## ▶️ Executando o Projeto

### 🔧 **Iniciar o Backend**

**Terminal 1 - Backend Flask:**

```bash
# Certifique-se de que o ambiente virtual está ativo
# Você deve ver (venv) no início da linha

# Navegue para a pasta backend
cd backend

# Execute o servidor Flask
python app.py

# Ou alternativamente:
flask run
```

✅ **Backend estará rodando em:** `http://localhost:5000`

### 🎨 **Iniciar o Frontend**

**Terminal 2 - Frontend React:**

```bash
# Certifique-se de estar na pasta raiz do projeto
# (não dentro da pasta backend)

# Inicie o servidor de desenvolvimento React
npm start
```

✅ **Frontend estará rodando em:** `http://localhost:3000`

## 🌐 Acessando a Aplicação

- **Site da Hamburgueria:** http://localhost:3000
- **API Backend:** http://localhost:5000
- **Documentação da API:** http://localhost:5000/api

## 🏗️ Estrutura do Projeto

```
Projeto05-Burger-House/
├── 📁 backend/              # Código do servidor Flask
│   ├── app.py              # Arquivo principal do Flask
│   ├── requirements.txt    # Dependências Python
│   └── ...
├── 📁 src/                 # Código React
│   ├── components/         # Componentes React
│   ├── pages/             # Páginas da aplicação
│   ├── styles/            # Arquivos de estilo
│   └── App.js             # Componente principal
├── 📁 public/             # Arquivos públicos
├── 📁 node_modules/       # Dependências Node.js
├── 📁 venv/               # Ambiente virtual Python
├── package.json           # Configurações e dependências npm
├── package-lock.json      # Lock das dependências npm
└── README.md             # Este arquivo
```

## 🛠️ Comandos Úteis

### Para o Frontend (React):
```bash
npm start          # Inicia o servidor de desenvolvimento
npm run build      # Cria build de produção
npm test           # Executa os testes
npm install        # Instala dependências
```

### Para o Backend (Flask):
```bash
python app.py      # Inicia o servidor Flask
flask run          # Alternativa para iniciar o Flask
pip freeze         # Lista dependências instaladas
pip install <nome> # Instala nova dependência
```

### Gerenciar Ambiente Virtual:
```bash
# Ativar ambiente virtual:
venv\Scripts\activate      # Windows
source venv/bin/activate   # Linux/Mac

# Desativar ambiente virtual:
deactivate
```

## 🔧 Solucionando Problemas

### ❌ **Frontend com tela em branco**
```bash
# Limpe o cache e reinstale
rm -rf node_modules package-lock.json  # Linux/Mac
rmdir /s node_modules && del package-lock.json  # Windows
npm install
npm start
```

### ❌ **Erro "Flask application not found"**
```bash
# Certifique-se de estar na pasta backend
cd backend
python app.py
```

### ❌ **Erro de CORS**
```bash
# Instale flask-cors
pip install flask-cors
```

### ❌ **Porta já está em uso**
```bash
# Frontend em porta diferente:
npm start -- --port 3001

# Backend em porta diferente:
flask run --port 5001
```

### ❌ **Problemas com ambiente virtual**
```bash
# Delete e recrie o ambiente virtual
rmdir /s venv  # Windows
rm -rf venv    # Linux/Mac

python -m venv venv
venv\Scripts\activate  # Windows
pip install flask flask-cors
```

## 🔒 Extensões Recomendadas para VS Code

Para melhor experiência de desenvolvimento:

- **ES7+ React/Redux/React-Native snippets**
- **Python** (Microsoft)
- **Pylance**
- **Auto Rename Tag**
- **Bracket Pair Colorizer**
- **GitLens**
- **Live Server**

## 📚 Funcionalidades

- ✅ Cardápio interativo com hambúrgueres e acompanhamentos
- ✅ Carrinho de compras dinâmico
- ✅ Sistema de pedidos integrado
- ✅ API RESTful para gerenciar pedidos
- ✅ Design responsivo
- ✅ Persistência de dados em JSON

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Alexandro Granja**
- GitHub: [@AlexandroGranja](https://github.com/AlexandroGranja)

---

## 🆘 Precisa de Ajuda?

Se encontrar algum problema durante a instalação:

1. Verifique se todos os pré-requisitos estão instalados
2. Certifique-se de estar nas pastas corretas ao executar os comandos
3. Verifique se as portas 3000 e 5000 estão livres
4. Consulte a seção "Solucionando Problemas" acima

**Happy Coding! 🍔✨**