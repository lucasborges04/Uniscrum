# UniScrum

**UniScrum** é um projeto desenvolvido para gerenciar e facilitar processos de Scrum, incluindo funcionalidades tanto no frontend quanto no backend. Para rodar o projeto localmente, siga as instruções abaixo.

## Como rodar o projeto localmente

### 1. **Acessar o backend**

Abra o terminal na raiz do projeto e siga os seguintes passos:

1. **Acesse o diretório do backend:**
    ```bash
    cd ./server
    ```

2. **Instale as dependências do backend:**
    ```bash
    npm install
    ```

3. **Configure o banco de dados com o Prisma:**
    ```bash
    npx prisma generate
    ```

4. **Rodar o Prisma Studio (opcional, para visualizar e interagir com o banco de dados):**
    ```bash
    npx prisma studio
    ```

5. **Inicie o servidor do backend em um novo terminal a partir do diretório `/server`:**
    ```bash
    npm run dev
    ```

O servidor estará rodando, por padrão, em `http://localhost:3000`.

### 2. **Acessar o frontend**

Agora, abra um novo terminal para o frontend:

1. **Acesse o diretório do frontend:**
    ```bash
    cd ./front
    ```

2. **Instale as dependências do frontend:**
    ```bash
    npm install
    ```

3. **Inicie o servidor do frontend:**
    ```bash
    npm run dev
    ```

O frontend estará rodando, por padrão, em `http://localhost:5173`.

### 3. **Acessar o projeto no navegador**

Com o frontend e o backend rodando, abra o navegador e vá até o seguinte endereço para acessar a aplicação:

- **Frontend**: [http://localhost:5173](http://localhost:5173)

---

## Estrutura do Projeto

- **/server**: Contém o backend da aplicação, incluindo a API e a lógica de negócios.
- **/front**: Contém o frontend da aplicação, desenvolvido com React, incluindo componentes e páginas.

---

## Dependências

- **Backend**:
  - Prisma (ORM)
  - Express (Framework de servidor)
  - Outras dependências relevantes para o backend

- **Frontend**:
  - React
  - Vite (Build tool)

---

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
