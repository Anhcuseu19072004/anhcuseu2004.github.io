
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

function deleteRecord(cls, type = null) {
    if (confirm('Bạn có muốn xóa hàng này?\nHành động này sẽ xóa toàn bộ dữ liệu về bài viết và không thể khôi phục nó')) {
        if (type == 'post') {
            let postId = cls.getAttribute('id_post')
            let data = {
                id   : postId,
                type : type
            }
            postData(data = data, url = "/delete-record/", "DELETE")
            .then(function(response) {
                if (response['status'] == 'OK') {
                    location.reload();
                }

                else {
                    console.log(response['message'])
                }
            })
        }

        if (type == 'question') {
            let questionId = cls.getAttribute('id_question')
            let data = {
                id   : questionId,
                type : type
            }

            postData(data = data, url = "/delete-record/", "DELETE")
            .then(function(response) {
                if (response['status'] == 'OK') {
                    location.reload();
                }

                else {
                    console.log(response['message'])
                }
            })
        }
    }
}