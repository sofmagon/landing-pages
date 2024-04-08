// 1. importar el módulo de gulp y sus funciones necesarias al inicio del archivo.
const { src, dest, watch, series } = require('gulp');
// importar los node_modules y crear las funciones
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const imagemin = require("gulp-imagemin");
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const sourcemaps = require('gulp-sourcemaps');

function css() {
	// identificar el archivo principal de Sass
	return src('./src/scss/app.scss')
		// 1. inicia sourcemaps
		.pipe(sourcemaps.init())
		// 2. compilar y/o minificar
		.pipe(sass({ outputStyle: 'expanded' }))
		// 3. postcss y autoprefixer
		.pipe(postcss([autoprefixer()]))
		// 4. guardar el mapa junto al build
		.pipe(sourcemaps.write('.'))
		// 5. guardar el CSS
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

	return src('./src/images/**/*.{png,jpg}')
		.pipe(webp(opciones))
		.pipe(dest('./build/images'))
}

function imgAvif() {
	const opciones = {
		quality: 50
	}

	return src('./src/images/**/*.{png,jpg}')
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