const path = require('path')

const prod = process.env.NODE_ENV === 'production'

const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: path.join(__dirname, '/src/client.jsx'),

	devtool: prod ? false : 'eval-source-map',

	mode: prod ? 'production' : 'development',

	output: {
		filename: '[name].[hash].js',
		path: path.join(__dirname, 'build/'),
		publicPath: '/'
	},

	resolve: {
		extensions: ['.js', '.jsx'],
		modules: ['node_modules'],
	},

	devServer: {
		hot: true,
		open: true,
		contentBase: path.join(__dirname, 'build/'),
		stats: 'errors-only',
		historyApiFallback: true,
		clientLogLevel: 'silent'
	},

	optimization: {
		minimize: prod,
		splitChunks: {
			chunks: 'all'
		}
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: ['babel-loader']
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.svg$/,
				loader: 'react-svg-loader'
			}
		]
	},

	plugins: [
		new HTMLWebpackPlugin({
			template: 'src/index.html',
			favicon: 'src/public/favicon.ico',
			filename: 'index.html',
			inject: 'body',
			minify: prod
				? {
						collapseWhitespace: true,
						collapseBooleanAttributes: true,
						minifyCSS: true,
						minifyJS: true,
						processConditionalComments: true,
						quoteCharacter: '"'
				  }
				: false
		})
	]
}
