// scripts/chartConfig.js
const chartConfigs = {
    volumeTarget: {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'MTD VOL',
                    data: [],
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    order: 2
                },
                {
                    label: 'ANN FM Target',
                    data: [],
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
            }
        }
    },
    // Konfigurasi untuk chart lainnya...
};

// Fungsi untuk membuat chart dengan konfigurasi tertentu
function createChart(ctx, config) {
    return new Chart(ctx, config);
}
