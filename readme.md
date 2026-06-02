# SYNCDEV BACKEND

## Setup foundation

- setup server using express.js
- configure database using MongoDB
- setup Models for users
- data sanitizations and schema validations
- Encrypting passwords

### signup

- validate payload using joi.
- check if users already exits.
- error handling
- hash passowrd.
- save data into db.

### login

- find emailId from database
- validate password using bcryptjs
- geneate JWT tokens
- send tokens to cookies in response
