document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const roleSelect = document.getElementById('role');
    const roleSpecificFields = document.getElementById('role-specific-fields');
    const form = document.querySelector('.signup-form form');
    const passwordInput = document.getElementById('password');
    const submitButton = form.querySelector('button[type="submit"]');

    // Password strength indicator
    const passwordStrength = document.createElement('div');
    passwordStrength.id = 'password-strength';
    passwordInput.parentElement.appendChild(passwordStrength);

    // Dynamic role-specific fields
    roleSelect.addEventListener('change', function () {
        const selectedRole = roleSelect.value;
        roleSpecificFields.innerHTML = ''; // Clear previous fields

        // Add fields based on selected role
        if (selectedRole === 'student') {
            roleSpecificFields.innerHTML = `
                <label for="school">School:</label>
                <input type="text" id="school" name="school" required>
            `;
        } else if (selectedRole === 'caregiver') {
            roleSpecificFields.innerHTML = `
                <label for="relation">Relation to Child:</label>
                <input type="text" id="relation" name="relation" required>
            `;
        } else if (selectedRole === 'health-professional') {
            roleSpecificFields.innerHTML = `
                <label for="profession">Your Profession:</label>
                <input type="text" id="profession" name="profession" required>
            `;
        }
    });

    // Password strength validation
    passwordInput.addEventListener('input', function () {
        const password = passwordInput.value;
        let strength = checkPasswordStrength(password);

        // Update password strength meter
        if (password.length === 0) {
            passwordStrength.innerHTML = ''; // Clear strength indicator
        } else {
            passwordStrength.innerHTML = `Password Strength: <strong>${strength}</strong>`;
            passwordStrength.style.color = getStrengthColor(strength);
        }
    });

    // Basic form validation before submission
    form.addEventListener('submit', function (e) {
        let valid = true;

        // Ensure the role-specific fields are not empty
        const role = roleSelect.value;
        if (role === 'student' && !document.getElementById('school').value) {
            valid = false;
            alert('Please enter your school name.');
        } else if (role === 'caregiver' && !document.getElementById('relation').value) {
            valid = false;
            alert('Please enter your relation to the child.');
        } else if (role === 'health-professional' && !document.getElementById('profession').value) {
            valid = false;
            alert('Please enter your profession.');
        }

        // Password strength validation
        const passwordStrengthValue = checkPasswordStrength(passwordInput.value);
        if (passwordStrengthValue === 'Weak') {
            valid = false;
            alert('Please enter a stronger password.');
        }

        if (!valid) {
            e.preventDefault(); // Prevent form submission if validation fails
        }
    });

    // Function to check password strength
    function checkPasswordStrength(password) {
        let strength = 'Weak';
        const strongPasswordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

        if (strongPasswordRegex.test(password)) {
            strength = 'Strong';
        } else if (password.length >= 6) {
            strength = 'Medium';
        }

        return strength;
    }

    // Function to get color based on strength
    function getStrengthColor(strength) {
        switch (strength) {
            case 'Strong':
                return 'green';
            case 'Medium':
                return 'orange';
            case 'Weak':
                return 'red';
            default:
                return 'gray';
        }
    }

    // Disable the submit button initially and enable after role is selected
    submitButton.disabled = true;
    roleSelect.addEventListener('change', function () {
        submitButton.disabled = false;
    });
});
