# facilita-abrigo-backend

## Pré requisitos
- Node
- Nodemon
- Postgres

---
## Como executar 
Na pasta raiz do projeto execute o comando: 
```
npm i
```

Crie um banco no postgres com o nome:
```
 facilita_abrigo
```

Rode o comando:

```
// Linux
npm run db

// Windows
npx sequelize-cli db:migrate
```

Por fim, execute o projeto:
```
npm start

// ou

nodemon src/index.js
```

---
## Atualizar o Banco de Dados

```
// Derrubar o banco
npx sequelize-cli db:migrate:undo:all

// Subir o banco
npx sequelize-cli db:migrate
```