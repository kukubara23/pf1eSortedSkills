Hooks.on('renderActorSheet', (app, html, data) => {
  if (app.actor.type !== 'character') return;
  const skillsList = html.find('.skills-list');
  const skillItems = skillsList.find('li.skill').not('.arbitrary');
  
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

  // Sort skills
  const sortedSkills = Array.from(skillItems).sort((a, b) => {
    const idA = getSkillId($(a));
    const idB = getSkillId($(b));
    return idA.localeCompare(idB);
  });

  // Reorder skills
  sortedSkills.forEach(skill => {
    const $skill = $(skill);
    skillsList.append($skill);
  });

  // Move arbitrary skills (Add Skill options) to the bottom
  const arbitrarySkills = skillsList.find('li.skill.arbitrary');
  arbitrarySkills.appendTo(skillsList);

  // Move the general "Add Skill" control to the bottom
  const addSkillControl = skillsList.find('.controls.skills');
  addSkillControl.appendTo(skillsList);
});
