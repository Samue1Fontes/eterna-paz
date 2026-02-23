# 🕊️ Eterna Paz — Sistema de Gestão de Reservas Funerárias

Mini projeto **Full Stack** desenvolvido como teste técnico para vaga de **Desenvolvedor Full Stack Jr**.
 
---

## ⚙️ Tecnologias

| Node.js 24.10.0 | NPM 11.6.1 | Express 5.2.1 | dotenv 17.3.1 | PostgreSQL 18.2 | React 19.x | Vite 7.x | TailwindCSS 4.x | Axios 1.x |
|:---------------:|:----------:|:-------------:|:-------------:|:---------------:|:--------:|:------:|:-------------:|:-----:|
| ![Node.js](https://img.icons8.com/color/48/000000/nodejs.png) | ![NPM](https://img.icons8.com/color/48/000000/npm.png) | <img src="https://icon.icepanel.io/Technology/png-shadow-512/Express.png" width="48" /> | <img src="https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.svg" width="48" /> | ![PostgreSQL](https://img.icons8.com/color/48/000000/postgreesql.png) | ![React](https://img.icons8.com/color/48/000000/react-native.png) | <img src="https://vitejs.dev/logo.svg" width="48" /> | ![TailwindCSS](https://img.icons8.com/color/48/000000/tailwind_css.png) | <img src="https://icon.icepanel.io/Technology/svg/Azios.svg" width="48" /> |
---

<div style="text-align: center;">

  <h2>⚡ Ferramentas de Deploy</h2>

  <table style="margin: 0 auto; text-align: center;">
    <tr>
      <td style="padding: 50px;">
        <img src="https://www.svgrepo.com/show/354513/vercel-icon.svg" alt="Vercel" style="width:96px; height:96px;">
        <div><a href="https://vercel.com/">Vercel</a></div>
      </td>
      <td style="padding: 50px;">
        <img src="https://pbs.twimg.com/profile_images/2002125723621060608/nxgDW055_400x400.jpg" alt="Render" style="width:96px; height:96px;">
        <div><a href="https://render.com/">Render</a></div>
      </td>
      <td style="padding: 50px;">
        <img src="https://neon.com/brand/neon-logomark-dark-color.svg?updated=2026-01-21" alt="Neon" style="width:96px; height:96px;">
        <div><a href="https://neon.com/">Neon</a></div>
      </td>
    </tr>
  </table>
</div>

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

### 3️⃣ Frontend

```bash
cd frontend
npm install
npm run dev
```

Por padrão o frontend usa a variável de ambiente `VITE_API_URL` para apontar para a API. Em desenvolvimento defina:

```
VITE_API_URL=http://localhost:3000
```

### Credenciais de acesso (admin)

- usuário: `admin`
- senha: `admin@123`

Use `/login` no frontend para autenticar. Após autenticação um token JWT será armazenado em `localStorage` e usado nas requisições administrativas.

### Observações

- A rota pública do convite é: `/reservas/convite/:slug` (o frontend disponibiliza `/convite/:slug` para visualização pública). 
- Para editar capela de uma reserva é necessário excluir e criar nova reserva (capela não é editável uma vez criada).
- Se houver problemas com dependências rode `npm install` nos diretórios `backend` e `frontend`.

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
