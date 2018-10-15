const gulp = require('gulp')
const ts = require('gulp-typescript')
const tsProject = ts.createProject('tsconfig.json')
const {config, getWatchPath} = require('./build_config')
const tsify = require('tsify')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const sass = require('gulp-sass')

const errorHandler = error => console.error(error.toString())

gulp.task('compile:scripts', ()=> 
	browserify({
		entries: `${config.ts.source}/${config.ts.entry}`,
		debug: true,
	})
	.plugin(tsify)
	.bundle()
	.on('error', errorHandler)
	.pipe(source('index.js'))
  .pipe(gulp.dest(config.ts.output))
)

gulp.task('compile:scripts:watch', ()=>
	gulp.watch(getWatchPath(config.ts), ['compile:scripts'])
)


gulp.task('compile:styles', ()=>
  gulp.src(`${config.sass.source}/${config.sass.entry}`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.sass.output))
)

gulp.task('compile:styles:watch', ()=>
	gulp.watch([`${config.sass.source}/**/${config.sass.watch}`], ['compile:styles'])
)

gulp.task('watch', ['compile:scripts:watch', 'compile:styles:watch'])