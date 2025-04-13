window.addEventListener('DOMContentLoaded', () => {
    const sweetBtn = document.getElementById('sweetBtn');
  
    if (sweetBtn) {
      sweetBtn.addEventListener('mouseenter', () => {
        sweetBtn.src = 'images/click_black.png';
      });
  
      sweetBtn.addEventListener('mouseleave', () => {
        sweetBtn.src = 'images/click_white.png';
      });
    }
  });
  
