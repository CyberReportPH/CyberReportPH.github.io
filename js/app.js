let cyberCrimeType = '';
let name = '';
let email = '';
let address = '';
let birthDate = '';
let contacNumber = '';
let details = '';
let appointmentTime = '';

function clicked(button){
    let selectedBtn = document.querySelector('.clicked');
    if(selectedBtn){
        selectedBtn.classList.remove('clicked');
    }
    cyberCrimeType = button.textContent || button.innerText;
    button.classList.add('clicked');
}

function validateForm(form){
    let limit = form.length;
    let failed = false;
    for(let i = 0; i < limit; i++){
        if(!form[i].value){
            form[i].classList.add('uk-form-danger');
            failed = true;
        }
    }
    if(failed){
        return false;
    }
    return true;
}

function addPersonalInfo(){
    let form = document.querySelector('#personal-info');

    if(!validateForm(form)){
        console.log("Fail");
        return;
    }

    console.log("Success");

    let elements = form.elements;
    name = elements['last-name'].value + ', ' + elements['first-name'].value + ' ' + elements['middle-initial'].value + '.';
    email = elements['email'].value;
    address = elements['address'].value;
    birthDate = elements['birth-month'].value + ' ' + elements['birth-date'].value + ' ' + elements['birth-year'].value;
    contacNumber = elements['contact-number'].value;
    details = elements['crime-details'].value;
}

function submitReport(){
    
}