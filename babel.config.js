module.exports = (api) => {
	const test = api.env('test')

	return {
		presets: [
			[
				'@babel/preset-env',
				{
					targets: test ? { node: 'current' } : { esmodules: true },
					modules: test ? 'auto' : false
				}
			],
			'@babel/preset-react'
		]
	}
}
