# Turborepo starter

This project is created with official starter Turborepo:
```sh
npx create-turbo@latest
```

This Turborepo includes the following packages/apps:

2 apps: server and client
2 shared packages: types and config(ts, eslint, jest)

### Apps and Packages

- `server`: a Nest.js [Nest.js](https://nestjs.org/) app
- `web`: a Next.js [Next.js](https://nextjs.org/) app
- `types`: contains type for `server` application
- `config`: contains configurations of `eslint`, `jest`, `ts` for `server` and `web` applications


### Build and run locally

To develop all apps and packages, run the following command:

```
yarn run build
yarn run dev
```
