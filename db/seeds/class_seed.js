exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('classes')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('classes').insert([
        {
          class: 'Death Knight',
          link: 'http://localhost:3003/DK.jpg',

          desc:
            'Death Knights engage their foes up-close, supplementing swings of their weapons with dark magic that renders enemies vulnerable or damages them with unholy power. They drag foes into one-on-one conflicts, compelling them to focus their attacks away from weaker companions. To prevent their enemies from fleeing their grasp, death knights must remain mindful of the power they call forth from runes, and pace their attacks appropriately.'
        },
        {
          class: 'Druid',
          link: 'http://localhost:3003/Druid.jpg',

          desc:
            'Druids are versatile combatants, in that they can fulfill nearly every role – healing, tanking, and damage dealing. It’s critical that druids tailor the form they choose to the situation, as each form bears a specific purpose.'
        },
        {
          class: 'Demon Hunter',
          link: 'http://localhost:3003/DH.png',

          desc:
            'Forgoing heavy armor, Demon Hunters capitalize on speed, closing the distance quickly to strike enemies with one-handed weapons. However, Illidari must also use their agility defensively to ensure that battles end favorably.'
        },
        {
          class: 'Hunter',
          link: 'http://localhost:3003/Hunter.jpg',
          desc:
            'Hunters battle their foes at a distance, commanding their pets to attack while they nock their arrows and fire their guns. Though their missile weapons are effective at short and long ranges, hunters are also highly mobile. They can evade or restrain their foes to control the arena of battle.'
        },
        {
          class: 'Mage',
          link: 'http://localhost:3003/Mage.jpg',

          desc:
            'Mages demolish their foes with arcane incantations. Although they wield powerful offensive spells, mages are fragile and lightly armored, making them particularly vulnerable to close-range attacks. Wise mages make careful use of their spells to keep their foes at a distance or hold them in place.'
        },
        {
          class: 'Monk',
          link: 'http://localhost:3003/Monk.png',
          desc:
            'Whatever their combat role, monks rely mainly on their hands and feet to do the talking, and on strong connection with their inner chi to power their abilities. Abilities such as Expel Harm and Chi Wave both heal their allies while at the same time damaging their enemies'
        },
        {
          class: 'Paladin',
          link: 'http://localhost:3003/Pally.jpg',
          desc:
            'Paladins stand directly in front of their enemies, relying on heavy armor and healing in order to survive incoming attacks. Whether with massive shields or crushing two-handed weapons, Paladins are able to keep claws and swords from their weaker fellows – or they use healing magic to ensure that they remain on their feet.'
        },
        {
          class: 'Rogue',
          link: 'http://localhost:3003/Rogue.png',
          desc:
            'Rogues often initiate combat with a surprise attack from the shadows, leading with vicious melee strikes. When in protracted battles, they utilize a successive combination of carefully chosen attacks to soften the enemy up for a killing blow. Rogues must take special care when selecting targets so that their combo attacks are not wasted, and they must be conscious of when to hide or flee if a battle turns against them.'
        },
        {
          class: 'Shaman',
          link: 'http://localhost:3003/Shaman.jpg',
          desc:
            'During combat, shaman place damaging and controlling totems on the ground to maximize their effectiveness while hindering their enemies. Shaman are versatile enough to battle foes up close or at range, but wise shaman choose their avenue of attack based on their enemies’ strengths and weaknesses'
        },
        {
          class: 'Warlock',
          link: 'http://localhost:3003/Warlock.png',
          desc:
            'Warlocks burn and destroy weakened foes with a combination of crippling illnesses and dark magic. While their demon pets protect and enhance them, warlocks strike at their enemies from a distance. As physically weak spellcasters bereft of heavy armor, cunning warlocks allow their minions to take the brunt of enemy attacks in order to save their own skin'
        },
        {
          class: 'Warrior',
          link: 'http://localhost:3003/Warrior.jpg',
          desc:
            'Warriors equip themselves carefully for combat and engage their enemies head-on, letting attacks glance off their heavy armor. They use diverse combat tactics and a wide variety of weapon types to protect their more vulnerable allies. Warriors must carefully master their rage – the power behind their strongest attacks – in order to maximize their effectiveness in combat.'
        }
      ]);
    })
    .then(() => {
      return knex('author')
        .del()
        .then(() => {
          return knex('author').insert([
            { name: 'Audrey', photo_id: 1 },
            { name: 'Audrey', photo_id: 2 },
            { name: 'Audrey', photo_id: 3 },
            { name: 'Audrey', photo_id: 4 },
            { name: 'Audrey', photo_id: 5 },
            { name: 'Audrey', photo_id: 6 },
            { name: 'Audrey', photo_id: 7 },
            { name: 'Audrey', photo_id: 8 },
            { name: 'Audrey', photo_id: 9 },
            { name: 'Audrey', photo_id: 10 },
            { name: 'Audrey', photo_id: 11 }
          ]);
        });
    });
};
