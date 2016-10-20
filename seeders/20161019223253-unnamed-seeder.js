'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Photos', [
      {
        title: 'Simple Doge',
        description: 'Simple Doge',
        author: 'Such Doge',
        link: 'https://www.skotcher.com/wall/f300b886a001ea4237a18522a7f91d51/doge-meme-minimal.jpg',
        hashtags: '#Simple#DOGE',
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 2
      }, {
        title: 'Many Doge',
        description: 'Many Doge',
        author: 'Such Doge',
        link: 'http://admissions.vanderbilt.edu/insidedores/manage/wp-content/uploads/doge-pattern-27481-2880x1800.jpg',
        hashtags: '#Many#DOGE',
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 2
      },{
        title: 'OG Doge',
        description: 'dOGe',
        author: 'Doge',
        link: 'http://vignette1.wikia.nocookie.net/sanicsource/images/9/97/Doge.jpg/revision/latest?cb=20160112233015',
        hashtags: '#DOGE#OG',
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 2
      },{
        title: 'Snoop Doge',
        description: 'Snoop Doge',
        author: 'Snoop Dogey Doge',
        link: 'https://pbs.twimg.com/media/CdMyFd5UMAAZCiX.jpg',
        hashtags: '#Snoop#DOGE',
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 2
      },{
        title: 'Shrek Doge',
        description: 'Shrek Doge',
        author: 'Shrek Doge',
        link: 'https://pbs.twimg.com/media/B6mfb6nIYAA2Cox.jpg',
        hashtags: '#Snoop#DOGE',
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 2
      }
    ], {});
  },


  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Photos',
      {
        author: ['Such Doge', 'Doge', 'Snoop Dogey Doge']
      }, {});
  }
};
