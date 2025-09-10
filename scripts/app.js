// scripts/app.js
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('excel-file');
    const uploadArea = document.getElementById('upload-area');
    
    // Event listener untuk upload file
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
    
    if (uploadArea) {
        uploadArea.addEventListener('click', () => fileInput.click());
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                handleFileUpload();
            }
        });
    }
});

function handleFileUpload(event) {
    const file = event ? event.target.files[0] : document.getElementById('excel-file').files[0];
    
    if (!file) return;
    
    // Validasi ukuran file (2MB - 30MB)
    if (file.size < 2 * 1024 * 1024 || file.size > 30 * 1024 * 1024) {
        alert('Ukuran file harus antara 2MB dan 30MB');
        return;
    }
    
    // Validasi tipe file
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
        alert('Hanya file Excel (.xlsx, .xls) yang diperbolehkan');
        return;
    }
    
    // Tampilkan loading indicator
    showLoading();
    
    // Parse file Excel
    parseExcelFile(file)
        .then(data => {
            processData(data);
            hideUploadArea();
        })
        .catch(error => {
            console.error('Error parsing Excel:', error);
            alert('Error parsing file Excel: ' + error.message);
        })
        .finally(() => {
            hideLoading();
        });
}

function showLoading() {
    // Implementasi loading indicator
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function hideUploadArea() {
    document.getElementById('upload-container').style.display = 'none';
}

function processData(data) {
    // Normalisasi data dan siapkan untuk visualisasi
    const normalizedData = normalizeData(data);
    
    // Update dashboard dengan data yang telah diproses
    updateDashboard(normalizedData);
}

function normalizeData(data) {
    // Implementasi normalisasi data
    // Menyamakan penulisan kolom tanpa memperdulikan huruf besar/kecil dan spasi
    const normalized = [];
    
    data.forEach(row => {
        const normalizedRow = {};
        for (const key in row) {
            if (row.hasOwnProperty(key)) {
                // Normalisasi nama kolom
                const normalizedKey = key.trim().toLowerCase().replace(/\s+/g, '');
                normalizedRow[normalizedKey] = row[key];
            }
        }
        normalized.push(normalizedRow);
    });
    
    return normalized;
}

function updateDashboard(data) {
    // Implementasi update dashboard dengan data yang telah dinormalisasi
    updateKPIs(data);
    updateCharts(data);
}

function updateKPIs(data) {
    // Hitung dan update nilai KPI
    // Implementasi perhitungan berdasarkan data
}

function updateCharts(data) {
    // Update semua chart dengan data baru
    // Implementasi update chart
}

function toggleSidebar() {
    console.log("Toggle sidebar clicked!"); // Untuk debugging
    
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const toggleBtn = document.querySelector('.sidebar-toggle');
    
    if (sidebar && mainContent) {
        // Toggle class collapsed pada sidebar
        sidebar.classList.toggle('collapsed');
        
        // Toggle class expanded pada main content
        mainContent.classList.toggle('expanded');
        
        // Ganti icon/teks pada tombol (optional)
        if (toggleBtn) {
            if (sidebar.classList.contains('collapsed')) {
                toggleBtn.innerHTML = '→'; // atau icon panah kanan
            } else {
                toggleBtn.innerHTML = '←'; // atau icon panah kiri
            }
        }
    }
}
