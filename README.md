# bettersocial-test-bram

# How to run program

- go to root directory at this repo and run `npm install`
- and run the program with `npm run start:dev`

# How to run test

- go to root directory at this repo and run `npm run test`

# How to see swagger documantations

- and run the program with `npm run start:dev`
- at browser access this url : http://localhost:3000/api/docs#/

# End point list can use this or use from swagger

`curl --location 'localhost:3000/users/register' \
--header 'Content-Type: application/json' \
--header 'Cookie: connect.sid=s%3APo2KveKKrX82EtNmQqV-F3OACIpRw48i.jX%2BfqngAA1oo0v5FMNcZva%2F7uTH0W%2FINmUWpjczWUdQ' \
--data '{
    "username": "xxxx33d",
    "password": "dddd"
}'`

`curl --location 'localhost:3000/users/username/is-exist' \
--header 'Content-Type: application/json' \
--header 'Cookie: connect.sid=s%3APo2KveKKrX82EtNmQqV-F3OACIpRw48i.jX%2BfqngAA1oo0v5FMNcZva%2F7uTH0W%2FINmUWpjczWUdQ' \
--data '{
    "username": "bramastana"
}'`

# How if cant run it

- Please contact me at : brm.stnd@gmail.com
