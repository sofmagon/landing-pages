// 1. importar el módulo de gulp y sus funciones necesarias al inicio del archivo.
const { src, dest, watch } = require('gulp');
// importar los node_modules y crear la función sass
const sass = require('gulp-sass')(require('sass'));

function css() {
	// 1. identificar el archivo de Sass
	return src('./src/scss/app.scss')
		// 2. compilarlo
		.pipe(sass())
		// 3. guardar el CSS
		.pipe(dest('./build/css'))
}

function dev() {
	watch('./src/scss/**/*.scss', css);
}

exports.css = css;
exports.dev = dev;