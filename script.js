document.addEventListener('DOMContentLoaded', () => {
  const openPopUp = document.querySelector('.wrapper_modalWin_active');
  const exitPopUp = document.querySelector('.frame_exitModalWin_action');
  const popUp = document.querySelector('.wrapper_modalWin');
  const addContactBtn = document.getElementById('addContactBtn');
  const contactListUl = document.getElementById('contactListUl');
  const contacts = [];

  const countrySelect = document.getElementById('countrySelect');
  const phoneInput = document.getElementById('phoneInput');

  if (openPopUp && exitPopUp && popUp) {
    openPopUp.addEventListener('click', () => {
      popUp.style.display = 'block';
      const selectedCode = countrySelect.value;
      if (!phoneInput.value.startsWith(selectedCode)) {
        phoneInput.value = selectedCode + ' ';
      }
    });

    exitPopUp.addEventListener('click', () => {
      popUp.style.display = 'none';
    });
  }

  countrySelect.addEventListener('change', () => {
    const selectedCode = countrySelect.value;
    if (!phoneInput.value.startsWith(selectedCode)) {
      phoneInput.value = selectedCode + ' ';
    }
  });

  if (addContactBtn) {
    addContactBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const firstNameInput = document.getElementById('firstNameInput');
      const phoneInput = document.getElementById('phoneInput');
      const nameError = document.getElementById('nameError');
      const phoneError = document.getElementById('phoneError');

      const firstName = firstNameInput.value.trim();
      const phone = phoneInput.value.trim();

      let valid = true;

      nameError.textContent = '';
      phoneError.textContent = '';
      firstNameInput.classList.remove('input-error');
      phoneInput.classList.remove('input-error');

      if (firstName === '') {
        nameError.textContent = 'Error with your name';
        firstNameInput.classList.add('input-error');
        valid = false;
      }

      if (phone === '') {
        phoneError.textContent = 'Error with your phone-number';
        phoneInput.classList.add('input-error');
        valid = false;
      }

      if (!valid) return;

      contacts.push({ firstName, phone });
      displayContacts();
      clearInputs();
      popUp.style.display = 'none';
    });
  }

  function displayContacts() {
    if (!contactListUl) return;
    contactListUl.innerHTML = '';

    contacts.forEach((contact, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="contact-info">${contact.firstName} - ${contact.phone}</span>
        <button class="btn-action" data-action="delete" data-index="${index}">
          <img src="img/delate.png" alt="Видалити" />
        </button>
      `;
      contactListUl.appendChild(li);
    });
  }

  if (contactListUl) {
    contactListUl.addEventListener('click', (e) => {
      if (e.target.closest('button')?.dataset.action === 'delete') {
        const index = e.target.closest('button').dataset.index;
        contacts.splice(index, 1);
        displayContacts();
      }
    });
  }

  function clearInputs() {
    const firstNameInput = document.getElementById('firstNameInput');
    const phoneInput = document.getElementById('phoneInput');
    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');

    firstNameInput.value = '';
    phoneInput.value = '';
    firstNameInput.classList.remove('input-error');
    phoneInput.classList.remove('input-error');
    nameError.textContent = '';
    phoneError.textContent = '';
  }
});
document.addEventListener('DOMContentLoaded', () => {   
    const track = document.querySelector('.slider-track');  
    const prevBtn = document.querySelector('.slider-btn-prev');
    const nextBtn = document.querySelector('.slider-btn-next');
    const slideWidth = document.querySelector('.swiper').offsetWidth + 20;
    let scrollPosition = 0;

    nextBtn.addEventListener('click', () => {
        const maxScroll = track.scrollWidth - track.offsetWidth;
        scrollPosition = Math.min(scrollPosition + slideWidth, maxScroll);
        track.style.transform = translateX(`-${scrollPosition}px`);
    });

    prevBtn.addEventListener('click', () => {
        scrollPosition = Math.max(scrollPosition - slideWidth, 0);
        track.style.transform = translateX(`-${scrollPosition}px`);
    });
});
new Swiper('.swiper', {
    slidesPerView: 5,
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-prev',
      prevEl: '.swiper-button-next',
    }, 
    loop: true,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0
    
  });       
 