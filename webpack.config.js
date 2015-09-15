module.exports = {
 entry: "./src/script.js",
 output: {
   path: __dirname + '/dist',
   filename: "bundle.js"
 },
 module: {
   loaders: [
     { test: /\.js/, exclude: /node_modules/, loader: "babel-loader" }
   ]
 }
};
