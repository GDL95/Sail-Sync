function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function handleBooking(e) {
  e.preventDefault();
  alert('Reservering verwerkt (test).');
}

document.getElementById('bookingForm').addEventListener('input', function() {
  const boats = parseInt(this.boats.value) || 0;
  const price = boats * 500;
  document.getElementById('priceDisplay').innerText = `Prijs: €${price}`;
});