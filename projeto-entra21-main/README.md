# 🚀 Projeto Entra21

## 📌 Sobre o Projeto

Este projeto foi desenvolvido como parte do programa Entra21. O objetivo é aprimorar nossos conhecimentos em desenvolvimento web, aplicando HTML, CSS e JavaScript para criar uma aplicação funcional e interativa.

## 👥 Integrantes da Equipe

- **Nícolas Guedes**
- **Bryan Fernandes**
- **Joana Maria**
- **Lucas Paulo da Silva Vieira França**

## 🛠️ Tecnologias Utilizadas

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 📂 Estrutura do Projeto

```txt
📦 projeto-entra21
 ┣ 📁 .vscode
 ┃ ┗ 📜 extensions.json       # Arquivos das extensões utilizadas
 ┃
 ┣ 📂 assets
 ┃ ┣ 📂 css                   # Arquivos de estilos
 ┃ ┣ 📂 img                   # Imagens do projeto
 ┃ ┣ 📂 js                    # Arquivos JavaScript
 ┃ ┗ 📂 pages                 # Páginas do projeto
 ┃
 ┣ 📂 node_modules            # Dependências do Node.js (ignorado pelo Git)
 ┃
 ┣ 📜 .env.example            # Exemplo de arquivo de .env
 ┣ 📜 .gitignore              # Arquivos a serem ignorados pelo Git
 ┣ 📜 .gitattributes          # Configurações específicas do Git
 ┣ 📜 LICENSE                 # Arquivo de licença do projeto
 ┣ 📜 package.json            # Arquivo de configuração do node
 ┣ 📜 project.dio             # Arquivo contendo o diagrama do projeto
 ┗ 📜 README.md               # Documentação principal do projeto
```

## 📌 Como Executar o Projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/projeto-entra21.git
   ```

2. Acesse a pasta do projeto:

   ```bash
   cd projeto-entra21
   ```

3. Abra o arquivo `index.html` em seu navegador.

## 📜 Licença

Este projeto é de código aberto e está licenciado sob a [MIT License](LICENSE).

## Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto com base no exemplo abaixo:

```bash
# Configurações do banco de dados
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=senha
DB_NAME=nome_do_banco

# Configurações da API do Spotify
SPOTIFY_CLIENT_ID=seu_client_id_aqui
SPOTIFY_CLIENT_SECRET=seu_client_secret_aqui
SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
```

Certifique-se de substituir os valores pelos dados reais do seu ambiente.
