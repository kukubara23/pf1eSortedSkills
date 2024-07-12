Hooks.once('init', () => {
  game.settings.register('pf1-sorted-skills', 'arbitrarySkillsAtBottom', {
    name: 'Place "Add Skill" options at bottom',
    hint: 'If checked, "Add Skill" options for Craft, Perform, and Profession will be placed at the bottom of the skills list.',
    scope: 'world',
    config: true,
    type: Boolean,
    default: false
  });
});

Hooks.on('renderActorSheet', (app, html, data) => {
  if (app.actor.type !== 'character') return;
  const skillsList = html.find('.skills-list');
  const skillItems = skillsList.find('li.skill');
  
  // Function to get the skill ID
  function getSkillId($skill) {
    const input = $skill.find('input[name^="system.skills"]').first();
    if (input.length) {
      const name = input.attr('name');
      // Extract the relevant part of the ID
      const match = name.match(/system\.skills\.([^.]+)(?:\.subSkills\.([^.]+))?/);
      if (match) {
        return match[2] ? `${match[1]}.${match[2]}` : match[1];
      }
    }
    return $skill.find('.skill-name h4').text().trim().toLowerCase();
  }

  const arbitrarySkillsAtBottom = game.settings.get('pf1-sorted-skills', 'arbitrarySkillsAtBottom');

  // Separate arbitrary skills if the setting is true
  const arbitrarySkills = arbitrarySkillsAtBottom ? skillItems.filter('.arbitrary') : $();
  const regularSkills = arbitrarySkillsAtBottom ? skillItems.not('.arbitrary') : skillItems;

  // Sort skills
  const sortedSkills = Array.from(regularSkills).sort((a, b) => {
    const idA = getSkillId($(a));
    const idB = getSkillId($(b));
    return idA.localeCompare(idB);
  });

  // Reorder skills
  sortedSkills.forEach(skill => {
    const $skill = $(skill);
    skillsList.append($skill);
  });

  // Append arbitrary skills at the bottom if the setting is true
  if (arbitrarySkillsAtBottom) {
    arbitrarySkills.each((index, skill) => {
      skillsList.append($(skill));
    });
  }

  // Move the general "Add Skill" control to the bottom
  const addSkillControl = skillsList.find('.controls.skills');
  addSkillControl.appendTo(skillsList);
});