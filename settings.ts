// Customize this file to change the behavior of the server

const settings = {
    "port": 6680, // Port that the server listens for requests on

    "storage": {
        "path": "./", // Location where uploaded files are stored
        "userGB": "100" // Amount of storrage that a user can occupy
    },

    "mongo": {
        "url": "mongodb://127.0.0.1:27017", // Address where your mongoDB server is running at
        "db": "dragonShare", // Name of the database
        "users": "users" // Collection name for login-data
    },
    
    "hash": {
        "salt": "4b5k", // Salting for password hashes
        "pepper": [ // Pepper for password hashes
            "jksfv",
            "87shf",
            "b34rj",
            "0cdnf",
            "qdncp"
        ]
    },

    "token": {
        "size": 64, // Length of access-token
        "characters": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", // Possible characters of access-token
        "age": 600 // Max-age of access-toke. After it expires, the client must refresh its login
    }
}

export default settings