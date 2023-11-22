# eLearning

![nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![js](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![html](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![css](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![reactrouter](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![mongodb](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![docker](https://img.shields.io/badge/Docker-blue?style=for-the-badge&logo=docker&logoColor=white)

<hr></hr>

This is a project inspired in course platforms such as udemy that you can:
- Create an account
- Login in the created account
- Create courses
- Buy courses
- And maybe learn something in the end

<hr></hr>

## Important commands (run dev local)

Run frontend react app
```sh
cd eLearning
npm install
npm run dev
```

Run backend API
```sh
cd eLearningAPI
npm install
node app.js
```

Run mongodb daemon with docker
```sh
docker run --network host mongo:latest
```
OR

### Docker

Run all the project as a container with docker (Redirecting the frontend port 5173 --> 80)
```sh
docker build -t elearning .
docker run -p 80:5173 -p 8080:8080 -it --name elearning elearning:latest
```

<hr></hr>

![devstatus](https://img.shields.io/badge/Status-dev-purple?style=for-the-badge)
![love](http://ForTheBadge.com/images/badges/built-with-love.svg)
