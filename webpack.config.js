const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'src/client/public');
const APP_DIR = path.resolve(__dirname, 'src/client/app');

if (process.env.NODE_ENV) {
	var pluginArr = [
		new webpack.definePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),
		new webpack.optimize.UglifyJsPlugin({
			comments: false,
			compress: {
				warnings: false,
				drop_console: true,
				drop_debugger: true
			}
		})
	];
} else {
	var pluginArr = [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	];
}

const config = {
	mode: 'development',
	entry: APP_DIR + '/index.jsx',
	output: {
		path: BUILD_DIR,
		filename: 'game-bundle.js'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /.jsx?/,
				include: APP_DIR,
				loader: 'babel-loader'
			},
			{
				test: /.scss$/,
				include: APP_DIR,
				loader: 'style-loader!css-loader!sass-loader'
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'file-loader'
			}
		]
	},
	devServer: {
		contentBase: BUILD_DIR
	},
	plugins: pluginArr
}

module.exports = config;