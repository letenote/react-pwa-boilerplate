First init project and install - commands are:

```
npm init --yes
npm install react react-dom react-router react-router-dom
npm install webpack webpack-cli webpack-dev-server -D
npm install html-webpack-plugin -D
npm install @babel/core @babel/plugin-proposal-class-properties @babel/preset-env @babel/preset-react babel-loader css-loader style-loader file-loader -D
npm install serve -D
npm install redux react-redux redux-thunk
```

workbox lib installer - commands are:

```
npm install workbox-webpack-plugin copy-webpack-plugin -D
npm install workbox-window workbox-core workbox-precaching

// dev common - dev webpack config
npm install webpack-merge babel-polyfill
npm install html-webpack-plugin script-ext-html-webpack-plugin -D

// dev common - prod webpack config
npm install sass zlib
npm install dart-sass sass-loader mini-css-extract-plugin terser-webpack-plugin media-query-splitting-plugin clean-webpack-plugin webpack-manifest-plugin compression-webpack-plugin css-minimizer-webpack-plugin cssnano-preset-simple -D
```
