const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

let config = {
	target: 'web',
	entry: [path.resolve(__dirname, './src/app.js')],
	output: {
		path: path.resolve(__dirname, './src/dist')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['vue-style-loader', 'css-loader']
			},
			{
				test: /\.vue$/,
				use: 'vue-loader'
			}
		]
	},
	plugins: [new VueLoaderPlugin()]
};

module.exports = (env, argv) => {
	let defineSettings;

	if (argv.mode == 'development') {
		defineSettings = {
			DEV_MODE: JSON.stringify(true),
			PROD_MODE: JSON.stringify(false)
		};
	} else if (argv.mode == 'production') {
		defineSettings = {
			DEV_MODE: JSON.stringify(false),
			PROD_MODE: JSON.stringify(true)
		};
	} else {
		// Shouldn't get here
	}

	defineSettings.__VUE_OPTIONS_API__ = JSON.stringify(true);
	defineSettings.__VUE_PROD_DEVTOOLS__ = JSON.stringify(false);

	config.plugins.push(new webpack.DefinePlugin(defineSettings));

	return config;
};
