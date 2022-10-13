# Interview Scheduler

This web application was created to aid students in polishing their interview techniques. Any day of the week, a student can schedule an appointment with a mentor who is available.

!['img of home page'](https://github.com/hugo-pb/interview-scheduler/blob/master/docs/homepage.png)

## Setup

Make sure you install all dependencies before attempting to run the application use `npm isntall` or `npm i` or `npm install`. Please make sure to not change the versions of any dependency, this could cause compatible issues.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Back End

https://github.com/hugo-pb/scheduler-api

- In order to properly run this application youll need to configure a back end. click on the link bellow and follow the setup instructions on the README file.

## Errors

- If you would like to see error, you could run `npm start error` on the api server.
- If for some reason the app is not responding as expected it may only need a db reset for the back end, just make a GET request to: `http://localhost:8001/api/debug/reset`.

![error](https://user-images.githubusercontent.com/85078686/195488936-fa677fba-d024-49f6-a88b-fa915b9a9c0a.gif)
