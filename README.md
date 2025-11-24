# 📚 Sistema de Gerenciamento de Biblioteca

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=CONCLUIDO&color=GREEN&style=for-the-badge)
![Badge Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Badge MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

Um sistema completo de gerenciamento de biblioteca universitária desenvolvido com **Node.js**, **Express**, **Sequelize** e **MySQL**. O projeto permite o controle total de usuários, livros e empréstimos.

## 🚀 Funcionalidades

### 👥 Gerenciamento de Usuários
* Cadastro de novos usuários (Nome, Matrícula, Email).
* Edição de dados.
* **Exclusão Segura:** O sistema impede a exclusão de usuários que possuem histórico de empréstimos ou pendências.

### 📚 Gerenciamento de Livros
* Cadastro de livros (Título, Autor, Ano, Categoria).
* **Integridade de Dados:** Impede a exclusão de livros que estão emprestados ou possuem histórico.

### 🔖 Controle de Empréstimos
* **Registrar Empréstimo:** Seleção dinâmica de usuário e livro via banco de dados.
* **Devolução Inteligente:**
    * Cálculo automático de multas se a data de devolução for superior à prevista.
    * Status visual de "Atrasado" ou "No Prazo".
* Histórico completo de transações.

## 🛠️ Tecnologias Utilizadas

* **Backend:** Node.js, Express.
* **Banco de Dados:** MySQL.
* **ORM:** Sequelize (para manipulação segura do banco de dados).
* **Frontend:** EJS (View Engine), CSS3 (Variáveis CSS, Flexbox).
* **Arquitetura:** MVC (Model-View-Controller).

## 📂 Como rodar o projeto

### Pré-requisitos
* Node.js instalado.
* MySQL instalado e rodando.

### Passo a passo

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/anakarolinasf/SistemaDeGestaoDeBibliotecaUniversitaria.git]
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure o Banco de Dados:**
    Abra seu cliente MySQL (Workbench/DBeaver) e execute o script abaixo para criar o banco e as tabelas:

    ```sql
    CREATE DATABASE biblioteca_universitaria;
    USE biblioteca_universitaria;

    CREATE TABLE usuario (
        id_usuario INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        matricula VARCHAR(20) NOT NULL,
        email VARCHAR(100) NOT NULL
    );

    CREATE TABLE livro (
        id_livro INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(200) NOT NULL,
        autor VARCHAR(100),
        ano_publicacao INT,
        categoria VARCHAR(100)
    );

    CREATE TABLE Emprestimos (
        id_emprestimo INT AUTO_INCREMENT PRIMARY KEY,
        id_usuario INT NOT NULL,
        id_livro INT NOT NULL,
        data_retirada DATE NOT NULL,
        data_devolucao DATE,
        multa DECIMAL(10,2) DEFAULT 0,
        FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
        FOREIGN KEY (id_livro) REFERENCES livro(id_livro)
    );
    ```

4.  **Configure a conexão:**
    Verifique o arquivo de configuração do banco (geralmente `db.js` ou `database.js`) e ajuste seu usuário e senha do MySQL.

5.  **Rode o projeto:**
    ```bash
    npm start
    ```
    Acesse: `http://localhost:3000`

## ✒️ Autor

Desenvolvido por **[Ana Karolina e Lídia Araújo]**.

---
