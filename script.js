// Define constants for form field access
const form = document.getElementById('registrationForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const courseInput = document.getElementById('course');
const yearInput = document.getElementById('year');
const resumeInput = document.getElementById('resume');
const formMessage = document.getElementById('formMessage');

// Define constants for error messages
const ERROR_MESSAGES = {
    FULL_NAME: 'Please enter your full name.',
    EMAIL_REQUIRED: 'Please enter your email address.',
    EMAIL_INVALID: 'Please enter a valid email address.',
    PHONE_REQUIRED: 'Please enter your phone number.',
    PHONE_INVALID: 'A valid phone number is required (10 digits).',
    COURSE_REQUIRED: 'Please enter your course.',
    YEAR_REQUIRED: 'Please enter your year of study.',
    RESUME_REQUIRED: 'Resume upload is required.',
    RESUME_SIZE: 'Resume file size should not exceed 5MB.'
};

// Add an event listener to the form to handle the submit event
form.addEventListener('submit', function(event) {
    event.preventDefault();
    clearErrors();
    let isValid = true;
    
    // Retrieve and trim values from the form fields
    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const course = courseInput.value.trim();
    const year = yearInput.value;
    const resume = resumeInput.files[0];
    
    // Validate Full Name
    if (!fullName) {
        showError('fullNameError', ERROR_MESSAGES.FULL_NAME);
        isValid = false;
    }
    
    // Validate Email
    if (!email) {
        showError('emailError', ERROR_MESSAGES.EMAIL_REQUIRED);
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('emailError', ERROR_MESSAGES.EMAIL_INVALID);
        isValid = false;
    }
    
    // Validate Phone Number
    if (!phone) {
        showError('phoneError', ERROR_MESSAGES.PHONE_REQUIRED);
        isValid = false;
    } else if (!validatePhone(phone)) {
        showError('phoneError', ERROR_MESSAGES.PHONE_INVALID);
        isValid = false;
    }
    
    // Validate Course
    if (!course) {
        showError('courseError', ERROR_MESSAGES.COURSE_REQUIRED);
        isValid = false;
    }
    
    // Validate Year
    if (!year) {
        showError('yearError', ERROR_MESSAGES.YEAR_REQUIRED);
        isValid = false;
    }
    
    // Validate Resume
    if (!resume) {
        showError('resumeError', ERROR_MESSAGES.RESUME_REQUIRED);
        isValid = false;
    } else if (resume.size > 5 * 1024 * 1024) { // 5MB
        showError('resumeError', ERROR_MESSAGES.RESUME_SIZE);
        isValid = false;
    }
    
    // Show success message if form is valid
    if (isValid) {
        formMessage.textContent = 'Registration successful!';
        formMessage.style.color = '#28a745';
    }
});

// Validate email format
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validate phone number format
function validatePhone(phone) {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
}

// Display an error message
function showError(id, message) {
    document.getElementById(id).textContent = message;
}

// Clear all error messages
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.textContent = '');
    formMessage.textContent = '';
}
