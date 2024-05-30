## Table of Contents

## 
- [About](#about)
- [Deployment](#webhook-deployment)
- [Setup](#setup)
    + [ENV File](#env)
- [Dependencies](#dependencies)
    + [Dev-Dependencies](#dev-dependencies)
- [Testing](#testing)
- [Commands](#commands)
    + [Frontend Commands](#frontend-commands)


## About <a name="about"></a>
The frontend is how the CO<sub>2</sub> site looks. This new site is based off the old site [Carbon](https://carbon.op-bit.nz). Our goal is to recreate the site from scratch using industry standard tools but keep the feel and use of the old Carbon site. For this we are using Vite instead of PHP.

## Deployment <a name="webhook-deployment"></a>
The frontend is not currently deployed on any server but local host.

## Project Setup <a name="setup"></a>
To set up the site locally you will need to change from the root to frontend using the command `cd frontend`. Once in the frontend folder you will need to install the dependencies by running `npm install` or `npm i` for short. Once all the depnedances are installed you can run the site locally by running `npm run dev`.

### ENV File Setup <a name="env"></a>
In the frontend folder where the package.json and the REAME.md files are located you will need to create a file called `.env` and put in the following line `VITE_BACKEND_API_KEY='http://co2-api.duckdns.org'` 

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

[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh

[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Testing <a name="testing"></a>
To run the tests, you will need to make sure you are in the frontend folder if you are not then run the command `cd frontend`. Once in the frontend you will need to run `npm run test` to run all the local tests.

## Commands <a name="commands"></a>

### Frontend Commands <a name="frontend-commands"></a>

```
npm install prettier commitizen cz-conventional-changelog pretty-quick --save-dev
```

- /frontend/ cz `npm run cz` runs commitizen and walks you through commiting a change

- /frontend/ eslint `npm run lint` runs eslint command the frontend project
- /frontend/ prettier:check `npm run prettier:check` runs the check command the frotnend project
- /frontend/ prettier:write `npm run prettier:write` runs the write command the frotnend project
