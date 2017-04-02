let cyberCrimeType = '';
let name = '';
let email = '';
let address = '';
let birthDate = '';
let contacNumber = '';
let details = '';
let appointmentDate = '';

function changeSection(currentSection, nextSection){
    document.getElementById(currentSection).classList.add('hidden');
    document.getElementById(nextSection).classList.remove('hidden');
}

function clicked(button){
    let selectedBtn = document.querySelector('.clicked');
    if(selectedBtn){
        selectedBtn.classList.remove('clicked');
    }
    button.classList.add('clicked');
}

function addCrimeType(){
    let selectedBtn = document.querySelector('.clicked');
    if(!selectedBtn.innerHTML){
        return;
    }
    cyberCrimeType = selectedBtn.textContent || selectedBtn.innerText;
    changeSection('crime-types', 'personal-info')
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
    let form = document.querySelector('#personal-info-form');

    if(!validateForm(form)){
        return;
    }

    let elements = form.elements;

    name = elements['last-name'].value + ', ' + elements['first-name'].value + ' ' + elements['middle-initial'].value + '.';
    email = elements['email'].value;
    address = elements['address'].value;
    birthDate = elements['birth-month'].value + ' ' + elements['birth-date'].value + ' ' + elements['birth-year'].value;
    contacNumber = elements['contact-number'].value;
    details = elements['crime-details'].value;

    changeSection('personal-info', 'appointments');
}

function addTime(){
    let time= document.querySelector('input[name="timePicker"]:checked').value;

    console.log(time)
    if(!time){
        return false;
    }

    appointmentDate = '4/2/2017'; //Sample Date -> Change soon
    appointmentTime = time;

    return true;
}

function submitReport(){
    
    if(!addTime()){
        return;
    }

    changeSection('appointments', 'spinner');

    emailjs.send('gmail', 'cyberreportph', {
        to_email: email,
        name: name, 
        date: appointmentDate,
        time: appointmentTime,
        address: address,
        details: details
    }).then(response => {
        console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
        changeSection('spinner', 'thank-you');
    }).catch(error => {
        console.log(error);
    });
}