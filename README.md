## deepseen-web

A web application for the [Deepseen](https://github.com/peterdee/deepseen-desktop) project

Stack: [Next](https://nextjs.org), [React](https://reactjs.org), [Typescript](https://www.typescriptlang.org)

DEV: http://localhost:3000

PROD: https://deepseen-web.herokuapp.com

### Deploy

```shell script
git clone https://github.com/peterdee/deepseen-web
cd ./deepseen-web
nvm use 14
yarn
```

### Environment variables

The `.env` file is required, see the [.env.example](.env.example) for details

### Launch

```shell script
yarn dev
```

### Build

```shell script
yarn build
```

### Run static version

Build the application first, and then run:

```shell script
export PORT=3000
yarn start
```

You can specify your own port

### Linting

```shell script
yarn lint
```

Using [ESLint](https://eslint.org)

### Heroku

The `stage` branch is auto-deployed to Heroku

### License

[MIT](LICENSE)
