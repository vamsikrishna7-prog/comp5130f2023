document.addEventListener('DOMContentLoaded', function () {
    const signInForm = document.getElementById('signInForm');

    signInForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Send data to the local server
        fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(function(response) {
            console.log(response)
            if (response.ok) {
                window.location.href = 'landing.html'
            } else if (response.status === 400) {
                response.text().then(message => alert('signin failed: ' + message));
            } else  {
                alert('signin failed: ' + response);
                document.getElementById("signInForm").reset();
            }
        })
        .catch(error => errorSignIn(error));
    });
});

function errorSignIn(error) {
    alert(`user signin failed - ${error}, redirecting to main.html`)
    window.location.href = 'main.html';
}