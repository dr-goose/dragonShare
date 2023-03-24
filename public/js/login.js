document.getElementById('login').addEventListener('click', () => {
    username = document.getElementById('username').value
    password = document.getElementById('password').value

    fetch('/user/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then((res) => {
        if (res.ok) {
            window.location.href = '/'
        }
    })
})