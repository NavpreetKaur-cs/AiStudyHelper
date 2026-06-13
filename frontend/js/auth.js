const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

const API_URL = 'http://localhost:5000/api/auth';

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = 'dashboard.html';
            } else {
                loginForm.querySelector('.message').textContent = data.message;
            }

        } catch (error) {
            console.error(error);
        }
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = signupForm.querySelector('input[type="text"]').value;
        const email = signupForm.querySelector('input[type="email"]').value;
        const password = signupForm.querySelector('input[type="password"]').value;

        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {
                signupForm.querySelector('.message').textContent =
                    'Account created successfully';

                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);

            } else {
                signupForm.querySelector('.message').textContent =
                    data.message;
            }

        } catch (error) {
            console.error(error);
        }
    });
}