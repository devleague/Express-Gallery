
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
          title: 'Lanikai Pillboxes',
          author: 'Anthony Intraversato',
          link: 'https://images.unsplash.com/photo-1523933553793-7b3b60a7ab8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
          description: 'Four friends stand on the last of three pillboxes on the lanikai hiking trail'
        },
        {
          title: 'Yosemite National Park Road',
          author: 'Ivana Cajina',
          link: 'https://images.unsplash.com/photo-1500049242364-5f500807cdd7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=681&q=80',
          description: 'We all were pretty exhausted from this hike, decided to take a break (especially due to the heavy gear we all carried) and once we stopped we realized how beautiful the fog was. We noticed a waterfall and a creek leading down. This is when my two travel friends decided to point this all out as I, and another fellow photographer, decided to chug our water.   Luckily I had my camera in reach, and captured the shot.'
        },
        {
          title: 'Horseshoe Bend',
          author: 'Jeremy Bishop',
          link: 'https://images.unsplash.com/photo-1493624267542-91bf9ddf92d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          description: 'Look at this guy standing at the top of a canyon while wearing a Mexican blanket?'
        },
        {
          title: 'Unknown Mountain in Russia',
          author: 'Anton Murygin',
          link: 'https://images.unsplash.com/photo-1499323544943-39d8e7b75615?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          description: 'people walking on snow-covered hill beside gray mountain'
        },
        {
          title: 'Zion National Park',
          author: 'Zach Betten',
          link: 'https://images.unsplash.com/photo-1445308124430-8357b98a6f71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80',
          description: 'Serengeti lookin\' ass'
        },
        {
          title: 'Piatra Craiului Mountains',
          author: 'David Marcu',
          link: 'https://images.unsplash.com/photo-1456613820599-bfe244172af5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80',
          description: 'I can\'t believe how fast I can hike with these dumbass looking hiking poles!'
        },
        {
          title: 'Canmore, Canada',
          author: 'Kalen Emsley',
          link: 'https://images.unsplash.com/photo-1465188035480-cf3a60801ea5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
          description: 'High up'
        },
        {
          title: 'Sahara Desert',
          author: 'Savvas Kalimeris',
          link: 'https://images.unsplash.com/photo-1523653049681-701d71cf57c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=812&q=80',
          description: 'Hiking the dunes'
        },
        {
          title: 'Angel\'s Landing',
          author: 'Kristna Wagner',
          link: 'https://images.unsplash.com/photo-1504193902866-27cfb5aafcc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          description: 'Like, wow. Look at, like, all those rocks and trees'
        },
        {
          title: 'Secret Spot',
          author: 'Julian Bialowas',
          link: 'https://images.unsplash.com/photo-1414016642750-7fdd78dc33d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80',
          description: 'Posted up for the night'
        },
        {
          title: 'Ryan Mountain',
          author: 'Brent Payton',
          link: 'https://images.unsplash.com/photo-1484523239100-bbd9b1827b23?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1490&q=80',
          description: 'Four friends stand on the last of three pillboxes on the lanikai hiking trail'
        },
      ]);
    });
};
