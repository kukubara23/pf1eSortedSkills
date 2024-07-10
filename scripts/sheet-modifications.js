Hooks.on('renderActorSheet', (app, html, data) => {
  if (app.actor.type !== 'character') return;

  const skillsList = html.find('.skills-list');
  const skillItems = skillsList.find('li.skill').not('.sub-skill');
  
  // Function to get the skill name
  function getSkillName($skill) {
    return $skill.find('.skill-name h4').text().trim().toLowerCase();
  }

  // Sort skills
  const sortedSkills = Array.from(skillItems).sort((a, b) => {
    const nameA = getSkillName($(a));
    const nameB = getSkillName($(b));
    
    // Special handling for Craft, Perform, Profession
    const specialSkills = ['craft', 'perform', 'profession'];
    const isSpecialA = specialSkills.includes(nameA);
    const isSpecialB = specialSkills.includes(nameB);
    
    if (isSpecialA && !isSpecialB) return 1;
    if (!isSpecialA && isSpecialB) return -1;
    return nameA.localeCompare(nameB);
  });

  // Reorder skills
  sortedSkills.forEach(skill => {
    const $skill = $(skill);
    const skillId = $skill.data('skill');
    const subSkills = skillsList.find(`li.sub-skill[data-sub-skill="${skillId}"]`);
    skillsList.append($skill);
    if (subSkills.length) {
      skillsList.append(subSkills);
    }
  });

  // Move the "Add Skill" control to the bottom
  const addSkillControl = skillsList.find('.controls.skills');
  skillsList.append(addSkillControl);
});
