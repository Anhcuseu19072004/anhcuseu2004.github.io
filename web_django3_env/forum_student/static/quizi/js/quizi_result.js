function redirectToHome() {
    window.location.href = '/quizi/home/'
}

function setUpPage() {
    let elmBack = document.querySelector('.form_nav_item_navbar-pc_logo_previous')
    elmBack.click = ""
    elmBack.addEventListener('click', redirectToHome)
}

setUpPage()

