async function postData(data, url, method) {
    

    const response = await fetch(url, {
        method: `${method}`, // *GET, POST, PUT, DELETE, etc.
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
function deleteExam(id) {
    if (confirm('Bạn có muốn xóa hàng này không')) {
        data = {
            id_exam : id,
        }

        postData(data = data, url ='/quizi/api/delete-exam', method = 'DELETE')
        .then(function(response) {
            console.log(response)
            if (response['status'] == 'OK') {
                let elmDelete = document.getElementById(`${id}`)
                let elmList   = document.querySelector('.layout__content__list')
                elmList.removeChild(elmDelete)
            } else {
                alert('Thử lại sau')
            }
        })
    }
}