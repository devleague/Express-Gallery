
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('gallery').del()
    .then(function () {
      // Inserts seed entries
      return knex('gallery').insert([
        {
          title: 'Stairway to Heaven',
          author: 'Chad Greiter',
          link: 'https://images.unsplash.com/photo-1492692171456-76c5c1dfae1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          description: 'The famous Stairway to heaven hike on Oahu, Hawaii',
        },
        {
          title: 'Manoa Falls',
          author: 'Jakob Owens',
          link: 'https://images.unsplash.com/photo-1476988552461-c1cb135cd48b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          description: 'A man stands at the base of Manoa Waterfall',
        },
        {
          title: 'Pali Notches',
          author: 'Keith Champaco',
          link: 'https://images.unsplash.com/photo-1542302479327-e0076c4503ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
          description: 'This past summer I went hiking with one of my best friends and this is one of our norms ––sitting atop mountaintops and enjoying the views',
        },
        {
          title: 'Lanikai Pillboxes',
          author: 'Anthony Intraversato',
          link: 'https://images.unsplash.com/photo-1523933553793-7b3b60a7ab8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
          description: 'Four friends stand on the last of three pillboxes on the lanikai hiking trail'
        }
      ]);
    });
};
