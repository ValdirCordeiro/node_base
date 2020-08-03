
//Iniciando o projeto e instalando as dependencias
npm init -y

npm install express

npm install mysql2

npm install sequelize sequelize-cli path

//necessário para usar o passport
npm install body-parser 

//Iniciar configuração do sequelize --> Cria as pastas config, migrations, models e seeders
npx sequelize-cli init

//Depoid de movido as pastas criadas pelo sequelize para a pasta api foi necessário criar o arquivo .sequelizerc para indicar o novo caminho

//criando uma tabela utilizando o sequelize-cli
npx sequelize-cli model:create --name Usuarios --attributes nome:string,login:string,ativo:boolean,email:string,senha:string,permissao:string

//Comando para criar seed com nome demo-usuario -- Serve para inserir dados no banco
npx sequelize-cli seed:generate --name demo:usuario

//Comando para executar o seed
npx sequelize-cli db:seed:all

//Instalando o BCrypt
npm install bcrypt

//Instalando o passport e passport-local e JWT
npm install passport
npm install passport-local
npm install jsonwebtoken

//Criar a senha aleatoria para o jwt -- Executar no terminal
node -e "console.log(require('crypto').randomBytes(256).toString('base64'))"

//copiar a a string gerada e colocar no arquivo .env

//Instalando o DotEnv para usar variaveis de ambiente
npm install dotenv

// Colocar o seguinte trecho no arquivo inicial para funcionar os dorenv
require("dotenv").config();

//Instalar nova estrategia de autenticacao
npm install passport-http-bearer