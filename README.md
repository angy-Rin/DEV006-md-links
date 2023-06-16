# Markdown Links

## Índice

* [1. Resumen del proyecto](#1-resumen-del-proyecto)
* [2. Instrucciones de uso](#2-instrucciones-de-uso)
* [3. Proceso de desarrollo](#3-proceso-de-desarrollo)
* [5. Criterios de aceptación mínimos del proyecto](#5-criterios-de-aceptación-mínimos-del-proyecto)
* [6. Entregables](#6-entregables)


***

## 1. Resumen del proyecto

Este proyecto es una herramienta que hace uso de [Node.js](https://nodejs.org/), para leer y analizar archivos
en formato `Markdown`, y verificar los links que contengan y reportar algunas estadísticas.

Incluye una línea de comando (CLI) así como una librería en JavaScript.

## 2. Instrucciones de uso
  
  La **_libreria_** se puede instalar via 
  ```sh
  npm install angy-md-links
  ```
  En cambio, la **_linea de comando_** se instala mediante
   ```sh
  npm i -g angy-md-links
  ```

##### 1) Libreria.

mdLinks(path, options)

##### Argumentos

* `path`: Ruta **absoluta** o **relativa** al **archivo** o **directorio**.
Si la ruta pasada es relativa, se resolvera como relativa al directorio.
* `options`: Un objeto con **únicamente** la siguiente propiedad:
  - `validate`: Booleano que determina si se desea validar los links
    encontrados.

Con `validate:false` :

* `href`: URL encontrada.
* `text`:  Texto de la URL.
* `file`: Ruta del archivo donde se encontró el link.

Con `validate:true` :

* `href`: URL encontrada.
* `text`: Texto de la URL.
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.

#### Ejemplo (resultados como comentarios)

```js
const mdLinks = require("angy-md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.error);
```

### 2) CLI (Command Line Interface - Interfaz de Línea de Comando)

Puede  ejecutarse de la siguiente manera a través de la **terminal**:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

## 3. Proceso de desarrollo

Este proyecto se abordo mediante la especificación del proceso mediante un diagrama de flujo, tanto de la API como de la CLI.

[Diagrama de Flujo](https://www.figma.com/file/cPQudFDIPISdTzFCY3sQjd/Diagrama-de-Flujo?type=whiteboard&node-id=0-1)

