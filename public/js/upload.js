function upload() {
    files = document.getElementById('files').files

    if (files.length == 0) {return}

    form = new FormData()
    for (let i = 0; i < files.length; i++) {
        form.append('file', files[i])
    }

    fetch('/file/upload', {
        method: 'POST',
        body: form
    }).then((res) => {
        if (res.ok) {
            window.location.href = '/'
        }
        else {
            res.text().then((body) => {
                document.getElementById('error').innerText = body
            })
        }
    })
}