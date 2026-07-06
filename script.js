const cards = document.querySelectorAll('.project-card');

cards.forEach((card) => {
  card.addEventListener('click', (event) => {
    const link = card.querySelector('a');
    if (link && event.target.tagName !== 'A') {
      link.click();
    }
  });
});
