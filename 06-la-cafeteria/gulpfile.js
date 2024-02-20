// 1. importar el módulo de gulp y sus funciones necesarias al inicio del archivo.
const { src, dest, watch, series } = require('gulp');
// importar los node_modules y crear las funciones
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const imagemin = require("gulp-imagemin");
const webp = require('gulp-webp');
const avif = require('gulp-avif');

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
		.pipe(imagemin({ optimizationLevel: 3 }))
		.pipe(dest('./build/images'));
}

function imgWebp() {
	const opciones = {
		quality: 50
	}

	return src('./images/**/*.{png,jpg}')
		.pipe(webp(opciones))
		.pipe(dest('./build/images'))
}

function imgAvif() {
	const opciones = {
		quality: 50
	}

	return src('./images/**/*.{png,jpg}')
		.pipe(avif(opciones))
		.pipe(dest('./build/images'))
}

function dev() {
	watch('./src/scss/**/*.scss', css);
	watch('./src/images/**/*', imagenes)
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.imgWebp = imgWebp;
exports.imgAvif = imgAvif;
exports.default = series(imagenes, imgWebp, imgAvif, css, dev);