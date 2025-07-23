const VALID_USERNAME = "Sail&Sync";
const VALID_PASSWORD = "Ons_mannetje";

document.addEventListener('DOMContentLoaded', () => {
  const savedUser = localStorage.getItem('adminUser');
  if (savedUser) {
    document.getElementById('username').value = savedUser;
    document.getElementById('rememberMe').checked = true;
  }
});

function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const remember = document.getElementById('rememberMe').checked;

  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    if (remember) {
      localStorage.setItem('adminUser', username);
    } else {
      localStorage.removeItem('adminUser');
    }
    document.getElementById('loginSection').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    loadReservations();
  } else {
    alert('Ongeldige inloggegevens');
  }
}

function loadReservations() {
  fetch('assets/data.json')
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById('reservations');
      tbody.innerHTML = '';
      data.forEach(r => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td class="px-4 py-2">${r.name}</td>
          <td class="px-4 py-2">${r.email}</td>
          <td class="px-4 py-2">${r.date}</td>
          <td class="px-4 py-2">${r.timeSlot}</td>
          <td class="px-4 py-2">${r.boats}</td>
          <td class="px-4 py-2">${r.package}</td>
          <td class="px-4 py-2">${r.notes}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch(err => console.error('Fout bij laden van reserveringen:', err));
}

function exportCSV() {
  fetch('assets/data.json')
    .then(res => res.json())
    .then(data => {
      let csv = 'Naam,Email,Datum,Dagdeel,Boten,Arrangement,Notitie\n';
      data.forEach(r => {
        csv += `${r.name},${r.email},${r.date},${r.timeSlot},${r.boats},${r.package},${r.notes}\n`;
      });
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'reserveringen.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
}
