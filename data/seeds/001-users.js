const bcrypt = require("bcryptjs");
const hash =  bcrypt.hashSync(process.env.USER_PASS, 10);

exports.seed = async function(knex) {
  await knex('users').truncate()
  await knex('users').insert([   
    { username: 'Hester', password: hash},
    { username: 'Helen', password: hash},
    { username: 'Katy', password: hash },
  
  ]);
};
