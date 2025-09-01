// Set minimum date to today
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').setAttribute('min', today);
    
    // Form submission handling
    document.getElementById('booking-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;
        const message = document.getElementById('message').value;
        
        // In a real application, you would send this data to a server
        console.log('Booking details:', { name, phone, date, time, guests, message });
        
        // Show confirmation message
        alert(`Thank you, ${name}! Your table for ${guests} has been booked for ${date} at ${time}. We will contact you at ${phone} if needed.`);
        
        // Reset form
        this.reset();
    });
});