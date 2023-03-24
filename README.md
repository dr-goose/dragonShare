# Dragonshare
A locally hosted file-sharing and cloud-storage platfrom.

## Dependencies
Dragonshare requires `Node.js` and a running instance of `MongoDB`.
For further dependencies, check out `./package.json`.

## Get Dragonshare up and running
There are a few commands that you need to enter before Dragonshare is able to start:

 1. Install `Node.js` dependencies: `npm i`
 2. Compile TypeScript: `npm tsc` or `npx -p typescript tsc`
 3. Start server: `node app`
 
_Note: You also need to have a MongoDB instance running!_

You can access `Dragonshare` in your browser on: `localhost:6680`

## Create, delete and get info of users
With `MongoDB` and `Dragonshare` running:

 - navigate to `./admin-tools`: `cd ./admin-tools`

**Add user**
The command synthax for adding a user is:

`node user add [username] [password] [filesize]`

 - username and password cannot contain spaces
 - filesize is the storage space in `GB` that a user can occupy
 
 **Delete user**
 The command synthax for deleting a user is:
 
`node user delete [username]`

**Get info of user**
The command synthax for retrieving information of a user is:

`node user info [username]`

## Customize Dragonshare
You can customize `Dragonshare` in the `./settings.ts` file.

_Note: After changing `./settings.ts`, you need to recompile the project. And restart the server._

**Auto-compile and restart**

 1. Open a new terminal and enter: `npm run tsc`
 2. Open another terminal and enter: `npm run nodemon`
 
If you make changes in the sourcecode, they will be automatically applied to the server.