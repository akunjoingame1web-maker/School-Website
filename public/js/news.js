// News Page Handler
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('news-list');
    if (!container) return;
    
    try {
        const res = await fetch('/api/news');
        const news = await res.json();
        
        container.innerHTML = news.map(item => `
            <article class="card" style="margin-bottom: 1.5rem;">
                <span class="badge">${item.category}</span>
                <h2>${item.title}</h2>
                <p style="color:#888; font-size:0.9rem; margin-bottom: 0.8rem;">Dipublikasikan: ${item.date}</p>
                <p><strong>${item.summary}</strong></p>
                <p style="margin-top:0.5rem;">${item.content}</p>
            </article>
        `).join('');
    } catch (e) {
        container.innerHTML = '<p>Gagal memuat berita.</p>';
    }
});
