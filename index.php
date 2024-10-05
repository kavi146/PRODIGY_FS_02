<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Management System</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <script src="html5-qrcode.min.js"></script> <!-- Include QR Code Scanner Library -->
</head>
<body>
    <h1>Employee List</h1>
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Hire Date</th>
            <th>Actions</th>
        </tr>
        <?php
        include 'db.php';
        $sql = "SELECT * FROM employees";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo "<tr>
                        <td>".$row['id']."</td>
                        <td>".$row['name']."</td>
                        <td>".$row['email']."</td>
                        <td>".$row['position']."</td>
                        <td>".$row['salary']."</td>
                        <td>".$row['hire_date']."</td>
                        <td>
                            <button class='deleteBtn' data-id='".$row['id']."'>Delete</button>
                        </td>
                      </tr>";
            }
        } else {
            echo "<tr><td colspan='7'>No employees found</td></tr>";
        }
        $conn->close();
        ?>
    </table>

    <button id="openModal">Add New Employee</button>
    <button id="scanQrButton">Add with QR</button>


    <div id="employeeModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Add Employee</h2>
            <form id="addEmployeeForm">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required><br><br>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required><br><br>

                <label for="position">Position:</label>
                <input type="text" id="position" name="position" required><br><br>

                <label for="salary">Salary:</label>
                <input type="number" id="salary" name="salary" step="0.01" required><br><br>

                <label for="hire_date">Hire Date:</label>
                <input type="date" id="hire_date" name="hire_date" required><br><br>

                <input type="submit" value="Add Employee">
            </form>
        </div>
    </div>


    <div id="qrModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Scan QR Code to Add Employee</h2>
            <div id="qr-reader" style="width: 300px;"></div>
            <p id="qr-result">Waiting for QR scan...</p>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
