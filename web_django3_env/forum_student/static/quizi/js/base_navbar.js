
// ==== NAVBAR ====
function showTabs() {
    let elmTabs = document.querySelector('.overlay')
    elmTabs.style.display = 'block'
}

function hidenTabs() {
    let elmTabs = document.querySelector('.overlay')
    elmTabs.style.display = 'none'
}

function showUserTabs() {
    let elmListOption = document.querySelector('.form_nav_item_user_box_list')
    
    if (elmListOption.style.display == "none") {
        
        elmListOption.style.display = 'block'
    }

    else {
        elmListOption.style.display = 'none'
    }
}