function goToSiteAddQuestion(cls) {
    window.location.href = `/quizi/home/quizi-dashboard/modify-exam/add-questions/${cls.getAttribute('id_exam')}`;
}

async function postData(setup) {
    const response = await fetch(setup['url'], {
        method: setup['method'], // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'form-data/application/x-www-form-urlencoded',
          "X-CSRFToken" : setup['token'] 
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(setup['data']) // body data type must match "Content-Type" header
      });
      return response.json()
}


function deleteQuestion(cls) {
    if (confirm('Bạn có muốn xóa hàng này(không thể khôi phục)')) {
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        let data = {
        questionId : cls.getAttribute('question_id')
        }

        postData({
            data   : data,
            url    : "/quizi/api/delete-question",
            method : "DELETE",
            token  : csrftoken
        })
        .then(function(response) {
            if(response['status'] == 'OK') {
                let elmList = document.querySelector('.modify-layout__list-question')
                let elmItem = document.getElementById(`${data['questionId']}`)
                elmList.removeChild(elmItem)

            } else {
                alert('Vui lòng thử lại sau')
            }
        })
    }
}

function updateExam(cls) {
    let titleExam = document.getElementById("exam_title").innerHTML.trim()
    let typeExam  = document.getElementById("exam_type").value
    if (confirm(`Bạn có muốn lưu thay đổi thành\nTiêu đề: ${titleExam}\nThể loại: ${typeExam}`)) {
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
        data = {
            examId    : cls.getAttribute('exam_id'),
            titleExam : titleExam,
            typeExam  : typeExam
        }
        
        postData({
            data   : data,
            url    : "/quizi/api/update-exam",
            token  : csrftoken,
            method : "PUT"
        })
        .then(function(response) {
            if (response['status'] == 'OK') {
                alert('Thành công')
            } else {
                alert('Vui lòng thử lại sau')
            }
        })
    }
}