const form = document.getElementById('form')
const email = document.getElementsById('email')
const password = document.getElementsById('password')

var emailBoolean = false;
var passwordBoolean = false;


form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
});

function checkInputs() {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if(emailValue === ''){
        setErrorFor(email, `Email can't be empty`)
    }
    else{
        emailBoolean = true;
        setSuccessFor(email)
    }

    if(passwordValue === ''){
        setErrorFor(course, `Password can't be empty`)
    }
    else{
        passwordBoolean = true;
        setSuccessFor(password)
    }
}

function setErrorFor(input, message) {
    const formDetail = input.parentElement;
    const small = formDetail.querySelector('small');
    small.innerText = message;

    formDetail.className = 'form-Detail error';
}

function setSuccessFor(input) {
    const formDetail = input.parentElement;
    formDetail.className = 'form success';
    if(emailBoolean === true && passwordBoolean === true){
        alert('Login successful!!')
    }
}