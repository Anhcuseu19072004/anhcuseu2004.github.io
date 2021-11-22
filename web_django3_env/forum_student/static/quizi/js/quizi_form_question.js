async function postData(data, url, method, token) {
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'form-data/application/x-www-form-urlencoded',
          "X-CSRFToken" : token 
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json()
}

function addQuestion(condition) {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    let exam_id          = document.getElementById('question_title').getAttribute('exam_id')
    let titleQuestion    = document.getElementById('question_title').innerText.trim()
    let answerA          = document.getElementById('answer_A').value
    let answerB          = document.getElementById('answer_B').value
    let answerC          = document.getElementById('answer_C').value
    let answerD          = document.getElementById('answer_D').value
    let ElmCorrectAnswer = document.getElementById('correct_answer').value
    let correctAnswer    = document.getElementById(`${ElmCorrectAnswer}`).value
    let data = {
        exam_id        : exam_id,
        title          : titleQuestion,
        answer_A       : answerA,
        answer_B       : answerB,
        answer_C       : answerC,
        answer_D       : answerD,
        answer_correct : correctAnswer
    }
    postData(data = data, url = '/quizi/api/add-question', method = "POST", token = csrftoken)
    .then(function(response){
        if (response['status'] == "OK") {
            if (condition == 'True') {
                alert('Thành Công')
                window.location.href = `/quizi/home/quizi-dashboard/modify-exam/${exam_id}`
            } else {
                alert('Thành Công')
            }
        } else {
            alert('Không thành công, vui lòng thử lại sau')
        }
    })
}