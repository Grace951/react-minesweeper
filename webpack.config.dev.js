var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin  = require('html-webpack-plugin');

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	title: 'ChingChingTest',
	template: path.resolve(__dirname, './src/example/index.html'),
	filename: 'index.html',
	inject: 'body'
});

var config = {
	debug: true,
	devtool: 'inline-source-map',
	devServer:{
		stats:{
		hash:         false,
		version:      false,
		timings:      true,
		assets:       true,
		chunks:       false,
		chunkModules: false,
		modules:      false,
		cached:       false,
		reasons:      false,
		source:       false,
		errorDetails: true,
		chunkOrigins: false,
		color: true
		}
	},	
	noInfo: false,
	entry: [
		path.resolve(__dirname, './src/example/index.js')
	],
	target: 'web',
	output: {
		path: __dirname + '/dist', 
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: [
		HtmlWebpackPluginConfig,
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [
			{
				test: /(\.jsx?$|\.js$)/,
				include: path.join(__dirname, 'src'),
				exclude: /(node_modules)/,
				loaders: ['babel']
			},
			{
				test: /(\.scss?$|\.sass$)/,
				loaders: [
					'style',
					'css',
					'sass'
				]
			}
		]
	},
	resolve:{
		root: [
			path.resolve('src'),
			path.resolve('src/components'),
			path.resolve('node_modules')
		],
		extensions:['','.js','.jsx']
	},
	resolveLoader:{
		root: path.resolve('node_modules')
	},	
};

module.exports = config;
