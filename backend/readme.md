## Table of Contents

## 
- [Table of Contents](#table-of-contents)
- [Services Documentation ](#services-documentation)
- [About ](#about)
- [Deployment ](#deployment)
- [Project Setup ](#project-setup)
  - [Render DB ](#render-db)
  - [Local Docker DB](#local-docker)
- [Prisma ](#prisma)
- [Testing ](#testing)
- [Dependency List ](#dependency-list)
  - [Dev Dependencies ](#dev-dependencies)

## Controller Documentation <a name="documentation"><a>
[Webhook Documentation](documentation/Webhook.md)  
[Devices Documentation](documentation/Devices.md)  
[SensorData Documentation](documentation/SensorData.md)  
[Block Documentation](documentation/Blocks.md)

## About <a name="about"></a>
**BIT Co2-sensor webhook**
Webhook connected to the BIT [TTN](https://www.thethingsnetwork.org/) Console.  

Data being uplinked to TTN from the hardware is sent every 5 minutes.    
The webhook automatically listens for those changes and returns a payload containing the data.

## Root dir <a name="webhook-deployment"></a>
Using the main url `webhookte...com`
```js
{
    "statusCode": 200,
    "message": "Available endpoints",
    "endpoints": {
      webhook: `[POST]: ${basePath}/integration/webhook`,
      recent_room_data:`[GET]: ${basePath}/room/recent/{dev_eui}`,
      all_room_data:`[GET]: ${basePath}/room/{dev_eui}`
    }
}
```

## Project Setup <a name="setup"></a>
To setup locally, from the project root
`cd backend`
then run `npm install` to install the required dependencies.  
Create your `.env` file in the root of the backend dir
`touch .env`

### Render Test Database <a name="render-db"></a>
This is also connected to TTN so it is returning the same data as live
```js
DATABASE_URL="postgres://fresh_air_webhook_user:Udcns3xIGCztavZwcDptVkLbAaAre4z6@dpg-cnvu97q1hbls73bq57hg-a.oregon-postgres.render.com/fresh_air_webhook"
```

### Local Docker Database Environment <a name="local-docker"></a>

delete your current migrations folder, if any, run the following  
Start your docker desktop  
Make sure you are in the backend dir `cd backend`  
```js
docker run -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```
set your `.env` file to  
```js
DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5432/postgres
```
then  
`npm run generate`  
`npm run migrate dev`  
`npm run seed`

## Testing <a name="testing"></a>
From the project root  
`cd backend`  
Make sure packages are installed `npm install`  
run `npm test` | `npm run test` to run the jest test suite

Jest testing uses the Babel module plugin to allow ES6 imports via the .babelrc file

```js
{
    "env": {
      "test": {
        "plugins": ["@babel/plugin-transform-modules-commonjs"]
      }
    }
  }
```

## Dependency List <a name="dependencies"></a>
[Express](https://www.npmjs.com/package/express)  
[Cors](https://www.npmjs.com/package/cors)  
[Body-Parser](https://www.npmjs.com/package/body-parser)

### Dev Dependencies <a name="dev-dependencies"></a>
[Babel Module Plugin](https://www.npmjs.com/package/@babel/plugin-transform-modules-commonjs)  
[Prisma](https://www.prisma.io/)  
[Nodemon](https://www.npmjs.com/package/nodemon)  
[Prettier](https://prettier.io/)  
[Commitizen](https://www.npmjs.com/package/commitizen)  
[Jest (Unit testing)](https://jestjs.io/)  
[Supertest (HTTP testing)](https://www.npmjs.com/package/supertest)  