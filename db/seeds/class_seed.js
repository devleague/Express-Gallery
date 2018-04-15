exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('classes')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('classes').insert([
        {
          class: 'Death Knight',
          link: '../uploads/DK',
          author: 'Audrey',
          desc:
            'Death Knights engage their foes up-close, supplementing swings of their weapons with dark magic that renders enemies vulnerable or damages them with unholy power. They drag foes into one-on-one conflicts, compelling them to focus their attacks away from weaker companions. To prevent their enemies from fleeing their grasp, death knights must remain mindful of the power they call forth from runes, and pace their attacks appropriately.'
        },
        {
          class: 'Druid',
          link: '../uploads/Druid',
          author: 'Audrey',
          desc:
            'Druids are versatile combatants, in that they can fulfill nearly every role – healing, tanking, and damage dealing. It’s critical that druids tailor the form they choose to the situation, as each form bears a specific purpose.'
        },
        {
          class: 'Demon Hunter',
          link: '../uploads/DH',
          author: 'Audrey',
          desc:
            'Forgoing heavy armor, Demon Hunters capitalize on speed, closing the distance quickly to strike enemies with one-handed weapons. However, Illidari must also use their agility defensively to ensure that battles end favorably.'
        }
      ]);
    });
};
