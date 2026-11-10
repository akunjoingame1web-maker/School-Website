// SPMB Online Admission Form Handler
document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('spmb-form');
    const alertBox = document.getElementById('spmb-alert');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const payload = {
            child_name: document.getElementById('child_name').value,
            dob: document.getElementById('dob').value,
            gender: document.getElementById('gender').value,
            parent_name: document.getElementById('parent_name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            program: document.getElementById('program').value
        };
        
        try {
            const res = await fetch('/api/spmb', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await res.json();
            
            if (result.success) {
                alertBox.className = 'alert alert-success';
                alertBox.style.display = 'block';
                alertBox.innerHTML = `
                    🎉 <strong>Pendaftaran Berhasil!</strong><br>
                    Kode Pendaftaran Anda: <strong>${result.registration_code}</strong>.<br>
                    Tim kami akan menghubungi Anda melalui WhatsApp/Email untuk verifikasi berkas.
                `;
                form.reset();
            }
        } catch (err) {
            alertBox.className = 'alert alert-danger';
            alertBox.style.display = 'block';
            alertBox.innerText = 'Terjadi kesalahan. Silakan coba lagi.';
        }
    });
});
