const getWatchPath = ({watch, source})=>watch.map((t)=>`${source}/**/${t}`)
const config = {
	ts: {
		source: 'src/scripts',
		output: 'dist',
		watch: ['*.tsx', '*.ts'],
		entry: 'index.tsx'
	},
	sass: {
		source: 'src/styles',
		output: 'dist',
		watch: '*.sass',
		entry: 'index.sass'
	}
}
module.exports = {config, getWatchPath}