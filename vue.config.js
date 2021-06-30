// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)

// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYY-M-D HH:mm:ss')

module.exports = {
	publicPath: '/',
	lintOnSave: true,
	outputDir: 'dist',
	assetsDir: '',
	runtimeCompiler: true,
	productionSourceMap: false,
	devServer: {
		publicPath: '/',
		// proxy: {
		// 	'^/v1': {
		// 		target: 'localhost:3000',
		// 		// 路径重写
		// 		pathRewrite: { '^/v1': '/v1' },
		// 		changeOrigin: true
		// 	}
		// }
	},
	css: {
		loaderOptions: {
			sass: {}
		}
	},
	// 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-service/lib/config/base.js
	chainWebpack: config => {
		/**
		 * 删除懒加载模块的 prefetch preload，降低带宽压力
		 */
		config.plugins.delete('prefetch').delete('preload')
		config.resolve.symlinks(true)
		config
			// 开发环境
			.when(
				process.env.NODE_ENV === 'development',
				// sourcemap不包含列信息
				config => config.devtool('cheap-source-map')
			)
		// markdown
		config.module.rule('md').test(/\.md$/).use('text-loader').loader('text-loader').end()
		// image exclude
		const imagesRule = config.module.rule('images')
		imagesRule
			.test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
			.exclude.add(resolve('src/assets/svg'))
			.end()
		// 重新设置 alias
		config.resolve.alias.set('@', resolve('src')).set('@api', resolve('src/api')).set('@libs', resolve('src/libs'))
		// node
		config.node.set('__dirname', true).set('__filename', true)
	}
}
