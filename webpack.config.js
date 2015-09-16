var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
      return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
      nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
 entry: "./src/script.js",
  target:'node',
 output: {
   path: __dirname + '/dist',
   filename: "bundle.js"
 },
 module: {
   loaders: [
     { test: /\.js/, loader: "babel-loader" }
   ]
 },
  externals: nodeModules
};
