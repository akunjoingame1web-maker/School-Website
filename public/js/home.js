// Homepage Dynamic Data Fetching
document.addEventListener('DOMContentLoaded', () => {
    fetchNewsHighlights();
    fetchAgendaHighlights();
});

async function fetchNewsHighlights() {
    try {
        const res = await fetch('/api/news');
        const news = await res.json();
        const container = document.getElementById('news-highlights');
        if (!container) return;
        
        container.innerHTML = news.slice(0, 3).map(item => `
            <div class="card">
                <span class="badge">${item.category}</span>
                <h3>${item.title}</h3>
                <small style="color:#777;">${item.date}</small>
                <p style="margin-top:0.5rem;">${item.summary}</p>
            </div>
        `).join('');
    } catch (e) {
        console.error("Failed to load news highlights", e);
    }
}

async function fetchAgendaHighlights() {
    try {
        const res = await fetch('/api/events');
        const events = await res.json();
        const container = document.getElementById('agenda-highlights');
        if (!container) return;
        
        container.innerHTML = events.slice(0, 2).map(item => `
            <div class="card" style="border-left: 4px solid var(--secondary);">
                <span class="badge" style="background:#4ecdc4; color:#fff;">${item.date}</span>
                <h3>${item.title}</h3>
                <p><strong>Waktu:</strong> ${item.time}</p>
                <p><strong>Lokasi:</strong> ${item.location}</p>
            </div>
        `).join('');
    } catch (e) {
        console.error("Failed to load agenda highlights", e);
    }
}
