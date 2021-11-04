
function checkTitle(str) {
    for (i = 0; i < str.length; i++) {
        if (str[i] != ' ') {
            return 1
        }
    }

    return 0
}

function checkSubmit() {
    let elmTitle   = document.querySelector('.form_form_field_title')
    let elmBtn     = document.querySelector('#submit')

    if (elmTitle.value == "") {
        let classOfBtn = elmBtn.classList
        for (let i = 0; i< classOfBtn.length; i++) {
            if (classOfBtn[i] == 'able') {
                elmBtn.classList.remove('able')
                elmBtn.removeEventListener('click', submit)
                return 1
            }

        }
    }

    else {
        let classOfBtn = elmBtn.classList
        for (let i = 0; i< classOfBtn.length; i++) {
            if (classOfBtn[i] == 'able') {
                elmBtn.addEventListener('click', submit)
                return 1
            }

            else {
                elmBtn.addEventListener('click', submit)
                elmBtn.classList.add('able')
            }
        }
    }
    
}


async function postData(data, url) {
    

    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
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

// handless image

function submit() {
    const fileUpload = document.querySelector("#file");
    const reader = new FileReader();

    const files = fileUpload.files
    reader.readAsDataURL(files[0])
    reader.addEventListener('load', (event) => {
        const fileUpload = document.querySelector("#file");
        const img = event.target.result;
        let elmTitle = document.getElementById('title')
        var myContent = tinymce.get("textarea").getContent();
        console.log(myContent)
        data = {
            title_ : elmTitle.value,
            content_ : myContent,
            file_ : `${img}`, //base 64
            name_file_ : fileUpload.files[0].name
        }

        postData(data, url = '/addpost/')
        .then(
            function(response) {
                let elmMessage = document.querySelector('.form_form_field_actions_submit_message')
                if (response['status'] == "BAD") {
                    elmMessage.innerHTML = 'hãy chắc chắn rằng bài viết của bạn là hợp lệ'
                }
                console.log(response['message'])
                elmMessage.innerHTML = response['message']
            }
        )
        
    })
}
// check submit is valid
setInterval(() => {
    checkSubmit()
}, 500);