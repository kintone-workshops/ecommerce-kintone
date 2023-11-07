# Snippets Debug
Following are snippets for common debugging steps.

### Errors related to .env

If you get one of the following error messages:  

* `[webpack-cli] Error: Missing environment variable: KINTONE_BASE_URL`
* `[webpack-cli] Error: Missing environment variable: KINTONE_PASSWORD`
* `[webpack-cli] Error: Missing environment variable: KINTONE_USERNAME`
* `[webpack-cli] Error: Missing environment variable: VIEW_ID`
* `[webpack-cli] TypeError: Cannot convert undefined or null to object`
* `Failed to find .env file at default paths: [./.env,./.env.js,./.env.json]`
* `Failed to find .env file at default paths: [./.env,./.env.js,./.env.json]`
* `Failed to upload JavaScript/CSS files`
* `KintoneRestAPIError: [520] [CB_WA01] Password authentication failed...`

Then please verify that
* your `.env` file has been correctly configured
* your username and password for your Kintone account are correct
* you have not modified the `.env.example`

### Errors related to Node.js & npm

Error Message:

```shell
vite build --emptyOutDir

internal/process/esm_loader.js:74
    internalBinding('errors').triggerUncaughtException(
                              ^

Error [ERR_UNSUPPORTED_ESM_URL_SCHEME]: Only file and data URLs are supported by the default ESM loader. Received protocol 'node:'
    at Loader.defaultResolve [as _resolve] (internal/modules/esm/resolve.js:782:11)
    at Loader.resolve (internal/modules/esm/loader.js:85:40)
    at Loader.getModuleJob (internal/modules/esm/loader.js:229:28)
    at ModuleWrap.<anonymous> (internal/modules/esm/module_job.js:51:40)
    at link (internal/modules/esm/module_job.js:50:36) {
  code: 'ERR_UNSUPPORTED_ESM_URL_SCHEME'
}
```

Solution:

```shell
cd ecommerce-kintone
npm install
```

### `npm install` command is not working

1. Verify the Node.js & npm versions **inside** the `ecommerce-kintone` folder
2. Just installed Node.js? Verify you configured Node.js versions **inside** the `ecommerce-kintone` folder

* Mac:`nodenv install 18.16.1 && nodenv local 18.16.1`
* Windows: `nvm install 18.16.1 && nvm use 18.16.1`

Not the correct versions, or confused? 🤔 → Check out the [Guide on Installing Node.js & npm {macOS & Windows}](https://dev.to/kintonedevprogram/guide-on-installing-nodejs-npm-macos-windows-16ii).
