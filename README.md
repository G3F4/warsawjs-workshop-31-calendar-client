# warsawjs-workshop-31-calendar-client
Calendar client for purpose of WarsawJS workshop #31

### Build
To build production client:
```
yarn run build
```

or build tar package:

```
yarn run build:package
```

### Development
To start local development:

* create `.env.development` and `.env.production` based od `.env.example`
```
yarn start
```
Local client is proxing request to localhost:5000
