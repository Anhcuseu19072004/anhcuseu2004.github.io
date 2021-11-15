function showMessage(messageContent) {
    if (messageContent == '1') {
        messageContent = 'sai mật khẩu'
    }

    else if (messageContent == '2'){
        messageContent = 'tài khoản không tồn tại'
    }
    if (messageContent == undefined) {
        messageContent = ''
    }
    let myElement = document.querySelector('.app_background_content_form_message')
    myElement.innerHTML = messageContent
}

function showPassword() {
    let myElement = document.querySelector('.box_input_icon_pass')
    if (myElement.style.color == 'black') {
        myElement.style.color = "chartreuse"
        let myElement2 = document.querySelector('.box_input_field.pass')
        myElement2.type = 'password'
    }

    else {
        myElement.style.color = "black"
        let myElement2 = document.querySelector('.box_input_field.pass')
        myElement2.type = 'text'
    }

}

function removeMessage() {
    myElement = document.querySelector('.app_background_content_form_message')
    myElement.innerHTML =''
}