# NewSmartStore

O **NewSmartStore** é uma aplicação web de **e-commerce**, desenvolvida com uma arquitetura fullstack, tendo como objetivo oferecer uma base organizada e escalável para gerenciamento de produtos, usuários, autenticação e operações relacionadas a uma loja virtual.

O projeto é dividido entre **frontend** e **backend**, permitindo uma separação clara entre a interface da aplicação e as regras de negócio e APIs.

## 🛠️ Tecnologias

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* React Query
* Context API
* JWT
* Cookies `HttpOnly`
* Middleware
* Feature-Based Architecture

### Backend

* Node.js
* Fastify
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT
* Clean Architecture

## 📁 Estrutura do projeto

```text
NewSmartStore/
├── frontend/
└── backend/
```

O **frontend** é responsável pela interface e experiência do usuário, enquanto o **backend** concentra a API, regras de negócio, autenticação e persistência dos dados.

---

## 🎨 Frontend

O frontend foi desenvolvido utilizando **Next.js** e segue uma organização baseada em **features**.

```text
frontend/
└── src/
    ├── app/
    │   ├── dashboard/
    │   ├── login/
    │   └── register/
    │
    ├── components/
    │
    ├── features/
    │   ├── auth/
    │   │   ├── components/
    │   │   ├── context/
    │   │   └── types/
    │   │
    │   ├── dashboard/
    │   └── register/
    │
    ├── lib/
    └── proxy.ts
```

A arquitetura **Feature-Based** organiza o código de acordo com as funcionalidades da aplicação, mantendo componentes, contextos e tipos relacionados próximos uns dos outros.

Essa abordagem facilita a manutenção e permite que novas funcionalidades sejam adicionadas de forma mais organizada.

### React Query

O projeto utiliza **React Query** para gerenciamento das operações assíncronas e comunicação com a API.

Entre suas responsabilidades estão:

* Gerenciamento de requisições
* Cache de dados
* Controle de loading
* Tratamento de erros
* Invalidação de queries
* Mutations
* Atualização automática dos dados

### Context API

A aplicação também utiliza **Context API** para compartilhar estados globais entre diferentes componentes.

Um dos principais exemplos é o contexto relacionado à autenticação, responsável por disponibilizar informações do usuário e controlar o estado de autenticação da aplicação.

---

## ⚙️ Backend

O backend foi desenvolvido utilizando **Fastify** e **TypeScript**, seguindo os princípios da **Clean Architecture**.

```text
backend/
└── src/
    ├── @types/
    │
    ├── application/
    │
    ├── domain/
    │   └── repository/
    │
    ├── infra/
    │   └── persistence/
    │
    ├── presentation/
    │   ├── controllers/
    │   └── controllers.ts
    │
    ├── shared/
    │   ├── errors/
    │   ├── hooks/
    │   └── prisma/
    │
    └── server.ts
```

A separação das camadas permite manter as regras de negócio independentes dos detalhes de infraestrutura, facilitando manutenção, testes e evolução da aplicação.

### Principais camadas

**Domain**

Responsável pelas regras e contratos fundamentais do sistema, incluindo as interfaces dos repositórios.

**Application**

Concentra os casos de uso da aplicação e a execução das regras de negócio.

**Infrastructure**

Responsável pelas implementações relacionadas a recursos externos, como persistência de dados utilizando Prisma.

**Presentation**

Responsável pela comunicação com o cliente, incluindo controllers e definição das rotas da API.

**Shared**

Contém recursos compartilhados entre diferentes partes do backend, como tratamento de erros, hooks e configuração do Prisma.

---

## 🔐 Autenticação

A autenticação da aplicação utiliza **JWT**, com o token armazenado em **cookies `HttpOnly`**.

O fluxo de autenticação pode ser representado da seguinte forma:

```text
Usuário
   │
   ▼
Frontend
   │
   │ Login
   ▼
Backend / Fastify
   │
   │ JWT
   ▼
Cookie HttpOnly
   │
   ▼
Middleware
   │
   ├── Autenticado → acesso permitido
   │
   └── Não autenticado → acesso bloqueado
```

O uso de cookies `HttpOnly` evita que o token seja acessado diretamente pelo JavaScript do navegador.

O **middleware** é responsável por verificar a autenticação e controlar o acesso às rotas protegidas do frontend.

---

## ❌ Tratamento de erros

O tratamento de erros é centralizado no backend através da estrutura:

```text
shared/
└── errors/
```

Essa abordagem evita que cada parte da aplicação precise implementar individualmente o tratamento dos erros.

A centralização também proporciona respostas mais consistentes para o frontend e facilita a manutenção da aplicação.

---

## 🗄️ Banco de dados

A persistência dos dados é realizada utilizando **Prisma ORM**.

A implementação da persistência fica isolada na camada de infraestrutura:

```text
infra/
└── persistence/
```

Enquanto os contratos dos repositórios permanecem no domínio:

```text
domain/
└── repository/
```

Isso reduz o acoplamento entre as regras de negócio e a tecnologia utilizada para acesso ao banco de dados.

---

## 🚀 Executando o projeto

### Backend

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Configure as variáveis de ambiente no arquivo `.env`.

Execute as migrations:

```bash
npx prisma migrate dev
```

Inicie o servidor:

```bash
npm run dev
```

### Frontend

Em outro terminal:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Configure as variáveis de ambiente necessárias.

Inicie a aplicação:

```bash
npm run dev
```

---

## 📦 Funcionalidades

O projeto tem como foco a construção de uma plataforma de **e-commerce**, permitindo a evolução da aplicação para funcionalidades como:

* Cadastro e gerenciamento de usuários
* Autenticação
* Gerenciamento de produtos
* Catálogo de produtos
* Dashboard administrativo
* Gerenciamento de dados da loja
* Carrinho de compras
* Pedidos
* Controle de acesso
* Integração entre frontend e API
* Persistência de dados

A arquitetura foi estruturada para permitir que novas funcionalidades de e-commerce sejam incorporadas sem comprometer a organização das camadas existentes.

---

## 🏗️ Arquitetura

O projeto utiliza diferentes abordagens arquiteturais em cada aplicação.

### Backend — Clean Architecture

```text
Presentation
     │
     ▼
Application
     │
     ▼
Domain
     ▲
     │
Infrastructure
```

A Clean Architecture mantém as regras de negócio isoladas dos frameworks e mecanismos externos.

### Frontend — Feature-Based

```text
App
 │
 ├── Features
 │    ├── Auth
 │    ├── Dashboard
 │    └── Register
 │
 ├── Components
 │
 ├── Context
 │
 └── React Query
```

A organização por funcionalidades facilita a localização do código e permite que cada domínio evolua de maneira independente.

---

## 🎯 Objetivos

O projeto busca aplicar boas práticas de desenvolvimento de software em uma aplicação real de e-commerce, com foco em:

* Arquitetura limpa e organizada
* Separação de responsabilidades
* Baixo acoplamento
* Segurança na autenticação
* Centralização de erros
* Gerenciamento eficiente de dados
* Código escalável e manutenível
* Separação entre frontend e backend
* Organização baseada em funcionalidades
* Desenvolvimento de uma plataforma de e-commerce completa

