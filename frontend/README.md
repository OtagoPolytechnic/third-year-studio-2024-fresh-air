## Table of Contents

## 
- [About](#about)
- [Deployment](#webhook-deployment)
- [Setup](#setup)
- [Dependencies](#dependencies)
    + [Dev-Dependencies](#dev-dependencies)
- [Testing](#testing)


## About <a name="about"></a>
The frontend is how the CO<sub>2</sub> site looks. This new site is base off the old site [Carbon](https://carbon.op-bit.nz). Our goal is to recreate the site from scratch using industry standard tools but keep the feel and use of the old Carbon site. For this we are using Vite instead of PHP.

## Deployment <a name="webhook-deployment"></a>
The frontend is not currently deployed on any server but local host.

## Project Setup <a name="setup"></a>
To set up the site locally you will need to change from the root to frontend using the command `cd frontend`. Once in the frontend folder you will need to install the dependaces by running `npm install` or `npm i` for short. Once all the depnedances are installed you can run the site locally by running `npm run dev`.

## Dependency List <a name="dependencies"></a>
[React](https://react.dev)

[React-Dom](https://www.npmjs.com/package/react-dom)

[Recharts](https://recharts.org/en-US/)

[React-Google-Charts](https://www.react-google-charts.com)

[React-Dom-Router](https://reactrouter.com/en/main)

### Dev Dependencies <a name="dev-dependencies"></a>
[Vite](https://vitejs.dev)

[Prettier](https://prettier.io/)

[Commitizen](https://www.npmjs.com/package/commitizen)  

[Jest (Unit testing)](https://jestjs.io/) 

[Eslint](https://eslint.org)

## Testing <a name="testing"></a>
To run the tests, you will need to make sure you are in the frontend folder if you are not then run the command `cd frontend`. Once in the frontend you will need to run `npm run test` to run all the local tests.