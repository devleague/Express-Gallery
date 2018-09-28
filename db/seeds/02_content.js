
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('content_table').del()
    .then(function () {
      // Inserts seed entries
      return knex('content_table').insert([
        {
          title: 'Mountain Hill Cabin Winter - ',
          link: 'www.fantasticnorway.no',
          description: 'The project is a winter cabin to be built in a highly restricted area in the mountain landscape of Al in Norway. The cabin is designed as a landscape element that leads wind and snow around and over the building. One of the client’s initial wishes was to be able to actually go skiing, sledge riding and picnicking on to of the cabin. \n\nThe cabin is to be erected during late summer 2012.'
        },
        {
          title: 'Bronnoy Kunstbase - ',
          link: 'www.fantasticnorway.no',
          description: 'The project is a winter cabin to be built in a highly restricted area in the mountain landscape of Al in Norway. The cabin is designed as a landscape element that leads wind and snow around and over the building. One of the client’s initial wishes was to be able to actually go skiing, sledge riding and picnicking on to of the cabin. \n\nThe cabin is to be erected during late summer 2012.'
        },
        {
          title: 'Kneisen Visitors Center - ',
          link: 'www.fantasticnorway.no',
          description: 'The project is a winter cabin to be built in a highly restricted area in the mountain landscape of Al in Norway. The cabin is designed as a landscape element that leads wind and snow around and over the building. One of the client’s initial wishes was to be able to actually go skiing, sledge riding and picnicking on to of the cabin. \n\nThe cabin is to be erected during late summer 2012.'
        },
        {
          title: 'Stimen - ',
          link: 'www.fantasticnorway.no',
          description: 'The project is a winter cabin to be built in a highly restricted area in the mountain landscape of Al in Norway. The cabin is designed as a landscape element that leads wind and snow around and over the building. One of the client’s initial wishes was to be able to actually go skiing, sledge riding and picnicking on to of the cabin. \n\nThe cabin is to be erected during late summer 2012.'
        },
        {
          title: 'Sirene Luxurious - ',
          link: 'www.fantasticnorway.no',
          description: 'The project is a winter cabin to be built in a highly restricted area in the mountain landscape of Al in Norway. The cabin is designed as a landscape element that leads wind and snow around and over the building. One of the client’s initial wishes was to be able to actually go skiing, sledge riding and picnicking on to of the cabin. \n\nThe cabin is to be erected during late summer 2012.'
        },
        {
          title: 'Mountain Hill Cabin - ',
          link: 'www.fantasticnorway.no',
          description: 'The project is a winter cabin to be built in a highly restricted area in the mountain landscape of Al in Norway. The cabin is designed as a landscape element that leads wind and snow around and over the building. One of the client’s initial wishes was to be able to actually go skiing, sledge riding and picnicking on to of the cabin. \n\nThe cabin is to be erected during late summer 2012.'
        }
      ]);
    });
};
