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
npm i -D webpack webpack-cli webpack-dev-server
npm i -D babel-loader @babel/core @babel/preset-env
npm i -D style-loader css-loader
npm i -D sass-loader sass 
npm i -D postcss-loader postcss-preset-env
npm i -D cssnano autoprefixer rucksack-css
npm i -D mini-css-extract-plugin
```

Add the following scripts to package.json:

```
    "build": "webpack",
    "dev" : "webpack-dev-server --open",
```

Add the following configuration settings to webpack.config.js:

```
devServer: {
    static: './dist'
}   
```

Add the following module rule to webpack.config.js:

```
    {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
    }
```

## Babel

.babelrc:

```json
{
    "presets": [
        "@babel/preset-env"
    ]
}
```

## Post-CSS Loader

postcss.config.js:

```js
module.exports = {
    plugins: [
        [
            "postcss-preset-env",
            {
                // Options
            },
        ],
    ],
};
```

## MiniCssExtract Plugin

Update webpack config:

```js
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin')
```

Update webpack config to include plugin for MiniCssExtractPlugin:

```js
plugins: [new MiniCssExtractPlugin()]
```

Update webpack config to include a module for CSS loader:

```js
{
    test: /\.scss$/i,
    use : [
        {
            loader: MiniCssExtractPlugin.loader, 
            options: {
                hmr: process.env.NODE_ENV === 'development'
            }
        }, 
        'css-loader', 
        'postcss-loader', 
        'sass-loader'
    ]
}
```