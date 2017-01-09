var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.mode;

var libraryName = 'react-minesweeper';
const GLOBALS = {
	'process.env.NODE_ENV': JSON.stringify('production')
};

var outputFile = libraryName + '.min.js';

var config = {
	devtool: 'source-map',
	entry: path.resolve(__dirname, 'src/components/Bomb.js'),
	output: {
		path: __dirname + '/dist',
		filename: outputFile,
		library: libraryName,
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin(GLOBALS),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
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
	externals: {
		'react': { commonjs: 'react', commonjs2: 'react', amd: 'react', root: 'React' },
		'react-dom': { commonjs: 'react-dom', commonjs2: 'react-dom', amd: 'react-dom', root: 'ReactDOM' },
		'react-addons-css-transition-group': { commonjs: 'react-addons-css-transition-group', commonjs2: 'react-addons-css-transition-group', amd: 'react-addons-css-transition-group', root: ['React','addons','CSSTransitionGroup'] }
	}	
};

module.exports = config;
