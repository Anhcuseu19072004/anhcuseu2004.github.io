var changed = 0
async function postData(data, url, mt) {
    

    const response = await fetch(url, {
        method: `${mt}`, // *GET, POST, PUT, DELETE, etc.
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

async function submit(type) {
    let elmBtn     = document.querySelector('.edit_layout_content_actions_submit')
    let elmMessage = document.querySelector('.edit_layout_content_actions_submit_message')
    let infoUser   = document.getElementById('user').getAttribute('user')
    let idObject   = document.getElementById('pk').getAttribute('pk')
    if (elmMessage.innerHTML.trim() == "Lưu Thay Đổi" && elmMessage.style.display != 'none') {
        elmBtn.classList.remove('unwait')
        elmMessage.style.display = 'none'
    }


    if (type == "post" && changed == 1) {
        const fileUpload = document.querySelector("#file");
        const reader = new FileReader();

        const files = fileUpload.files
        reader.readAsDataURL(files[0])
        reader.addEventListener('load', (event) => {
            const fileUpload = document.querySelector("#file");
            const img = event.target.result;
            let elmTitle = document.getElementById('title')
            let myContent = tinymce.get("textarea").getContent();

            let data = {
                title     : elmTitle.innerText,
                content   : myContent,
                file      : `${img}`,
                name_file : fileUpload.files[0].name,
                changed   : '1',
                type      : type,
                user      : infoUser,
                id        : idObject
            }
            
            postData(data = data, url = '/modify-record/', mt = "PUT")
            .then(function(response) {
                console.log(response)
                if (response['status'] == 'OK') {
                    elmBtn.classList.add('unwait')
                    elmMessage.style.display = 'block'
                    elmBtn.innerText = "xong"
                    setTimeout(function() {
                        window.location.replace("/user-dashboard/");
                    }, 1000)
                }
            })
        
        })
    }

    else if (type == "post" && changed == 0) {

        let elmTitle  = document.getElementById('title')
        let myContent = tinymce.get("textarea").getContent();
        let data      = {
            title     : elmTitle.innerText,
            content   : myContent,
            changed   : '0',
            type      : type,
            user      : infoUser,
            id        : idObject
        }
        
        postData(data = data, url = '/modify-record/', mt = "PUT")
        .then(function(response) {
            console.log(response)
            if (response['status'] == 'OK') {
                elmBtn.classList.add('unwait')
                elmMessage.style.display = 'block'
                elmBtn.innerText = "xong"
                setTimeout(function() {
                    window.location.replace("/user-dashboard/");
                }, 1000)
            }
        })
    }

    else if (type == "question") {
        let elmTitle       = document.getElementById('title')
        let elmDiscription = document.getElementById('discription')
        let myContent      = tinymce.get("textarea").getContent();
        
        let data = {
            title       : elmTitle.innerText,
            discription : elmDiscription.innerText,
            content     : myContent,
            type        : type,
            user        : infoUser,
            id          : idObject
        }

        postData(data = data, url = '/modify-record/', mt = "PUT")
            .then(function(response) {
                console.log(response)
                if (response['status'] == 'OK') {
                    elmBtn.classList.add('unwait')
                    elmMessage.style.display = 'block'
                    elmBtn.innerText = "xong"
                    setTimeout(function() {
                        window.location.replace("/user-dashboard/");
                    }, 1000)   
                }
            })
    }

}


function PreviewAvatar(cls) {
    let file   = cls.files[0]
    let elmImg = document.querySelector('.edit_layout_header_thumbnail_img')
    let url    = URL.createObjectURL(file)
    elmImg.src = url
    changed    = 1
}