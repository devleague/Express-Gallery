
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('gallery').del()
    .then(function () {
      // Inserts seed entries
      return knex('gallery').insert([
        {author:'Slim Shadyspear', link:'https://d18lkz4dllo6v2.cloudfront.net/cumulus_uploads/entry/15220/shakespeare-for-kids%20Cropped.png?w=660', description:'shakespear is an effin Gee that writes smooth rhymes.'}
      ]);
    });
};
