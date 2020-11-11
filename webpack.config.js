const webpack = require('webpack');

let Loader = require('./webpack/dotenv/Loader.js');

if (typeof process.env.NODE_ENV === 'string' && process.env.NODE_ENV !== '') {
  Loader.run(process.env.NODE_ENV);
} else {
  Loader.run();
}

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': process.env
    })
  ]
};
