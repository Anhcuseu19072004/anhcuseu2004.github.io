
function hidenUserBarForm() {
    let elmApp = document.querySelector('.myapp')
    let elmOverlay = document.querySelector('.overlay')
    elmOverlay.style.display = "none"
}

function showUserBar() {
    let elmList = document.querySelector('.form_nav_item_user_box_list')
    console.log('running')
    if (elmList.style.display == "none" || elmList.style.display == '' ) {
        elmList.style.display = "block"    
    }

    else {
        elmList.style.display = "none"
    }
    
}

function showUserBarForm() {
    console.log('da chay')
    let elmOverlay = document.querySelector('.overlay')
    elmOverlay.style.display = 'block'
}
