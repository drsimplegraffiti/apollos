#### Project setup

> yarn add express apollo-server-express graphql
> yarn add -D nodemon

### For authentication

> yarn add jsonwebtoken bcryptjs

### For database

> yarn add mongoose

### For authorization

> yarn add graphql-shield graphql-middleware @graphql-tools/schema

### SignUp

```graphql
mutation ($name: String!, $email: String!, $password: String!) {
  signUp(name: "joe", email: "joe@gmail.com", password: "1234") {
    id
    name
    password
    email
  }
}
```

### Login

```graphql
mutation ($email: String!, $password: String!) {
  Login(email: "joe@gmail.com", password: "1234") {
    user {
      id
      name
      email
    }
    token
  }
}
```

#### me

```graphql
query {
  me {
    id
    name
    email
  }
}
```

#### Update user_profile

Use altair to test this query

```graphql
mutation ($profile_picture: Upload) {
  updateProfile(profile_picture: $profile_picture) {
    id
    name
    profile_picture
  }
}
```

Source: https://github.com/era-tech-420/express-graphql-apollo/blob/7_graphql_file_upload/schama.js
