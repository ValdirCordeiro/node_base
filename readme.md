
//Iniciando o projeto e instalando as dependencias
npm init -y

npm install express

npm install mysql2

npm install sequelize sequelize-cli path

//Iniciar configuração do sequelize --> Cria as pastas config, migrations, models e seeders
npx sequelize-cli init

//Depoid de movido as pastas criadas pelo sequelize para a pasta api foi necessário criar o arquivo .sequelizerc para indicar o novo caminho

//criando uma tabela utilizando o sequelize-cli
npx sequelize-cli model:create --name Usuarios --attributes nome:string,ativo:boolean,email:string,senha:string,dataCadastro:date,permissao:string

//Comando para criar seed com nome demo-usuario -- Serve para inserir dados no banco
npx sequelize-cli seed:generate --name demo:usuario

//Comando para executar o seed
npx sequelize-cli db:seed:all