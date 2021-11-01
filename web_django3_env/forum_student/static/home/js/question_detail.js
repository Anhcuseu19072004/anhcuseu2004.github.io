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

function displayForm() {
    let elmForm = document.querySelector('.detail_layout_item_box-answer_form')
    let elmBtn  = document.querySelector('.detail_layout_item_box-answer_form_btn')

    if (elmBtn.innerHTML == "Trả Lời") {
        elmBtn.innerHTML = "Đóng Lại"
    }

    else {
        elmBtn.innerHTML = "Trả Lời"
    }
    elmForm.classList.toggle('undisplay')
}

function submit() {
    let idQuestion          = document.querySelector('.detail_layout_item_content').getAttribute('id_question')
    let questionFormContent = tinymce.get("textarea").getContent();
    let elmBtn              = document.querySelector('.box-answer_form_input_fields_submit')
    let elmListAnswer       = document.querySelector('.detail_layout_item_box-answer_list')
    elmBtn.innerHTML        = "Vui Lòng Đợi"
    let data = {
        id      : idQuestion,
        content : questionFormContent
    }

    postData(data = data, url = 'http://127.0.0.1:8000/create-answer/')
    .then(function(response) {
        let questionFormContent = tinymce.get("textarea").getContent(); 
        if (response['status'] == "OK") {
            elmBtn.innerHTML        = "xong"
            elmListAnswer.innerHTML = elmListAnswer.innerHTML +
            `<div class="detail_layout_item_box-answer_list_item">
            <div class="answer_list_item_info">
                <div class="answer_list_item_info_auth">
                    <img src="https://i.pinimg.com/564x/59/de/a6/59dea6cfaf9f0162654b3e6d88aa2b00.jpg" alt="" class="answer_list_item_info_auth_avatar">
                    <span class="answer_list_item_info_auth_name">Bạn</span>
                </div>

                <div class="answer_list_item_info_time">
                   Vừa xong
                </div>
                <div class="answer_list_item_info_actions">
                    <i onclick="showActions(this)" class="fas fa-ellipsis-h undisplay">
                        <ul class="answer_list_item_info_actions_list">
                            
                            <li onclick = "location.reload();" title = "remove" class="answer_list_item_info_actions_list_item">
                                <i class="far fa-trash-alt"></i>
                            </li>
                        </ul>
                    </i>
                </div>
            </div>

            <div class="answer_list_item_content">
                ${questionFormContent}
            </div>
        </div>
            `
            tinyMCE.activeEditor.setContent('');
            displayForm()
        }
        
    })
}

function showActions(cls) {
    cls.classList.toggle('undisplay')
}

function removeAnswer(cls) {
    let getId = cls.getAttribute('id_answer')
    let data  = {
        id : getId
    }

    postData(data = data, url = 'http://127.0.0.1:8000/delete-answer/')
    .then(function(response) {
        console.log(response['status'])
        if (response['status'] == "OK") {
            location.reload();
        }
    })
}