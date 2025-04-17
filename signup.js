document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');

  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const firstNameInput = document.getElementById('signup-first-name');
      const lastNameInput = document.getElementById('signup-last-name');
      const emailInput = document.getElementById('signup-email');
      const passwordInput = document.getElementById('signup-password');

      if (!firstNameInput || !lastNameInput || !emailInput || !passwordInput) {
        console.error('Signup form inputs are missing.');
        alert('An error occurred. Please try again later.');
        return;
      }

      const firstName = firstNameInput.value;
      const lastName = lastNameInput.value;
      const email = emailInput.value;
      const password = passwordInput.value;

      try {
        const response = await fetch('users.json');
        if (!response.ok) {
          throw new Error('Failed to load users');
        }
        const users = await response.json();
        const userExists = users.some((u) => u.email === email);

        if (userExists) {
          alert('Email already exists. Redirecting to login page...');
          window.location.href = 'login.html'; // Redirect to login page
        } else {
          // Add the new user to the users.json file (this would typically be done on the server)
          alert(`Signup successful! Welcome, ${firstName} ${lastName}! Redirecting to login page...`);
          window.location.href = 'login.html'; // Redirect to login page
        }
      } catch (error) {
        console.error('Error during signup:', error);
        alert('An error occurred. Please try again later.');
      }
    });
  } else {
    console.error('Signup form not found in the DOM.');
  }
});
