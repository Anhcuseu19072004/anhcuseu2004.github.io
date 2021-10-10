
// navbar user option
function showUserList() {
    let myElement = document.querySelector('.navbar_content_item_user_avatar')
    myElement.classList.toggle('show')
}

// navbar mobile, phone search form 


function showSearchForm() {
    let myElement   = document.querySelector('.navbar_content_item_search_icon')
    myElement.classList.toggle('show')
}
// navbar mobile, phone search form 
function hidenSearchForm() {
    let myElement   = document.querySelector('.navbar_content_item_search_icon')
    let myClassList = myElement.classList
    for (let i = 0; i < myClassList.length; i++) {
        if (myClassList[i] == 'show') {
            myElement.classList.remove('show')
        }
    }

}

function changeScreenDisplay(cls, screen) {
    let getElementBtns = document.getElementsByClassName('sidebar_tab_list_item_btn ')
    let getElementDisplays =  document.getElementsByClassName('container_content_item_sidebar_content')
    let getElementBtns2 = document.getElementsByClassName('overlay_layout_tabs_item_options_list_item')

    // romove all btn from pc and tablet big
    for (let i = 0; i<getElementBtns.length; i++) {
        for (let j = 0; j < getElementBtns[i].classList.length ; j++) {
            if (getElementBtns[i].classList[j] == 'selected') {
                getElementBtns[i].classList.remove('selected')
            }
        }
    }

    // romove all btn from tabet medium and phone
    for (let i = 0; i<getElementBtns2.length; i++) {
        for (let j = 0; j < getElementBtns2[i].classList.length ; j++) {
            if (getElementBtns2[i].classList[j] == 'selected') {
                getElementBtns2[i].classList.remove('selected')
            }
        }
    }

    // hiden all display current
    for (let i = 0; i < getElementDisplays.length; i++ ) {
        getElementDisplays[i].style = 'display: none;'
    }

    // display btn current
    cls.classList.add('selected')

    // display Screen new
    let newDisplay = document.getElementById(screen)
    newDisplay.style = 'display: block'
    
    hideNavbarTabsMobile()
}

function showNavbarTabsMobile() {
    let myElement = document.querySelector('.navbar_response')
    myElement.style = 'display: block'
}

function hideNavbarTabsMobile() {
    let myElement = document.querySelector('.navbar_response')
    myElement.style = 'display: none'
}


// box actions phone

function showListBoxActions() {
    let elmList = document.querySelector('.home_box-actions_list')
    if (elmList.style.display == 'block') {
        elmList.style.display = 'none'
        return 1
    }

    if (elmList.style.display == 'none' || elmList.style.display == '') {
        elmList.style.display = 'block'
    }
}