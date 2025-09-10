<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Toggle Data Label pada Chart</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0"></script>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f7ff;
            color: #333;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background-color: white;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        h1 {
            text-align: center;
            color: #2c3e50;
            margin-bottom: 10px;
        }
        .description {
            text-align: center;
            color: #7f8c8d;
            margin-bottom: 30px;
        }
        .chart-container {
            position: relative;
            height: 400px;
            margin-bottom: 30px;
        }
        .controls {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 25px;
        }
        .toggle-btn {
            padding: 10px 20px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
        }
        .toggle-btn:hover {
            background-color: #2980b9;
            transform: translateY(-2px);
        }
        .toggle-btn.active {
            background-color: #2c3e50;
        }
        .instructions {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-top: 25px;
            border-left: 4px solid #3498db;
        }
        code {
            background-color: #eee;
            padding: 2px 5px;
            border-radius: 3px;
            font-family: monospace;
        }
        .highlight {
            background-color: #fff8e1;
            padding: 15px;
            border-radius: 5px;
            margin-top: 15px;
            border-left: 4px solid #ffc107;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Toggle Data Label pada Chart</h1>
        <p class="description">Contoh implementasi toggle untuk menampilkan dan menyembunyikan data label</p>
        
        <div class="controls">
            <button id="showLabels" class="toggle-btn active">Tampilkan Data Label</button>
            <button id="hideLabels" class="toggle-btn">Sembunyikan Data Label</button>
        </div>
        
        <div class="chart-container">
            <canvas id="myChart"></canvas>
        </div>
        
        <div class="instructions">
            <h3>Cara Implementasi:</h3>
            <p>Untuk menambahkan fitur toggle data label pada chart, Anda perlu:</p>
            <ol>
                <li>Menyertakan plugin <code>chartjs-plugin-datalabels</code></li>
                <li>Menambahkan konfigurasi plugin pada opsi chart</li>
                <li>Membuat fungsi untuk mengubah visibilitas data label</li>
            </ol>
            
            <div class="highlight">
                <h4>Kode yang perlu ditambahkan di chartConfig.js:</h4>
                <pre><code>// Dalam opsi chart, tambahkan:
plugins: {
    datalabels: {
        display: true, // Default true (ditampilkan)
        color: '#fff',
        font: {
            weight: 'bold',
            size: 11
        },
        formatter: function(value, context) {
            return value.toLocaleString();
        }
    }
}

// Fungsi untuk toggle data label
function toggleDataLabels(chart, show) {
    chart.options.plugins.datalabels.display = show;
    chart.update();
}</code></pre>
            </div>
        </div>
    </div>

    <script>
        // Data contoh
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'];
        const mtdData = [12000, 19000, 15000, 25000, 22000, 29800];
        const targetData = [20000, 20000, 20000, 20000, 20000, 20000];
        
        // Konfigurasi chart
        const config = {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'MTD VOL',
                        data: mtdData,
                        backgroundColor: 'rgba(54, 162, 235, 0.7)',
                        order: 2
                    },
                    {
                        label: 'ANN FM Target',
                        data: targetData,
                        borderColor: 'rgba(100, 100, 100, 1)',
                        backgroundColor: 'transparent',
                        type: 'line',
                        borderWidth: 2,
                        pointStyle: 'rectRounded',
                        pointRadius: 5,
                        pointBorderColor: 'rgba(100, 100, 100, 1)',
                        pointBackgroundColor: 'white',
                        order: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Volume'
                        }
                    }
                },
                plugins: {
                    // Konfigurasi data labels
                    datalabels: {
                        display: true,
                        color: '#fff',
                        font: {
                            weight: 'bold',
                            size: 11
                        },
                        formatter: function(value, context) {
                            return value.toLocaleString();
                        }
                    }
                }
            }
        };
        
        // Inisialisasi chart
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, config);
        
        // Fungsi untuk toggle data label
        function toggleDataLabels(show) {
            myChart.options.plugins.datalabels.display = show;
            myChart.update();
            
            // Update tombol aktif
            document.getElementById('showLabels').classList.toggle('active', show);
            document.getElementById('hideLabels').classList.toggle('active', !show);
        }
        
        // Event listeners untuk tombol
        document.getElementById('showLabels').addEventListener('click', function() {
            toggleDataLabels(true);
        });
        
        document.getElementById('hideLabels').addEventListener('click', function() {
            toggleDataLabels(false);
        });
    </script>
</body>
</html>
