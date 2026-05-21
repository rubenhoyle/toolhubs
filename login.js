// Toggle between login and signup forms
function toggleSignup() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    loginForm.style.display = loginForm.style.display === 'none' ? 'flex' : 'none';
    signupForm.style.display = signupForm.style.display === 'none' ? 'flex' : 'none';
}

// Sample credentials for demo
const validCredentials = [
    { username: 'admin', password: 'admin123' },
    { username: 'user@email.com', password: 'password123' },
    { username: 'test', password: 'test' }
];

// Login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    clearErrors();
    
    if (!username) {
        showError('usernameError', 'Username is required');
        return;
    }
    
    if (!password) {
        showError('passwordError', 'Password is required');
        return;
    }
    
    // Validate credentials
    const isValid = validCredentials.some(cred => 
        cred.username === username && cred.password === password
    );
    
    if (isValid) {
        // Store user in session
        sessionStorage.setItem('currentUser', username);
        
        // Show success message with animation
        const loginBtn = document.querySelector('.login-btn');
        loginBtn.textContent = '✓ Redirecting...';
        loginBtn.disabled = true;
        
        setTimeout(() => {
            window.location.href = '../main/shop.html';
        }, 1000);
    } else {
        showError('usernameError', 'Invalid username or password');
    }
});

// Signup form submission
document.getElementById('newSignupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;
    
    if (!name) {
        alert('Please enter your full name');
        return;
    }
    
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }
    
    if (password !== confirm) {
        alert('Passwords do not match');
        return;
    }
    
    // Add new credential
    validCredentials.push({ 
        username: email, 
        password: password 
    });
    
    alert('Account created successfully! Please log in.');
    toggleSignup();
    document.getElementById('loginForm').reset();
});

// Google button (demo)
document.querySelector('.google-btn').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Google login coming soon!');
});

// Forgot password link (demo)
document.querySelector('.forgot-link').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Password reset email would be sent to your email address.');
});

function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

function clearErrors() {
    document.getElementById('usernameError').textContent = '';
    document.getElementById('passwordError').textContent = '';
}

// Enter key to submit
document.getElementById('username').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('password').focus();
    }
});

document.getElementById('password').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('loginForm').dispatchEvent(new Event('submit'));
    }
});

// Demo credentials info (can be removed in production)
console.log('Demo Credentials:');
console.log('Username: admin, Password: admin123');
console.log('Username: user@email.com, Password: password123');
console.log('Username: test, Password: test');
