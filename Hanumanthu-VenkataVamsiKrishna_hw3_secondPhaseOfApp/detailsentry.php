
<?php
// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hw3";

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve form data and sanitize it
$currentLocation = mysqli_real_escape_string($conn, $_POST['currentLocation']);
$fromLocation = mysqli_real_escape_string($conn, $_POST['fromLocation']);
$desiredLocation = mysqli_real_escape_string($conn, $_POST['desiredLocation']);
$familyLocation = mysqli_real_escape_string($conn, $_POST['familyLocation']);
$otherFacts = mysqli_real_escape_string($conn, $_POST['otherFacts']);
$placeOfBirth = mysqli_real_escape_string($conn, $_POST['placeOfBirth']);
$currentResidence = mysqli_real_escape_string($conn, $_POST['currentResidence']);
$desiredResidence = mysqli_real_escape_string($conn, $_POST['desiredResidence']);
$significantOtherLocation = mysqli_real_escape_string($conn, $_POST['significantOtherLocation']);
$otherFacts2 = mysqli_real_escape_string($conn, $_POST['otherFacts2']);
$myInvestment = mysqli_real_escape_string($conn, $_POST['myInvestment']);
$familyInvestment = mysqli_real_escape_string($conn, $_POST['familyInvestment']);
$otherInvestment = mysqli_real_escape_string($conn, $_POST['otherInvestment']);
$picture = mysqli_real_escape_string($conn, $_POST['picture']);
$resume = mysqli_real_escape_string($conn, $_POST['resume']);
$otherFacts3 = mysqli_real_escape_string($conn, $_POST['otherFacts3']);
$capabilitiesNeeded = mysqli_real_escape_string($conn, $_POST['capabilitiesNeeded']);

// Insert data into the database
$sql = "INSERT INTO personal_info (currentLocation, fromLocation, desiredLocation, familyLocation, otherFacts, placeOfBirth, currentResidence, desiredResidence, significantOtherLocation, otherFacts2, myInvestment, familyInvestment, otherInvestment, picture, resume, otherFacts3, capabilitiesNeeded) VALUES ('$currentLocation', '$fromLocation', '$desiredLocation', '$familyLocation', '$otherFacts', '$placeOfBirth', '$currentResidence', '$desiredResidence', '$significantOtherLocation', '$otherFacts2', '$myInvestment', '$familyInvestment', '$otherInvestment', '$picture', '$resume', '$otherFacts3', '$capabilitiesNeeded')";

if ($conn->query($sql) === TRUE) {
    echo "Form data has been successfully submitted to the database.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the database connection
$conn->close();
?>
