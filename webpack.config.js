module.exports = {
	output: {
		filename: 'bundle.js'
	},

	devtool: 'sourcemap',

	module: {
		loaders: [
			{ test: /\.html$/, loader: 'raw' },
			{ test: /\.scss$/, loader: 'style!css!sass' },
			{ test: /\.css/, loader: 'style!css' },
			{ test: /\.(png|jpg|jpeg)$/, loader: 'file' },
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: [/client\/lib/, /node_modules/, /\.spec\.js/]
			},
			{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url' },
			{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file' }
		]
	}
};
