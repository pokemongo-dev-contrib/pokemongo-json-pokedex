var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var TypedocWebpackPlugin = require('typedoc-webpack-plugin');

var nodeModules = {};
fs.readdirSync('node_modules')
	.filter(function (x) {
		return ['.bin'].indexOf(x) === -1;
	})
	.forEach(function (mod) {
		nodeModules[mod] = 'commonjs ' + mod;
	});

module.exports = {
	entry: './src/index.ts',
	target: 'node',
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'index.js'
	},
	module: {
		loaders: [{
			test: /\.ts$/,
			loader: 'ts-loader'
		}]
	},
	resolve: {
		alias: {
			core: './core',
			components: './components/'
		}
	},
	plugins: [
		new TypedocWebpackPlugin({})
	],
	externals: nodeModules
};
