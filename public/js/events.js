// Agenda Page Handler
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('agenda-list');
    if (!container) return;
    
    try {
        const res = await fetch('/api/events');
        const events = await res.json();
        
        container.innerHTML = events.map(item => `
            <div class="card" style="border-left: 5px solid var(--primary);">
                <h3>${item.title}</h3>
                <p>📅 <strong>Tanggal:</strong> ${item.date}</p>
                <p>⏰ <strong>Waktu:</strong> ${item.time}</p>
                <p>📍 <strong>Tempat:</strong> ${item.location}</p>
                <p style="margin-top:0.5rem;">${item.description}</p>
            </div>
        `).join('');
    } catch (e) {
        container.innerHTML = '<p>Gagal memuat agenda.</p>';
    }
});
