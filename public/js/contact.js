// Contact Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Pesan Anda telah terkirim! Terima kasih telah menghubungi TK Bali Global Kinderschool.');
        form.reset();
    });
});
