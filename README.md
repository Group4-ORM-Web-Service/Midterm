# Midterm 

# Project Name: "Product Management"

## Getting Started
#### 1. ENV

Create .env file in the root of project directory

```bash 
SERVER_PORT=3000 

USERNAME=postgres
PASSWORD=12345
DATABASE=product-management
HOST=127.0.0.1
```

#### 2. PostgreSQL - Create a database named `[databaseName]`

#### 3. Install dependencies
Note: Required node version: v18.19.1 to prevent difference dependencies version

```bash
npm install
```

#### 3. Run the development server

```bash
npm run dev
```


### 4. Connect database and create the tables

```bash
node sync.js
```
Open http://localhost:3000 with your browser to see the result.


## Learn More

- Setting up Product Management frontend [https://github.com/Group4-ORM-Web-Service/Midterm/blob/main/README.md](https://github.com/Group4-ORM-Web-Service/Midterm/blob/main/README.md)

- Resource [https://nodejs.org/en/docs](https://nodejs.org/en/docs)