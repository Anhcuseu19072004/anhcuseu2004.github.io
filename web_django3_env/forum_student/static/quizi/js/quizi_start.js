var postAble = true

async function postData(setup) {
    const response = await fetch(setup['url'], {
        method: setup['method'], // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'form-data/application/x-www-form-urlencoded',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(setup['data']) // body data type must match "Content-Type" header
      });
      return response.json()
}

function changeAnswer(cls, pk) {
    let listElmAnswer = document.querySelectorAll(`.code-${pk}.question__list-answer__item`)
    for(let i = 0; i < listElmAnswer.length; i++) {
        listElmAnswer[i].classList.remove('checked')
    }
    cls.classList.add('checked')
}


function getListIdQuestion() {
    let listElmQuestion = document.querySelectorAll('.start__body__list__item__question')
    let listId          = []
    for(let i = 0; i < listElmQuestion.length; i++) {
        listId.push(listElmQuestion[i].id)
    }

    return listId
}

function checkFinalExam(list) {
    for(let i = 0; i < list.length; i++) {
        condition = document.querySelector(`.code-${list[i]}.question__list-answer__item.checked`)
        if (condition === null) {
            return false
        }
    }
    return true
}

function getArrayAnswer(list) {
    let listAnswer = []
    for(let i = 0; i < list.length; i++) {
        item = {
            'id_question'   : list[i],
            'answer_select' : document.querySelector(`.code-${list[i]}.question__list-answer__item.checked`).getAttribute('value_answer')
        }
        listAnswer.push(item)
    }

    return listAnswer
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function submit() {
    let listIdquestion = getListIdQuestion()
    let elmBtn         = document.querySelector('.start__actions__btn')
    let listAnswer     = []
    if (checkFinalExam(listIdquestion)) {
        if (postAble) {
            postAble   = false
            listAnswer = getArrayAnswer(listIdquestion)
            let data   = {
                'user'          : getCookie('user').replace(/\"/i, "").replace(/\"/i, ""),
                'list_question' : listAnswer,
                'exam_id'       : document.querySelector('.start').getAttribute('id_exam')
            }
            postData({
                url : '/quizi/api/end-exam',
                method : 'POST',
                data   : data
            })
            .then(function(response){
                if (response['status'] == 'OK') {
                    window.location.href = `/quizi/home/intro/result/${response['data']}`
                } else {
                    console.log('Vui lòng thử lại sau')
                }
            })
            postAble   = true
            
        } else {
            alert('Yêu cầu của bạn đã gửi vui lòng đợi')
        }
        
    } else {
        alert('Vui lòng trả lời hết các câu hỏi')
    }
}