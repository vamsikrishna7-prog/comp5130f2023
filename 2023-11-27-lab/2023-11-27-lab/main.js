document.addEventListener('DOMContentLoaded', function (event) {
    const signUpBtn = document.getElementById('signUpBtn');
    const signInBtn = document.getElementById('signInBtn');

    signUpBtn.addEventListener('click', function () {
        window.location.href = 'signup.html';
    });

    signInBtn.addEventListener('click', function () {
        window.location.href = 'signin.html';
    });
});