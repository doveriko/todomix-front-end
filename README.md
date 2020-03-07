# TO-DO MIX



## Idea

This is an app for forgetful users to organize their lives. It allows you to create to-do lists and general lists (e.g. shopping lists), private or sharable with other users.



## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault

- **Signup:** As an anon I can sign up in the platform so that I can access to my profile and manage my lists

- **Login:** As a user I can login to the platform so that I can play competitions

- **Logout:** As a user I can logout from the platform so no one else can use it

- **Delete account:** As a user I can delete my account

- **Create Lists**: As a user I can create a list

- **Edit Lists**: As a user I can edit a list

- **Delete List**: As a user I can delete a list

- **Share Lists**: As a user I can share a list with other specific users

- **See Lists:** As a user I can see all my lists

  


## Backlog

- Favourite items. User can favourite items, that will be added to a "favourites" list.

- Expenses model. Add expenses as a third type of lists.

- Social media sharing pluggins.

- Print as PDF.

  


# Client / Frontend

## React Router Routes (React App)
| Path                      | Component            | Permissions | Behavior                                                     |
| ------------------------- | -------------------- | ----------- | ------------------------------------------------------------ |
| `/signup`            | SignUpPage  | anon only  `<AnonRoute>`   | Signup form, navigate to dashboard after signup |
| `/`            | LoginPage            | anon only `<AnonRoute>`  | Login form, link to signup, navigate to homepage after login if user is logged in. <AnonRoute> redirects to DashboardPage |
|                       |                |                            |                                                              |
| `/dashboard` | DashboardPage | user only `<PrivateRoute>`  | Shows all lists from the user and a navbar with a button to create new lists and a log-out button. Every list can be edited and deleted. |
| `/dashboard/add-list` | AddNewListPage | user only `<PrivateRoute>`  | Adds a new lists                           |
| `/lists/:id`    | EditListPage | user only `<PrivateRoute>`  | Display a list to be edited |
|                       |                |                            |                                                              |
|                       |                |                            |                                                              |
|                       |                |                            |                                                              |



<br>



### Page Components

SignUpPage

LoginPage

DashboardPage

AddNewListPage

EditListPage



### Components (smaller)

**Navbar** - Present in all the private routes

**List** - To be displayed in Dashboard, AddNewList and EditList



<br>

# Server / Backend


## Models

User model

```javascript
{
  name: {type: String, required: true},
  surname: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  lists: [{type: Schema.Types.ObjectId, ref: "List"}]
}
```



List model

```javascript
 {
   name: {type: String, required: true},
   tasks: [{text: String, isDone: {type: Boolean, default: false} }],
   status: { type: String, enum: ["To-do","Doing","Done"], default: "To-do" },
   private: {type: Boolean, required: true, default: true},
   creator: {type: Schema.Types.ObjectId,ref:'User'},
   contributors: [ {type: Schema.Types.ObjectId,ref:'User'} ]
 }
```




## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | :--------------------------: | -------------- | ------------ | ------------------------------------------------------------ |
|             |                |                                            |                |              |                                                              |
| POST        | `/auth/signup`                | {name, surname, username, email, password} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                | {username, password}         | 200            | 401        | Checks if fields not empty (422), if user exists (404), and if password matches (401), then stores user in session |
| POST        | `/auth/logout`                | (empty)                      | 204            | 400          | Logs out the user. Destroys the session.                    |
| GET         | `/lists`          |                              | 200 | 400          | Show all lists                                     |
| GET         | `/lists/:id`        | {id}                         |                |              | Show specific list by id                           |
| POST        | `/lists` | {name, tasks, status, private} | 201            | 400          | Create and save a new list                          |
| PUT         | `/lists/:id`   | {name, status, private, contributors} | 200            | 400          | edit list by id                                    |
| DELETE      | `/lists/:id` | {id}                         | 201            | 400          | delete list by id                                   |



## Links

#### [Trello](https://trello.com/b/CZkVbfro/to-do-mix) 

[Client repository Link](https://)

[Server repository Link](https://)

[Deployed App Link](http://)

#### [Slides](https://docs.google.com/presentation/d/15JxsPhwzZCTvGTaRzZ6YfQ6UZbrzIejMkqFbhfK6vQk/edit?usp=sharing)




