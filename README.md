# Blogging platform

This project is created with official starter Turborepo:
```sh
npx create-turbo@latest
```

This Turborepo includes the following packages/apps:

2 apps: server and client
2 shared packages: types and config(ts, eslint, jest)

### Apps and Packages

- server: a [Nest.js](https://nestjs.org/) app
- web: a [Next.js](https://nextjs.org/) app
- types: contains type for `server` application
- config: contains configurations of eslint, jest, ts for server and web applications

**Build and run locally**

To develop all apps and packages, run the following command:

Install [Doppler CLI](https://docs.doppler.com/docs/install-cli) and login ot provide SSH key

```
docker login
or
export DOPPLER_TOKEN=...
```
Run database on local or test environment
```
env:local:up
env:test:up
```
Build and run
```
yarn run build
yarn run dev
```
Stop database on local/test environment
```
yarn run env:local:down
or
env:test:down
```


