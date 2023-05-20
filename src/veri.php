<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $phoneNumber = $_POST['phoneNumber'];
  $message = $_POST['message'];
  $options = $_POST['options'];
  $selectedRadio = $_POST['selectedRadio'];
  $selectedCheckboxes = $_POST['selectedCheckboxes'];

  echo "Name: " . $name . "<br>";
  echo "Email: " . $email . "<br>";
  echo "Phone Number: " . $phoneNumber . "<br>";
  echo "Message: " . $message . "<br>";
  echo "Options: " . implode(", ", $options) . "<br>";
  echo "Selected Radio: " . $selectedRadio . "<br>";
  echo "Selected Checkboxes: " . $selectedCheckboxes . "<br>";
}
?>
