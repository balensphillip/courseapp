const form = document.getElementById('form')
const fullname = document.getElementsById('fullname')
const email = document.getElementsById('email')
const course = document.getElementsById('course')
const phonenumber = document.getElementsById('phonenumber')
const gender = document.getElementsById('gender')
const password = document.getElementsById('password')
const password2 = document.getElementsById('password2')

var fullnameBoolean = false;
var emailBoolean = false;
var courseBoolean = false;
var phonenumberBoolean = false;
var genderBoolean = false;
var passwordBoolean = false;
var password2Boolean   = false;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
});

function checkInputs() {
    const fullnameValue = fullname.value.trim();
    const emailValue = email.value.trim();
    const courseValue = course.value.trim();
    const phonenumberValue = phonenumber.value.trim();
    const genderValue = gender.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if(fullnameValue === ''){
        setErrorFor(fullname, `Fullname can't be empty`)
    }
    else{
        fullnameBoolean = true;
        setSuccessFor(fullname)
    }

    if(emailValue === ''){
        setErrorFor(email, `Email can't be empty`)
    }
    else{
        emailBoolean = true;
        setSuccessFor(email)
    }

    if(courseValue === ''){
        setErrorFor(course, `Course can't be empty`)
    }
    else{
        courseBoolean = true;
        setSuccessFor(course)
    }

    if(phonenumberValue === ''){
        setErrorFor(course, `Phonenumber can't be empty`)
    }
    else{
        phonenumberBoolean = true;
        setSuccessFor(phonenumber)
    }

    if(genderValue === ''){
        setErrorFor(course, `Gender can't be empty`)
    }
    else{
        genderBoolean = true;
        setSuccessFor(gender)
    }

    if(passwordValue === ''){
        setErrorFor(course, `Password can't be empty`)
    }
    else{
        passwordBoolean = true;
        setSuccessFor(password)
    }

    if(password2Value === ''){
        setErrorFor(course, `Confirm Password can't be empty`)
    }
    else{
        password2Boolean = true;
        setSuccessFor(password2)
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
    if(fullnameBoolean === true && emailBoolean === true && courseBoolean === true && phonenumberBoolean === true && genderBoolean === true && passwordBoolean === true && password2Boolean === true){
        alert('Login successful!!')
    }
}