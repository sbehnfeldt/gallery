# Git
Set up a git repository
```shell
git init .
```

# Composer
Initialize the composer dependency file
```shell
cd src
composer init
composer install
```

# NPM
Initialize the Node dependencies file:
```shell
cd src
npm init
npm install
```

# SASS
Install node-sass as a node dependency:

```shell
npm install node-sass --save-dev
```

Define scripts in the Node dependencies file to for compiling SASS files into CSS:

```
    "sass:compile": "node-sass sass/main.scss public/css/style.css",
    "sass:watch": "node-sass sass/main.scss public/css/style.css -w",
```

# Webpack

Install Webpack, the Webpack CLI, and the Webpack Dev Server (for hot-module replacement, or HMR)

```shell
npm i webpack webpack-cli webpack-dev-server -D
```

Add the following script to package.json:
`"dev" : "webpack-dev-server --open",`

Add the following configuration settings to webpack.config.js:

```
devServer: {
    static: './dist'
}   
```