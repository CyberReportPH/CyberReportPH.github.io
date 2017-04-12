let cyberCrimeType = '';
let name = '';
let email = '';
let address = '';
let birthDate = '';
let contactNumber = '';
let details = '';
let appointmentDate = '';
let appointmentTime = '';

function changeSection(currentSection, nextSection){
    document.getElementById(currentSection).classList.add('hidden');
    document.getElementById(nextSection).classList.remove('hidden');

    if(nextSection == 'crime-description'){
        
    }
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
    showCrimeDescription();
}

function showCrimeDescription(){
    changeSection('crime-types', 'crime-description');
    
    let onlineScamDesc = 
        `<strong>Online Scams</strong> are dishonest schemes that seek to take advantage of unsuspecting
        people to gain benefit (such as money, or access to personal details).`;
    let identityTheftDesc = 
        `<strong>Identity Theft</strong> occurs when a cybercriminal gains access to personal and important
        information to steal money and gain benefits.`;
    let onelineTradingDesc = 
        `<strong>Online Trading Issues</strong> inovlves a scanner targeting people who
        buy, sell, or trade items online.`;
    let othersDesc = 
        `There are multiple types and schemes of cybercrime. We need your help in finding out what they are.
        You can do this by telling us what happened through reporting.`;

    
    let crimeDesc;
    switch(cyberCrimeType){
        case 'ONLINE SCAM':
            crimeDesc = onlineScamDesc;
            break;
        case 'IDENTITY THEFT':
            crimeDesc = identityTheftDesc;
            break;
        case 'ONLINE TRADING':
            crimeDesc = onelineTradingDesc;
            break;
        case 'OTHERS':
            crimeDesc = othersDesc;
            break;
    }

    document.querySelector('.report-description-container').innerHTML = crimeDesc;

    showCrimeImages();
}

function showCrimeImages(){
    let onlineScamImg = ['OnlineScam-01.jpg', 'OnlineScam-02.jpg', 'OnlineScam-03.jpg'];
    let identityTheftImg = ['IdentityTheft.jpg'];
    let onelineTradingImg = ['OnlineTrading.jpg'];
    let othersImg = ['Others.jpg'];

    let crimeImg;
    switch(cyberCrimeType){
        case 'ONLINE SCAM':
            crimeImg = onlineScamImg;
            break;
        case 'IDENTITY THEFT':
            crimeImg = identityTheftImg;
            break;
        case 'ONLINE TRADING':
            crimeImg = onelineTradingImg;
            break;
        case 'OTHERS':
            crimeImg = othersImg;
            break;
    }

    let imgContainer = '';
    for(let img of crimeImg){
        imgContainer += `<div><img src="img/${img}" alt=""/></div>`
    }
    document.querySelector('#report-crime-image').innerHTML = imgContainer;

    new Siema({
        perPage: 1,
    });
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
    birthDate = elements['birth-date'].value;
    contactNumber = elements['contact-number'].value;
    details = elements['crime-details'].value;

    changeSection('personal-info', 'appointments');
}

function addTime(){
    let time= document.querySelector('input[name="timePicker"]:checked').value;
    let date = document.querySelector('#appointments-calendar').value;

    console.log(time)
    if(!time){
        return false;
    }

    appointmentDate = date;
    appointmentTime = time;

    return true;
}

function addConfirmationInfo(){
    if(!addTime()){
        return;
    }

    document.querySelector('#confirmation-name').innerHTML = name;
    document.querySelector('#confirmation-birthdate').innerHTML = birthDate;
    document.querySelector('#confirmation-email').innerHTML = email;
    document.querySelector('#confirmation-contact').innerHTML = contactNumber;
    document.querySelector('#confirmation-address').innerHTML = address;
    document.querySelector('#confirmation-details').innerHTML = details;
    document.querySelector('#confirmation-time').innerHTML = appointmentDate + '<br>' + appointmentTime;

    changeSection('appointments', 'confirmation')
}

function submitReport(){
    changeSection('confirmation', 'spinner');

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
