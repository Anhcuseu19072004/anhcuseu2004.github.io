
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


// ========= form comment in post detail
function submitCmt() {
    let elmContentCmt = document.getElementById('textarea_cmt')
    let idPost        = document.querySelector('.post_detail_content_container')
    let elmCheckBox   = document.querySelector('.form-cmt_check-box_input')

    if (elmCheckBox.checked) {
        const dataForCmt = {
            contentCmt : elmContentCmt.value,
            id : idPost.id
        }
        
        const dataForQuestion = {
            title       : `LuongSon - grourp IT`,
            content     : elmContentCmt.value,
            discription : elmContentCmt.value,
            tag         : idPost.id,
            type        : 'all'
        }

        postData(dataForQuestion, url = "/add-question/")
            .then(function(response) {
                console.log(`Question status ${response['message']}`)
            })
        postData(dataForCmt, url = '/create-cmt/')
            .then(function(response) {
                console.log(response)
                if (response['status'] == 1) {
                    let elmListCmt = document.querySelector('.post_detail_content_box-comment_list')
                    let elmContentCmt = document.getElementById('textarea_cmt')

                    let newNodeCmt = document.createElement('li') // node item
                    newNodeCmt.classList.add('content_box-comment_list_item')

                    let newNodeBox = document.createElement('div') // node container
                    newNodeBox.classList.add('comment_list_item_box')

                    let newNodeBoxAuth = document.createElement('div') // node box auther
                    newNodeBoxAuth.classList.add('comment_list_item_box_auth')

                    let newNodeImg = document.createElement('img') // node img in box auth
                    newNodeImg.src = 'https://i.pinimg.com/564x/6e/cc/81/6ecc81137e04155243449a4e231dc771.jpg'
                    newNodeImg.classList.add('comment_list_item_box_auth_img')

                    let newNodeName = document.createElement('span') // node name auth in box auth
                    newNodeName.classList.add('comment_list_item_box_auth_name')
                    newNodeName.innerHTML = 'Bạn'

                    // insert node img and node text into box auther
                    newNodeBoxAuth.appendChild(newNodeImg)
                    newNodeBoxAuth.appendChild(newNodeName)

                    let newNodeContentOfCmt = document.createElement('div') // node content cmt in tag li
                    newNodeContentOfCmt.classList.add('comment_list_item_box_text')
                    newNodeContentOfCmt.innerHTML = elmContentCmt.value

                    let newNodeTime = document.createElement('div') // node time in tag li
                    newNodeTime.classList.add('comment_list_item_box_time')
                    newNodeTime.innerHTML = "Vừa Xong"

                    newNodeBox.appendChild(newNodeBoxAuth)
                    newNodeBox.appendChild(newNodeContentOfCmt)
                    newNodeBox.appendChild(newNodeTime)

                    newNodeCmt.appendChild(newNodeBox)
                    elmListCmt.appendChild(newNodeCmt)
                    elmContentCmt.value = ""
            
        }
    })
    }


    else {
        const data_ = {
            contentCmt : elmContentCmt.value,
            id : idPost.id
        }
        postData(data_, url = '/create-cmt/')
        .then(function(response) {
            console.log(response)
            if (response['status'] == 1) {
                let elmListCmt = document.querySelector('.post_detail_content_box-comment_list')
                let elmContentCmt = document.getElementById('textarea_cmt')
    
                let newNodeCmt = document.createElement('li') // node item
                newNodeCmt.classList.add('content_box-comment_list_item')
    
                let newNodeBox = document.createElement('div') // node container
                newNodeBox.classList.add('comment_list_item_box')
    
                let newNodeBoxAuth = document.createElement('div') // node box auther
                newNodeBoxAuth.classList.add('comment_list_item_box_auth')
    
                let newNodeImg = document.createElement('img') // node img in box auth
                newNodeImg.src = 'https://i.pinimg.com/564x/6e/cc/81/6ecc81137e04155243449a4e231dc771.jpg'
                newNodeImg.classList.add('comment_list_item_box_auth_img')
    
                let newNodeName = document.createElement('span') // node name auth in box auth
                newNodeName.classList.add('comment_list_item_box_auth_name')
                newNodeName.innerHTML = 'Bạn'
    
                // insert node img and node text into box auther
                newNodeBoxAuth.appendChild(newNodeImg)
                newNodeBoxAuth.appendChild(newNodeName)
    
                let newNodeContentOfCmt = document.createElement('div') // node content cmt in tag li
                newNodeContentOfCmt.classList.add('comment_list_item_box_text')
                newNodeContentOfCmt.innerHTML = elmContentCmt.value
    
                let newNodeTime = document.createElement('div') // node time in tag li
                newNodeTime.classList.add('comment_list_item_box_time')
                newNodeTime.innerHTML = "Vừa Xong"
    
                newNodeBox.appendChild(newNodeBoxAuth)
                newNodeBox.appendChild(newNodeContentOfCmt)
                newNodeBox.appendChild(newNodeTime)
    
                newNodeCmt.appendChild(newNodeBox)
                elmListCmt.appendChild(newNodeCmt)
                elmContentCmt.value = ""
                
            }
        })

    }
}

