const ownerUID = '100088590098255';
const ownerName = 'Jayden Smith.1';

let users = [];
let reports = [];

document.getElementById('registrationForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const uid = document.getElementById('uid').value;

    if (!users.some(user => user.uid === uid)) {
        users.push({ username, uid });
        alert('Registration successful!');
        document.getElementById('userHistory').style.display = 'block';
        document.getElementById('historyContent').innerHTML += `<p>${username} (UID: ${uid})</p>`;
    } else {
        alert('User  already registered!');
    }
});

// Function to add a report
function addReport(report) {
    reports.push(report);
}

// Function to display reports for the owner
function displayReports() {
    const reportList = document.getElementById('reportList');
    reportList.innerHTML = '';
    reports.forEach((report, index) => {
        reportList.innerHTML += `<p>Report ${index + 1}: ${report}</p>`;
    });
}

// Simulate adding a report for demonstration
addReport("User  called CMD.");
displayReports();
