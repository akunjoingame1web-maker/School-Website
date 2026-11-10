// Gallery Page Handler
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('gallery-grid');
    if (!container) return;
    
    try {
        const res = await fetch('/api/gallery');
        const items = await res.json();
        
        container.innerHTML = items.map(item => {
            if (item.type === 'Foto') {
                return `
                    <div class="card">
                        <img src="${item.url}" alt="${item.title}" style="width:100%; height:200px; object-fit:cover; border-radius:8px;">
                        <h4 style="margin-top:0.8rem;">${item.title}</h4>
                        <p style="font-size:0.85rem; color:#666;">${item.caption}</p>
                    </div>
                `;
            } else {
                return `
                    <div class="card">
                        <iframe width="100%" height="200" src="${item.url}" frameborder="0" allowfullscreen style="border-radius:8px;"></iframe>
                        <h4 style="margin-top:0.8rem;">${item.title}</h4>
                        <p style="font-size:0.85rem; color:#666;">${item.caption}</p>
                    </div>
                `;
            }
        }).join('');
    } catch (e) {
        container.innerHTML = '<p>Gagal memuat galeri.</p>';
    }
});
