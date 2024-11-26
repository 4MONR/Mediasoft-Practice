const contacts = [
    { id: 1, name: 'Алиса', phone: '+7 (123) 456-78-90', favorite: true },
    { id: 2, name: 'Борис', phone: '+7 (987) 654-32-10', favorite: false },
  ];
  
  const contactsContainer = document.getElementById('contactsContainer');
  const searchInput = document.getElementById('searchInput');
  const modal = document.getElementById('modal');
  const addContactBtn = document.getElementById('addContactBtn');
  const closeModal = document.getElementById('closeModal');
  const addContactForm = document.getElementById('addContactForm');
  const phoneInput = document.getElementById('contactPhone');
  
  phoneInput.addEventListener('input', () => {
    let input = phoneInput.value.replace(/\D/g, '');
  
    if (input.startsWith('8')) {
      input = '7' + input.slice(1);
    }
  
    phoneInput.value = input
      .replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5') 
      .substring(0, 18); 
  });
  
  function renderContacts(filter = '') {
    contactsContainer.innerHTML = '';
  
    const filteredContacts = contacts
      .filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => {
        if (a.favorite === b.favorite) {
          return a.name.localeCompare(b.name);
        }
        return b.favorite - a.favorite;
      });
  
    filteredContacts.forEach((contact) => {
      const card = document.createElement('div');
      card.className = 'contact-card';
  
      card.innerHTML = `
        <div class="contact-info">
          <img src="https://via.placeholder.com/40" alt="Аватар" />
          <div>
            <div>${contact.name}</div>
            <div>${contact.phone}</div>
          </div>
        </div>
        <div class="contact-actions">
          <button onclick="deleteContact(${contact.id})">🗑️</button>
          <button onclick="toggleFavorite(${contact.id})">${
        contact.favorite ? '❤️' : '🤍'
      }</button>
        </div>
      `;
  
      contactsContainer.appendChild(card);
    });
  }
  
  function deleteContact(id) {
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index > -1) {
      contacts.splice(index, 1);
      renderContacts(searchInput.value);
    }
  }
  
  function toggleFavorite(id) {
    const contact = contacts.find((contact) => contact.id === id);
    if (contact) {
      contact.favorite = !contact.favorite;
      renderContacts(searchInput.value);
    }
  }
  
  addContactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const favorite = document.getElementById('contactFavorite').checked;
  
    if (name && phone) {
      contacts.push({ id: Date.now(), name, phone, favorite });
      renderContacts();
      modal.classList.add('hidden');
      addContactForm.reset(); 
    }
  });
  
  addContactBtn.addEventListener('click', () => modal.classList.remove('hidden'));
  closeModal.addEventListener('click', () => modal.classList.add('hidden'));
  
  searchInput.addEventListener('input', (e) => renderContacts(e.target.value));
  
  renderContacts();
  
