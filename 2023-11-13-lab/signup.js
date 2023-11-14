
// app.js
document.addEventListener('DOMContentLoaded', function () {
    const signUpForm = document.getElementById('signUpForm');

    signUpForm.addEventListener('submit', function (event) {
        event.preventDefault();

        try {
            // Gather user input from the form
            const firstname = document.getElementById('firstname').value;
            const lastname = document.getElementById('lastname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const emailRegexMatch = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            const passwordRegexMatch = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

            if (!emailRegexMatch.test(email)) {
                throw new Error("invalid email address");
            }
    
            if (!passwordRegexMatch.test(password)) {
                throw new Error(`invalid password - 
                make sure you password
                 - Contains at least one lowercase letter.\n
                 - Contains at least one uppercase letter.\n
                 - Contains at least one digit.\n
                 - Is atleast 8 characters long.\n`);
            }
             
            // Send data to the local server
            fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstname, lastname, email, password, dob }),
            })
            .then(function(response) {
                console.log(response)
                if (response.ok) {
                    alert(`user sign in is successful, redirecting to signin page`)
                    window.location.href = 'signin.html'
                } else if (response.status === 400) {
                    response.text().then(message => alert('sign up failed: ' + message));
                    window.location.href = 'signin.html'
                } else {
                    alert('sing up failed: ' + response);
                    document.getElementById("signUpForm").reset();
                }
            })
            .catch(error => errorSignUp(error));
        } catch (error) {
            errorSignUp(error);
        }
    });
});

function errorSignUp(error) {
    alert(`user signup failed - ${error}`)
    window.location.href = 'signup.html';
}