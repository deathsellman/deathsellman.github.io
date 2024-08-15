// script.js
// สร้างตัวแปรเพื่อเก็บข้อมูลผู้ใช้สำหรับการเปรียบเทียบ
const userData = {
    username: 'admin',
    password: '12345'
};

// จัดการการ Submit ของฟอร์ม
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้าเว็บ

    // ดึงข้อมูลที่ผู้ใช้กรอกเข้ามา
    const inputUsername = document.getElementById('username').value;
    const inputPassword = document.getElementById('password').value;

    // ตรวจสอบข้อมูล
    if (inputUsername === userData.username && inputPassword === userData.password) {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerText = 'Login successful!';
    } else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerText = 'Invalid username or password!';
    }
});

