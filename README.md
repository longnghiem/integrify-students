Live demo [here](https://peaceful-fortress-12582.herokuapp.com/students)

# Project summary
The objective of this project is to build a simple gallery application for Integrify' students.

![page](https://user-images.githubusercontent.com/3630009/43805571-f378a0e8-9aa8-11e8-9c7b-e4bd60a0dd18.png)

* Users can: 
  - View all students on Home page.
  - Sign up with username and password.
  - Log in and log out.
  - Add new student and delete student while logging in.
  - Add new comment on each student's displaying page while logging in.
* mLab is used for storing all students' data.

# Languages used
* Html (ejs 2.5)
* Css (Bootstrap 4.1)
* Javascript
* Express 4.16
* Mongoose 5.2

# Using the application locally
Please make sure MongoDB has been installed on the machine first!

Clone the project:
```
> git clone git@github.com:longnghiem/integrify-students.git
> cd integrify-students
> npm install
```

Then inside app.js, change the mongoose.connect URL into:
```javascript
mongoose.connect('mongodb://localhost:27017/Integrify', { useNewUrlParser: true })
```

```
> npm start
```
Please check localhost:3009 on browser to view the application.

# License
This project is licensed under the MIT License.
