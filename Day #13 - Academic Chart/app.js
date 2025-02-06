// Global variables
let myChart = null;
let studentData = {
    labels: [],
    values: [],
    timestamps: []
};

// Alert function
function showAlert(message, type) {
    const alertBox = document.getElementById('alertBox');
    if (!alertBox) return;
    alertBox.textContent = message;
    alertBox.className = `alert alert-${type}`;
    alertBox.style.display = 'block';
    setTimeout(() => alertBox.style.display = 'none', 3000);
}

// Update statistics
function updateStats() {
    const values = studentData.values;
    document.getElementById('totalStudents').textContent = values.length;
    document.getElementById('averageScore').textContent = values.length ?
        (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1) : '0';
    document.getElementById('highestScore').textContent = values.length ?
        Math.max(...values).toFixed(1) : '0';
    document.getElementById('lowestScore').textContent = values.length ?
        Math.min(...values).toFixed(1) : '0';
}

// Update table
function updateTable() {
    const tbody = document.getElementById('studentTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    studentData.labels.forEach((name, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${name}</td>
            <td>${studentData.values[index]}</td>
            <td>${studentData.values[index] >= 60 ?
                '<span style="color: var(--success-color)">Lulus</span>' :
                '<span style="color: var(--danger-color)">Tidak Lulus</span>'
            }</td>
            <td>
                <button class="btn btn-outline" onclick="deleteStudent(${index})">
                    Hapus
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Add student
function addStudent() {
    const nameInput = document.getElementById("studentName");
    const scoreInput = document.getElementById("studentScore");
    if (!nameInput || !scoreInput) return;

    const name = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    if (!name) {
        showAlert('Nama mahasiswa harus diisi!', 'danger');
        return;
    }

    if (isNaN(score) || score < 0 || score > 100) {
        showAlert('Nilai harus antara 0-100!', 'danger');
        return;
    }

    studentData.labels.push(name);
    studentData.values.push(score);
    studentData.timestamps.push(new Date().toISOString());

    nameInput.value = "";
    scoreInput.value = "";

    updateStats();
    updateTable();
    showChart('bar');
    showAlert('Data mahasiswa berhasil ditambahkan!', 'success');
}

// Delete student
function deleteStudent(index) {
    studentData.labels.splice(index, 1);
    studentData.values.splice(index, 1);
    studentData.timestamps.splice(index, 1);

    updateStats();
    updateTable();
    showChart('bar');
    showAlert('Data mahasiswa berhasil dihapus!', 'success');
}

// Show chart
function showChart(type) {
    if (!document.getElementById('myChart')) return;

    if (myChart) {
        myChart.destroy();
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    document.getElementById('chartTitle').textContent = `Visualisasi Data (${type})`;

    const colors = studentData.labels.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);

    myChart = new Chart(ctx, {
        type: type,
        data: {
            labels: studentData.labels,
            datasets: [{
                label: 'Nilai Mahasiswa',
                data: studentData.values,
                backgroundColor: colors,
                borderWidth: 2,
                borderColor: '#000000',
                pointRadius: 5,
                pointBackgroundColor: '#ff0000'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    });
}

// Initialize first chart on load
document.addEventListener('DOMContentLoaded', () => {
    showChart('bar');
    updateStats();
    updateTable();
});
