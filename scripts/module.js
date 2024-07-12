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