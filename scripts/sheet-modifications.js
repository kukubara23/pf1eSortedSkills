Hooks.on('renderActorSheet', (app, html, data) => {
  if (app.actor.type !== 'character') return;

  const skillsList = html.find('.skills-list');
  const skillItems = skillsList.find('li.skill');

  // Function to get the skill tag from the skill element
  function getSkillTag($skill) {
    const inputs = $skill.find('input');
    for (let input of inputs) {
      const name = input.name;
      if (name && name.includes('skills.')) {
        const parts = name.split('.');
        return parts[2]; // This should be the skill tag
      }
    }
    return ''; // Default to empty string if tag not found
  }

  // Sort skills based on their tags
  const sortedSkills = Array.from(skillItems).sort((a, b) => {
    const tagA = getSkillTag($(a));
    const tagB = getSkillTag($(b));
    return tagA.localeCompare(tagB);
  });

  // Reorder the skills in the DOM
  sortedSkills.forEach(skill => skillsList.append(skill));

  // Preserve any additional elements (like add skill button) by appending them last
  skillsList.find('li:not(.skill)').appendTo(skillsList);
});