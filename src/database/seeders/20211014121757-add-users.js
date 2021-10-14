'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt();
    let senha = await bcrypt.hash("senha123", salt);
    
      return queryInterface.bulkInsert('Usuario', [
        {
          nome:"adm",
          email:"adm@email.com",
          senha: senha,
          role: 1,
          sexo: "masculino",
          cpf: "133.730.856-08",    
          data_de_nascimento: new Date()
        },
        {
          nome:"owner abrigo 1",
          email:"ownerAbrigo@email.com",
          senha: senha,
          role: 2,
          sexo: "masculino",
          cpf: "133.730.856-08",    
          data_de_nascimento: "2021-09-01 01:24:55.90"
        },
        {
          nome:"owner instituicao 1",
          email:"ownerInstituicicao@email.com",
          senha: senha,
          role: 2,
          sexo: "masculino",
          cpf: "133.730.856-08",    
          data_de_nascimento: "2021-09-01 01:24:55.90"
        },
        {
          nome:"user nada 1",
          email:"user1@email.com",
          senha: senha,
          role: 0,
          sexo: "masculino",
          cpf: "133.730.856-08",    
          data_de_nascimento: "2021-09-01 01:24:55.90"
        },
        {
          nome:"user nada 2",
          email:"user2@email.com",
          senha: senha,
          role: 0,
          sexo: "masculino",
          cpf: "133.730.856-08",    
          data_de_nascimento: "2021-09-01 01:24:55.90"
        },
        {
          nome:"user nada 3",
          email:"user3@email.com",
          senha: senha,
          role: 0,
          sexo: "masculino",
          cpf: "133.730.856-08",    
          data_de_nascimento: "2021-09-01 01:24:55.90"
        }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
