
exports.seed = function(knex, Promise) {
  return knex("users")
    .truncate()
    .then(function() {
      return knex("users").insert([
        //could do: password: bcyrpt.hash('password', 10)
        { username: "Hester", password: '1234' },
        { username: "Helen", password: '234' },
        { username: "Katy", password: '8745' }
      ]);
    });
};
