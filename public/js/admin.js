// Admin Management Panel Handler
document.addEventListener('DOMContentLoaded', () => {
    loadSubmissions();
    loadNewsAdmin();
    
    // Add News Event Listener
    const newsForm = document.getElementById('admin-news-form');
    if (newsForm) {
        newsForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const payload = {
                title: document.getElementById('news_title').value,
                category: document.getElementById('news_category').value,
                summary: document.getElementById('news_summary').value,
                content: document.getElementById('news_content').value
            };
            await fetch('/api/news', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            });
            newsForm.reset();
            loadNewsAdmin();
        });
    }
});

async function loadSubmissions() {
    const tbody = document.getElementById('spmb-table-body');
    if (!tbody) return;
    
    try {
        const res = await fetch('/api/spmb/submissions');
        const list = await res.json();
        
        tbody.innerHTML = list.map(item => `
            <tr>
                <td><strong>${item.registration_code}</strong></td>
                <td>${item.child_name}</td>
                <td>${item.program}</td>
                <td>${item.parent_name}</td>
                <td>${item.phone}</td>
                <td><span class="badge">${item.status}</span></td>
            </tr>
        `).join('');
    } catch (e) {
        tbody.innerHTML = '<tr><td colspan="6">Gagal memuat data pendaftar.</td></tr>';
    }
}

async function loadNewsAdmin() {
    const listContainer = document.getElementById('admin-news-list');
    if (!listContainer) return;
    
    try {
        const res = await fetch('/api/news');
        const list = await res.json();
        
        listContainer.innerHTML = list.map(n => `
            <div class="card" style="margin-bottom:0.8rem; display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <strong>${n.title}</strong> <small>(${n.date})</small>
                </div>
                <button class="btn btn-secondary" style="padding:0.3rem 0.6rem; font-size:0.8rem; background:#e74c3c;" onclick="deleteNews(${n.id})">Hapus</button>
            </div>
        `).join('');
    } catch (e) {}
}

async function deleteNews(id) {
    if (confirm('Yakin ingin menghapus berita ini?')) {
        await fetch(`/api/news?id=${id}`, { method: 'DELETE' });
        loadNewsAdmin();
    }
}
