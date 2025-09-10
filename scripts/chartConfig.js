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
            background: linear-gradient(135deg, #f5f7ff 0%, #e3e6ff 100%);
            color: #333;
            min-height: 100vh;
        }
        .container {
            max-width: 900px;
            margin: 20px auto;
            background-color: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        h1 {
            text-align: center;
            color: #2c3e50;
            margin-bottom: 10px;
            font-weight: 700;
        }
        .description {
            text-align: center;
            color: #7f8c8d;
            margin-bottom: 30px;
            font-size: 1.1em;
        }
        .chart-container {
            position: relative;
            height: 400px;
            margin: 30px 0;
            background: white;
            border-radius: 10px;
            padding: 15px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }
        .controls {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin: 25px 0;
            flex-wrap: wrap;
        }
        .toggle-btn {
            padding: 12px 25px;
            background: linear-gradient(to bottom, #3498db, #2980b9);
            color: white;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
            box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
        }
        .toggle-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 12px rgba(52, 152, 219, 0.4);
        }
        .toggle-btn.active {
            background: linear-gradient(to bottom, #2c3e50, #1a2530);
            box-shadow: 0 4px 8px rgba(44, 62, 80, 0.3);
        }
        .instructions {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-top: 25px;
            border-left: 5px solid #3498db;
        }
        code {
            background-color: #eee;
            padding: 3px 6px;
            border-radius: 4px;
            font-family: 'Fira Code', monospace;
            font-size: 0.9em;
        }
        .highlight {
            background-color: #fff8e1;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
            border-left: 5px solid #ffc107;
            overflow-x: auto;
        }
        pre {
            margin: 0;
            line-height: 1.5;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            color: #7f8c8d;
            font-size: 0.9em;
        }
        @media (max-width: 600px) {
            .controls {
                flex-direction: column;
                align-items: center;
            }
            .toggle-btn {
                width: 80%;
            }
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
            <h3>Perubahan Warna Font Data Label:</h3>
            <p>Untuk mengubah warna font data label menjadi hitam, ubah properti <code>color</code> dalam konfigurasi datalabels:</p>
            
            <div class="highlight">
                <h4>Perubahan yang diperlukan:</h4>
                <pre><code>// Sebelumnya:
datalabels: {
    display: true,
    color: '#fff',  // Warna putih
    // ...
}

// Menjadi:
datalabels: {
    display: true,
    color: '#000',  // Warna hitam
    // ...
}</code></pre>
            </div>

            <p>Perubahan ini sudah diterapkan pada chart di atas. Coba toggle data label untuk melihat perbedaannya.</p>
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
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(153, 102, 255, 0.7)',
                            'rgba(255, 159, 64, 0.7)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1,
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
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    // Konfigurasi data labels - MENGUBAH COLOR MENJADI HITAM (#000)
                    datalabels: {
                        display: true,
                        color: '#000', // Diubah dari '#fff' (putih) menjadi '#000' (hitam)
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

    <div class="footer">
        <p>Contoh implementasi data labels dengan warna font hitam | © 2023</p>
    </div>
</body>
</html>
