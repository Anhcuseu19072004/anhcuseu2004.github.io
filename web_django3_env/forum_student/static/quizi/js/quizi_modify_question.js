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


function postQuestion(redirect) {
    const csrftoken      = document.querySelector('[name=csrfmiddlewaretoken]').value;
    let question_id      = document.getElementById('question_title').getAttribute('question_id')
    let titleQuestion    = document.getElementById('question_title').innerText.trim()
    let answerA          = document.getElementById('answer_A').value
    let answerB          = document.getElementById('answer_B').value
    let answerC          = document.getElementById('answer_C').value
    let answerD          = document.getElementById('answer_D').value
    let ElmCorrectAnswer = document.getElementById('correct_answer').value
    if (ElmCorrectAnswer == "not_modify") {
        let data = {
            title          : titleQuestion,
            question_id    : question_id,
            answer_A       : answerA,
            answer_B       : answerB,
            answer_C       : answerC,
            answer_D       : answerD,
            answer_correct : ElmCorrectAnswer
        }
        postData({
            data   : data,
            url    : "/quizi/api/modify-question",
            method : "PUT",
            token  : csrftoken

        })
        .then(function(response){
            if (response['status'] == 'OK') {
                if (redirect == "True") {
                    alert("Thành Công")
                    window.location.href = `/quizi/home/quizi-dashboard/`
                } else {
                    alert("Thành Công")
                }
            }
        })
    } else {
        let correctAnswer = document.getElementById(`${ElmCorrectAnswer}`).value
        let data = {
            title          : titleQuestion,
            question_id    : question_id,
            answer_A       : answerA,
            answer_B       : answerB,
            answer_C       : answerC,
            answer_D       : answerD,
            answer_correct : correctAnswer
        }

        postData({
            data   : data,
            url    : "/quizi/api/modify-question",
            method : "PUT",
            token  : csrftoken

        })
        .then(function(response){
            if (response['status'] == 'OK') {
                if (redirect == "True") {
                    alert("Thành Công")
                    window.location.href = `/quizi/home/quizi-dashboard/`
                } else {
                    alert("Thành Công")
                }
            }
        })
    }
    
}