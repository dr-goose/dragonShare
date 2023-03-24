function deleteFile(filename) {
    fetch('/', {
        method: 'POST',
        body: JSON.stringify({
            file: filename
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        }
    }).then(res => {
        if (res.ok) {
            window.location.href = '/'
        }
    })
}

function downloadFile(filename) {
    download = document.createElement('a')
    download.href = `/file/download?filename=${filename}`
    download.click()
}