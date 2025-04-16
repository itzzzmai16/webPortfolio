const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const darkModeClass = 'dark-mode';
const darkModeStorageKey = 'darkModeEnabled';
//to enable
function enableDarkMode() {
    body.classList.add(darkModeClass);
    localStorage.setItem(darkModeStorageKey, 'true');
}

//  to disable
function disableDarkMode() {
    body.classList.remove(darkModeClass);
    localStorage.setItem(darkModeStorageKey, 'false');
}

// taga Check 
if (localStorage.getItem(darkModeStorageKey) === 'true') {
    enableDarkMode();
    darkModeToggle.checked = true; // Update the toggle state
}

// Event listener para sa toggle switch
darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});

  const time = new Date().getHours(); //greeting
let greeting;
if (time < 10) {
  greeting = "Good morning";
} else if (time < 20) {
  greeting = "Good day";
} else {
  greeting = "Good evening";
}
document.getElementById("demo").innerHTML = greeting;

document.addEventListener('DOMContentLoaded', function() { //form validation inj
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const submissionMessage = document.getElementById('submissionMessage');

form.addEventListener('submit', function(event) {
event.preventDefault(); 

    let isValid = true;

        // Validate Name
    if (nameInput.value.trim() === '') {
            nameError.textContent = 'Please enter your name.';
            isValid = false;
    } else {
            nameError.textContent = '';
    }

        // Validate Email
    if (emailInput.value.trim() === '') {
            emailError.textContent = 'Please enter your email address.';
            isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
    } else {
            emailError.textContent = '';
    }

        // Validate Message
    if (messageInput.value.trim() === '') {
            messageError.textContent = 'Please enter your message.';
            isValid = false;
    } else {
            messageError.textContent = '';
    }

    if (isValid) {
            
const formData = new FormData(form);

fetch('/submit-contact-form', { 
method: 'POST',
body: formData
})
.then(response => response.json())
.then(data => {
    if (data.success) {
            submissionMessage.textContent = 'Thank you for your message! We will get back to you shortly.';
            submissionMessage.className = 'success-message';
            form.reset(); // Clear ang form
    } else {
            submissionMessage.textContent = 'Oops! Something went wrong. Please try again later.';
            submissionMessage.className = 'error-submission';
            }
    })
.catch(error => {
            console.error('Error submitting form:', error);
            submissionMessage.textContent = 'Oops! Something went wrong. Please try again later.';
            submissionMessage.className = 'error-submission';
    });
    } else {
            submissionMessage.textContent = ''; 
    }
    });

function isValidEmail(email) {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
