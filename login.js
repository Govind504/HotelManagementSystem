document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const emailInput = document.getElementById('login-email');
      const passwordInput = document.getElementById('login-password');

      if (!emailInput || !passwordInput) {
        console.error('Login form inputs are missing.');
        alert('An error occurred. Please try again later.');
        return;
      }

      const email = emailInput.value;
      const password = passwordInput.value;

      try {
        const response = await fetch('users.json');
        if (!response.ok) {
          throw new Error('Failed to load users');
        }
        const users = await response.json();
        const user = users.find((u) => u.email === email);

        if (user) {
          if (user.password === password) {
            localStorage.setItem('userInitials', user.initials || `${user.firstName[0]}${user.lastName[0]}`);
            localStorage.setItem('isLoggedIn', 'true'); // Set session data
            alert('Login successful!');
            window.location.href = 'dashboard.html';
          } else {
            alert('Invalid password.');
          }
        } else {
          alert('User does not exist. Redirecting to signup page...');
          window.location.href = 'signup.html'; // Redirect to signup page
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again later.');
      }
    });
  } else {
    console.error('Login form not found in the DOM.');
  }
});
