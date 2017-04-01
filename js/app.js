function clicked(button){
    let selectedBtn = document.querySelector('.clicked');
    if(selectedBtn){
        selectedBtn.classList.remove('clicked');
    }
    button.classList.add('clicked');
}