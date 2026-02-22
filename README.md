# 🕊️ Eterna Paz — Sistema de Gestão de Reservas Funerárias

Mini projeto **Full Stack** desenvolvido como teste técnico para vaga de **Desenvolvedor Full Stack Jr**.
 
---

## ⚙️ Tecnologias

| Node.js 24.10.0 | NPM 11.6.1 | Express 5.2.1 | dotenv 17.3.1 | PostgreSQL 18.2 | React 18 | Vite 5 | TailwindCSS 3 | Axios |
|:---------------:|:----------:|:-------------:|:-------------:|:---------------:|:--------:|:------:|:-------------:|:-----:|
| ![Node.js](https://img.icons8.com/color/48/000000/nodejs.png) | ![NPM](https://img.icons8.com/color/48/000000/npm.png) | <img src="https://icon.icepanel.io/Technology/png-shadow-512/Express.png" width="48" /> | <img src="https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.svg" width="48" /> | ![PostgreSQL](https://img.icons8.com/color/48/000000/postgreesql.png) | ![React](https://img.icons8.com/color/48/000000/react-native.png) | <img src="https://vitejs.dev/logo.svg" width="48" /> | ![TailwindCSS](https://img.icons8.com/color/48/000000/tailwind_css.png) | <img src="https://icon.icepanel.io/Technology/svg/Azios.svg" width="48" /> |
---

## 📌 Problema

O setor funerário necessita organizar reservas de capelas e cerimônias de forma eficiente, evitando conflitos de horários e facilitando o compartilhamento de informações com familiares.

---

## 💡 Solução

O **Eterna Paz** é um sistema que permite:

- ✅ Cadastro de reservas de velório  
- ✅ Controle automático de conflitos de horário  
- ✅ Intervalo técnico obrigatório entre cerimônias  
- ✅ Visualização de disponibilidade da capela  
- ✅ Geração de link público para familiares  

---

## 🧱 Arquitetura

Backend estruturado em camadas:

```
Controller → Service → Repository → Database
```

Separação de responsabilidades:

- 🌐 HTTP  
- 🧠 Regras de negócio  
- 💾 Acesso a dados  

---

## 🏗️ Diagrama de Arquitetura

```
Cliente (Frontend - React)
        ↓
Controller (Rotas / HTTP)
        ↓
Service (Regras de Negócio)
        ↓
Repository (Acesso a Dados)
        ↓
PostgreSQL (Banco de Dados)
```

---

## ⚙️ Tecnologias

### 🔙 Backend

- Node.js  
- Express  
- PostgreSQL  
- REST API  
- dotenv  
- crypto  

### 🔜 Frontend (em desenvolvimento)

- React  
- Vite  
- TailwindCSS  
- Axios  

---

## 📡 API REST

| Método | Endpoint | Descrição |
|--------|----------|------------|
| POST | `/reservas` | Criar reserva |
| GET | `/reservas` | Listar reservas |
| PUT | `/reservas/:id` | Atualizar reserva |
| DELETE | `/reservas/:id` | Remover reserva |
| GET | `/convite/:slug` | Link público |
| GET | `/capelas/:id/disponibilidade` | Consultar disponibilidade |

---

## 🧠 Regras de Negócio

- 📌 Planos de duração automáticos  
- ⏳ Intervalo técnico obrigatório de **1 hora**  
- 🚫 Validação de conflitos de horário  
- 🔒 Link público somente leitura  

---

## 🚀 Como Executar

### 1️⃣ Clonar repositório

```bash
git clone https://github.com/Samue1Fontes/eterna-paz.git
```

---

### 2️⃣ Backend

```bash
cd backend
npm install
```

Criar arquivo `.env` baseado no `.env.example`.

```bash
npm run dev
```

Servidor disponível em:

```
http://localhost:3000
```

---

## 📌 Objetivo do Projeto

Demonstrar:

- 🗂️ Organização de código  
- 🧠 Raciocínio lógico  
- 🔄 Integração Full Stack  
- 🏗️ Clareza arquitetural  

> Foco maior em **qualidade técnica** do que em complexidade visual.

---

## 👨‍💻 Autor

**Samuel Fontes da Silva**  
🎓 Bacharel em Ciência da Computação — Universidade Potiguar  
💻 Desenvolvedor Full Stack Jr  