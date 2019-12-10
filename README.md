# Lightstreams P2P eShop App

Demonstrating how Lightstreams tech stack can be practically used in order to build a decentralized eShop for managing, selling and purchasing of digital content.

This demo example is available at https://example-eshop.lightstreams.io and it demonstrates the following 2 features:
- [Private file sharing using SmartVault](https://docs.lightstreams.network/getting-started/file-sharing/)
- [E-Commerce by monetizing the SmartVault content](https://docs.lightstreams.network/getting-started/peer-to-peer-ecommerce/)

![node_provider](./node_provider.png)

![shop_view](./shop_view.png)

## Install
```
yarn install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deploy

```
npm run build // don't ask me why the pre-deploy script doesn't work
firebase login
firebase deploy -m "Migrating to latest JS SDK 0.13.0" --only=hosting
```
