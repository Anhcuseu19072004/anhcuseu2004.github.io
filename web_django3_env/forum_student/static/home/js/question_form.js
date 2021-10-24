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

function submit() {
    let elmTitle       = document.querySelector('.box-form_heading_title')
    let myContent      = tinymce.get("textarea").getContent();
    let elmSubject     = document.querySelector('.box-form_heading_type')
    let elmUser        = document.querySelector('.overlay_container_tabs_user_name')
    let elmDiscription = document.querySelector('.box-form_heading_discription')
    if (elmTitle.value != "") {
        data = {
            content     : myContent,
            title       : elmTitle.value,
            type        : elmSubject.value,
            discription : elmDiscription.value,
            tag         : 'none'
        }

        postData(data, "http://127.0.0.1:8000/add-question/")
        .then(function(response) {
            console.log(response) 
            let elmBtn = document.querySelector('.box-form_content_submit_btn')
            elmBtn.innerHTML = response['message']
            return response
        })
    }

    else {
        elmTitle.value = 'Câu hỏi của ' + elmUser.textContent.trim() + ' về ' + `${elmSubject.value}`
        let titleHaveBeenEdited = 'Câu hỏi của ' + elmUser.textContent.trim() + ' về ' + `${elmSubject.value}`

        data = {
            content     : myContent,
            title       : titleHaveBeenEdited,
            type        : elmSubject.value,
            discription : elmDiscription.innerHTML,
            tag         : 'none'
        }

        console.log(data)
        postData(data, "http://127.0.0.1:8000/add-question/")
        .then(function(response) {
            console.log(response) 
            let elmBtn = document.querySelector('.box-form_content_submit_btn')
            elmBtn.innerHTML = response['message']

            return response
        })
    }


}