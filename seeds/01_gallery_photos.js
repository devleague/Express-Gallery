
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('gallery').del()
    .then(function () {
      // Inserts seed entries
      return knex('gallery').insert([
        {
          id: 1,
          author: 'Edoardo Busti',
          link: 'https://images.unsplash.com/photo-1498845914050-92ccc5f5dab1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=965&q=80',
          description: 'Between the woods of Grouse Mountain in Vancouver.',
        },
        {
          id: 2,
          author: 'Kenny Luo',
          link: 'https://images.unsplash.com/photo-1528462624147-e8d798e8262c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80',
          description: 'brown building beside body of water at nighttime',
        },
        {
          id: 3,
          author: 'Fatih Ozdemir',
          link: 'https://images.unsplash.com/photo-1542349301445-c5f6ec562729?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2015&q=80',
          description: 'brown cabin on snowy island',
        }
      ]);
    });
};
