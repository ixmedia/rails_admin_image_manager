var path          = require("path");
var webpack       = require("webpack");
var gulp          = require("gulp");
var gutil         = require("gulp-util");

webpackConfig = {
	cache: false,
	entry: {
		app : "./app/assets/javascripts/rails_admin_image_manager/app-vue.js"
	},
	output: {
		path: path.join(__dirname, "../app/assets/javascripts/rails_admin_image_manager"),
		publicPath: "/",
		filename: "[name]-compiled.js.erb"
	},
	module: {
		loaders: [
			{
	      test: /\.js$/,
	      exclude: /(node_modules|bower_components)/,
	      loader: 'babel', // 'babel-loader' is also a legal name to reference
	      query: {
	        presets: ['es2015']
	      }
	    },
			{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.s[a|c]ss$/,
        loader: 'style!css!sass'
      }
		]
	},
  vue: {
    loaders: {
      scss: 'style!css!sass'
    }
  },
	plugins: [],
	resolve: {
		alias: {
			vue: 'vue/dist/vue.js'
		}
	}
};

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.debug = true;
var devCompiler = webpack(myDevConfig);
gulp.task("webpack:build-dev", function(callback) {
	// run webpack
	devCompiler.run(function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build-dev", err);
		gutil.log("[webpack:build-dev]", stats.toString({
			colors: true
		}));
		callback();
	});
});
