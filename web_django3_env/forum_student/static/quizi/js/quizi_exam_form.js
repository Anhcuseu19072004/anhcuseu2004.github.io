async function postData(data, url, method) {
    

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

function addExam(cls) {
    let contentTitleExam = document.getElementById('title_exam').value
    let typeExam         = document.getElementById('type_exam').value
    let cookies          = document.querySelector('.exam-form-layout').getAttribute('id_cookies')
    let elmMessage       = document.querySelector('.exam-form-layout__form__fields__actions__submit')
    
    if (contentTitleExam.length <= 10) {
        alert('Tiêu đề quá ngắn')
    } else {
        if (confirm(`Bạn có muốn tạo chắc nghiệm này với\nTiêu đề là ${contentTitleExam}\nThể loại ${typeExam}`)) {
            let data = {
                title : contentTitleExam,
                type  : typeExam,
                user  : cookies
            }
            elmMessage.innerHTML = 'Vui Lòng Chờ'
            postData(data = data, url = '/quizi/api/add-exam', method = 'POST')
            .then(function(response) {
                console.log(response)
                if (response['status'] == "OK") {
                    elmMessage.onclick = ""
                    elmMessage.innerHTML = 'Thành Công'
                    setTimeout(function() {
                        window.location.href = `/quizi/home/quizi-dashboard/modify-exam/${response['exam_id']}`
                    }, 2000)
                    
                }
            })
        }
    }
}