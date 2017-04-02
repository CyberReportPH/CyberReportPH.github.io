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

function submitForm(){

}