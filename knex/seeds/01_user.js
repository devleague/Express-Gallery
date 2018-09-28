
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {email:'expressGallery@expressgallery.com', 
          password:'sweet1'}
      ]);
    });
};
