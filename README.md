# metro-with-symlinks

There is a longstanding
[issue](https://github.com/facebook/metro/issues/1#issuecomment-386852670)
with
[Metro](https://github.com/facebook/metro)
not accepting symlinks.
This makes it difficult to use metro with monorepo setups and example projects.
This script provides a solution. 

This package generates a custom `rn-cli.config.js` file based on checking for symlinks inside the `node_modules`.
It also takes care of making peer dependencies available to those symlinked modules. 

## Usage

```bash
# Install
yarn add -D metro-with-symlinks
# or
npm install -D metro-with-symlinks
```

Add a postinstall script to your `package.json`.
This will ensure the `rn-ci.config.js` file is generated before `metro` is run:

```
"scripts": {
    "postinstall": "metro-with-symlinks"
}
```