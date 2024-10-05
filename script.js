var employeeModal = document.getElementById("employeeModal");
var qrModal = document.getElementById("qrModal");

var openModalBtn = document.getElementById("openModal");
var scanQrBtn = document.getElementById("scanQrButton");

var closeBtns = document.getElementsByClassName("close");


openModalBtn.onclick = function() {
    employeeModal.style.display = "block";
}


scanQrBtn.onclick = function() {
    qrModal.style.display = "block";
    startQrScanner();  
}


closeBtns[0].onclick = function() {
    employeeModal.style.display = "none";
}

closeBtns[1].onclick = function() {
    qrModal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == employeeModal) {
        employeeModal.style.display = "none";
    }
    if (event.target == qrModal) {
        qrModal.style.display = "none";
    }
}


document.getElementById('addEmployeeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(this);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "add_employee.php", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            if (response.status === 'success') {
                alert("Employee added successfully!");
                location.reload();
            } else {
                alert("Error: " + response.message);
            }
        }
    };
    xhr.send(formData);
});


document.querySelectorAll('.deleteBtn').forEach(button => {
    button.addEventListener('click', function() {
        let id = this.getAttribute('data-id');
        if (confirm("Are you sure you want to delete this employee?")) {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "delete_employee.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onload = function() {
                if (xhr.status === 200) {
                    let response = JSON.parse(xhr.responseText);
                    if (response.status === 'success') {
                        alert("Employee deleted successfully!");
                        location.reload();
                    } else {
                        alert("Error: " + response.message);
                    }
                }
            };
            xhr.send("id=" + id);
        }
    });
});


function startQrScanner() {
    const html5QrCode = new Html5Qrcode("qr-reader");

    html5QrCode.start(
        { facingMode: "environment" },  
        { fps: 10, qrbox: 250 },
        (decodedText) => {
            document.getElementById('qr-result').innerText = `Scanned: ${decodedText}`;
            html5QrCode.stop().then(() => {
                parseEmployeeDetails(decodedText);
                qrModal.style.display = "none";
            }).catch(err => {
                console.error("Failed to stop QR scanner", err);
            });
        },
        (errorMessage) => {
            console.warn("QR scanning error:", errorMessage);
        }
    ).catch(err => {
        console.error("Unable to start QR Code scanner", err);
    });
}


function parseEmployeeDetails(qrCodeData) {
    try {
        let employee = JSON.parse(qrCodeData);


        let xhr = new XMLHttpRequest();
        xhr.open("POST", "add_employee.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function() {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                if (response.status === 'success') {
                    alert("Employee added successfully via QR code!");
                    location.reload();
                } else {
                    alert("Error: " + response.message);
                }
            }
        };
        xhr.send(
            "name=" + encodeURIComponent(employee.name) + 
            "&email=" + encodeURIComponent(employee.email) + 
            "&position=" + encodeURIComponent(employee.position) + 
            "&salary=" + encodeURIComponent(employee.salary) + 
            "&hire_date=" + encodeURIComponent(employee.hire_date)
        );
    } catch (error) {
        alert("Invalid QR Code data");
        console.error("Error parsing QR Code data:", error);
    }
}
