/* importando el modelo instalado, cuando veamos las {} significa
que se exportando mas de una función */
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//Images
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');




// compilar el codigo de Sass
function compilarCss(done) {
  /*
  1. acceder a la ruta del archivo sass
  2. necesitamos compilar ese archivo sass
  3. guardamos el archivo .css en una carpeta
  */
  // src es la función que me nos ayudar a indentificar la carpeta que contiene el archivo sass
  // dest es la funcion que nos va guardar el archivo compilado
  src('src/scss/styles.scss')
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('build/css'));
  /**
   * .pipe(sass({outputStyle: 'compressed'})) nos entrega una hoja minificada de css
   * .pipe(sass({outputStyle: 'expanded'})) nos entrega una hoja identada mas facil de leer
   * 
   * Autoprefixer es un plugin de PostCss que nos permite analizar nuestro css y garantizar la compatibilidad
   * con navegadores mas antiguos
   */

  done();
}



function watchChange() {
  // watch esta atento a lo que pase en el archivo style.scss
  // y si hay cambios vuelve a llamar a la funcion css
  // watch('src/scss/styles.scss', compilarCss)
  watch('src/scss/**/*.scss',compilarCss)
}
function versionWebp() {
  return src('src/img/**/*/.{png,jpg}')
  .pipe(webp())
  .pipe(dest('build/img'))
}
function images(done) {
  src('src/img/**/*')
  .pipe(imagemin({optimizationLevel : 3}))
  .pipe(dest('build/img'))
  done()
}
exports.images = images;
exports.versionWebp = versionWebp
exports.default = series(compilarCss, watchChange); // que se llama solo con el comando y sin especificar la tarea
// exports.compilarCss = compilarCss;
// exports.watchChange = watchChange;