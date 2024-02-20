// 1. importar el módulo de gulp y sus funciones necesarias al inicio del archivo.
const { src, dest, watch, series } = require('gulp');
// importar los node_modules y crear las funciones
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function css() {
	// 1. identificar el archivo de Sass
	return src('./src/scss/app.scss')
		// 2. compilarlo & minificarlo
		.pipe(sass({ outputStyle: 'expanded' }))
		// 3. postcss & autoprefixer
		.pipe(postcss([autoprefixer()]))
		// 4. guardar el CSS
		.pipe(dest('./build/css'))
}

function imagenes() {
	return src('./src/images/**/*')
		.pipe(dest('./build/images'));
}

function dev() {
	watch('./src/scss/**/*.scss', css);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = series(imagenes, css, dev);