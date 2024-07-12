Hooks.on('renderActorSheet', (app, html, data) => {
  if (app.actor.type !== 'character') return;

  const skillsList = html.find('.skills-list');
  const skillItems = skillsList.find('li.skill').not('.arbitrary');
  
  // Function to get the skill name or subskill name
  function getSkillName($skill) {
    let name;
    if ($skill.hasClass('sub-skill')) {
      name = $skill.find('input[name$=".name"]').val().trim();
      // Strip out parent skill name (Craft, Perform, or Profession)
      name = name.replace(/^(Craft|Perform|Profession)\s*\(/, '').replace(/\)$/, '');
    } else {
      name = $skill.find('.skill-name h4').text().trim();
    }
    return name.toLowerCase();
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
    skillsList.append($skill);
  });

  // Move arbitrary skills (Add Skill options) to the bottom
  const arbitrarySkills = skillsList.find('li.skill.arbitrary');
  arbitrarySkills.appendTo(skillsList);

  // Move the general "Add Skill" control to the bottom
  const addSkillControl = skillsList.find('.controls.skills');
  addSkillControl.appendTo(skillsList);
});
