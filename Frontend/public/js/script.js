function submitLogin(event) {
    event.preventDefault(); // ป้องกันการส่งฟอร์มโดยตรง

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Application-key' : 'TU7e0fcbecb47e542c99304d25f0b1cbd630b4cb5047a24840ff67220bf3613fb456c9729c5474cfae176c055759fb1c95',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "UserName": username, 
            "PassWord": password 
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) { // ถ้าสถานะเป็น true
            const welcomeMessage = `Success! Welcome ${data.displayname_th || data.displayname_en}`;
            document.getElementById('message').innerText = welcomeMessage;

            // แสดงข้อมูลเพิ่มเติม
            const userType = data.type === 'student' ? 'นักศึกษา' : 'เจ้าหน้าที่';
            let userInfo = `Type: ${userType}\nUsername: ${data.username}\nEmail: ${data.email}\nDepartment: ${data.department || data.organization}`;

            if (data.type === 'student') {
                userInfo += `\nStatus: ${data.tu_status}\nFaculty: ${data.faculty}`;
            } else if (data.type === 'employee') {
                userInfo += `\nStatus: ${data.StatusEmp}\nWork Status: ${data.StatusWork}`;
            }

            console.log(userInfo); // แสดงข้อมูลใน Console
            alert(userInfo); // แสดงข้อมูลใน Alert
        } else {
            document.getElementById('message').innerText = data.message; // แสดงข้อความผิดพลาด
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'เกิดข้อผิดพลาด กรุณาลองใหม่';
    });
}




