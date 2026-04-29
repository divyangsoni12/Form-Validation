// Age calculation
function calculateAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 0 ? age : 0;
}

// Show error
function showError(fieldId, msg) {
  const errorSpan = document.getElementById(`${fieldId}Error`);
  errorSpan.textContent = msg;
}

// Clear error
function clearError(fieldId) {
  const errorSpan = document.getElementById(`${fieldId}Error`);
  errorSpan.textContent = "";
}

// Form validation
document.getElementById("dob").addEventListener("change", function () {
  const dob = this.value;
  if (dob) {
    const age = calculateAge(dob);
    document.getElementById("age").value = age;
  }
});

document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Reset errors
  [
    "firstName",
    "lastName",
    "dob",
    "gender",
    "username",
    "password",
    "confirmPassword",
    "email",
    "contact",
  ].forEach((field) => clearError(field));

  let isValid = true;

  // First Name
  const firstName = document.getElementById("firstName").value.trim();
  if (!firstName) {
    showError("firstName", "First name is required.");
    isValid = false;
  }

  // Last Name
  const lastName = document.getElementById("lastName").value.trim();
  if (!lastName) {
    showError("lastName", "Last name is required.");
    isValid = false;
  }

  // DOB
  const dob = document.getElementById("dob").value;
  if (!dob) {
    showError("dob", "Date of birth is required.");
    isValid = false;
  } else {
    const age = calculateAge(dob);
    if (age < 0 || age > 120) {
      showError("dob", "Please enter a valid date of birth.");
      isValid = false;
    } else {
      document.getElementById("age").value = age;
    }
  }

  // Gender
  const genderRadios = document.querySelectorAll("input[name='gender']");
  let genderSelected = false;
  for (let radio of genderRadios) {
    if (radio.checked) genderSelected = true;
  }
  if (!genderSelected) {
    showError("gender", "Please select a gender.");
    isValid = false;
  }

  // Username
  const username = document.getElementById("username").value.trim();
  if (!username) {
    showError("username", "Username is required.");
    isValid = false;
  }

  // Password
  const password = document.getElementById("password").value;
  if (!password) {
    showError("password", "Password is required.");
    isValid = false;
  } else if (password.length < 6) {
    showError("password", "Password must be at least 6 characters.");
    isValid = false;
  }

  // Confirm Password
  const confirmPassword = document.getElementById("confirmPassword").value;
  if (!confirmPassword) {
    showError("confirmPassword", "Please confirm your password.");
    isValid = false;
  } else if (password !== confirmPassword) {
    showError("confirmPassword", "Passwords do not match.");
    isValid = false;
  }

  // Email
  const email = document.getElementById("email").value.trim();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) {
    showError("email", "Email is required.");
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showError("email", "Please enter a valid email address.");
    isValid = false;
  }

  // Contact
  const contact = document.getElementById("contact").value.trim();
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!contact) {
    showError("contact", "Contact number is required.");
    isValid = false;
  } else if (!phoneRegex.test(contact)) {
    showError("contact", "Enter a valid 10-digit mobile number (India).");
    isValid = false;
  }

  if (isValid) {
    // Simulate “backend” data collection (in real app, send to an API)
    const formData = {
      prefix: document.getElementById("prefix").value,
      firstName,
      lastName,
      dob,
      gender: document.querySelector("input[name='gender']:checked").value,
      username,
      password, // in real app: send via secure backend, never log plaintxt
      email,
      contact,
      age: document.getElementById("age").value,
    };

    console.log("Form data sent to backend:", formData);

    // Show success message
    document.getElementById("successMsg").style.display = "block";
    setTimeout(() => {
      document.getElementById("successMsg").style.display = "none";
    }, 3500);
  }
});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const userData = req.body;
    console.log('Received User Data:', userData);
    
    // Here you would typically save data to a database (like MongoDB or MySQL)
    res.status(200).json({ message: 'Success: Data received by server!' });
});

app.listen(3000, () => console.log('Backend server running on http://localhost:3000'));