
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



// categori

async function postData(data, url, method) {
    

    const response = await fetch(url, {
        method: `${method}`, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'form-data/application/x-www-form-urlencoded'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json()
}

function categori(cls) {
    let elmSubject = document.getElementById('select_subject')
    let elmTime    = document.getElementById('select_time')
    let data       = {
        subject : elmSubject.value,
        time    : elmTime.value
    }
    postData(data = data, url = '/categori/', method = 'POST')
    .then(function(response) {
        // console.log(response['list_post'])
        // console.log(response['last_time'])

        if (response['list_post'] != 'None') {
            let elmListPost = document.getElementById('list_post')
            let listPost    = JSON.parse(response['list_post'])
            elmListPost.innerHTML = ""
            for(let post = 0; post < listPost.length; post++) {
                console.log(listPost[post]['fields']['title'])
                elmListPost.innerHTML = elmListPost.innerHTML + `
                <div class="content_post_layout_list_item col lg-4 md-4 sm-6 xs-12">
                    <a href="/view-more/${listPost[post]['pk']}" class="content_post_layout_list_item_link">
                        <div class="content_post_layout_list_item_link_img" style="background-image: url(${listPost[post]['fields']['post_img']});"></div>
                        <h3 class="content_post_layout_list_item_link_heading">
                        ${listPost[post]['fields']['title']}
                        </h3>
                        <div class="content_post_layout_list_item_link_auth">
                            <img src="/media/background_item.png" alt="" class="content_post_layout_list_item_link_auth_avatar">
                            <span class="content_post_layout_list_item_link_auth_name">
                        ${listPost[post]['fields']['user_of_post']}
                            </span>
                            <span class="content_post_layout_list_item_link_auth_time">
                            ${listPost[post]['fields']['post_time']}
                            </span>
                            <div class="content_post_layout_list_item_link_auth_actions">
                                <i class="fas fa-thumbtack"></i>
                            </div>
                        </div>
                        <div class="content_post_layout_list_item_link_view-discuss">
                            <a href="#" class="item_link_view-discuss_link">
                            xem các thảo luận về bài viết này
                            </a>
                        </div>
                    </a>
                </div>`
            }
        }
    })
}