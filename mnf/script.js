// script.js

// ข้อมูลน้ำสูญเสียในแต่ละเดือน
const waterLossData = [
    { month: 'January', produced: 1000, sold: 800 },
    { month: 'February', produced: 1100, sold: 850 },
    { month: 'March', produced: 1200, sold: 900 },
    { month: 'April', produced: 1150, sold: 850 },
    { month: 'May', produced: 1300, sold: 950 }
];

// ฟังก์ชันคำนวณปริมาณน้ำสูญเสียและร้อยละ
function calculateWaterLoss() {
    return waterLossData.map(data => {
        const loss = data.produced - data.sold;
        const percentageLoss = ((loss / data.produced) * 100).toFixed(2);
        return {
            ...data,
            loss: loss,
            percentageLoss: percentageLoss
        };
    });
}

// แสดงข้อมูลในตาราง
function renderTable() {
    const tableBody = document.querySelector("#waterLossTable tbody");
    const calculatedData = calculateWaterLoss();
    
    calculatedData.forEach(data => {
        const row = `<tr>
            <td>${data.month}</td>
            <td>${data.produced}</td>
            <td>${data.sold}</td>
            <td>${data.loss}</td>
            <td>${data.percentageLoss}%</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// สร้างกราฟแสดงน้ำสูญเสีย
function renderChart() {
    const ctx = document.getElementById('waterLossChart').getContext('2d');
    const calculatedData = calculateWaterLoss();
    
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: calculatedData.map(data => data.month),
            datasets: [{
                label: 'Water Loss (m³)',
                data: calculatedData.map(data => data.loss),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// เปรียบเทียบข้อมูลน้ำสูญเสียเดือนปัจจุบันกับเดือนก่อนหน้า
function compareWaterLoss() {
    const calculatedData = calculateWaterLoss();
    const lastMonth = calculatedData[calculatedData.length - 1];
    const prevMonth = calculatedData[calculatedData.length - 2];

    let message;
    if (lastMonth.loss > prevMonth.loss) {
        message = `Water loss increased by ${(lastMonth.loss - prevMonth.loss)} m³ compared to ${prevMonth.month}.`;
    } else if (lastMonth.loss < prevMonth.loss) {
        message = `Water loss decreased by ${(prevMonth.loss - lastMonth.loss)} m³ compared to ${prevMonth.month}.`;
    } else {
        message = `Water loss in ${lastMonth.month} remained the same as ${prevMonth.month}.`;
    }

    document.getElementById('comparisonResult').innerText = message;
}

// เรียกใช้งานฟังก์ชันเมื่อโหลดหน้า
window.onload = function() {
    renderTable();
    renderChart();
    compareWaterLoss();
};
