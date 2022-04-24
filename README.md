# PRACTICA 9 - Aplicación de procesamiento de notas de texto

>Informe para la asignatura de Desarrollo de Sistemas Informáticos
>
>>**[Eric Dürr Sierra](alu0101027005@ull.edu.es)** - **Última modificación**: 24/04/2022

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Eric-Durr/badge.svg?branch=master)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Eric-Durr?branch=master)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Eric-Durr&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Eric-Durr)

***

## [Enlace a la documentación generada con TypeDoc](http://dsi-p09-code-docs.surge.sh/modules.html)

## Indice

- [PRACTICA 9 - Aplicación de procesamiento de notas de texto](#practica-9---aplicación-de-procesamiento-de-notas-de-texto)
  - [Enlace a la documentación generada con TypeDoc](#enlace-a-la-documentación-generada-con-typedoc)
  - [Indice](#indice)
  - [Introducción](#introducción)
  - [Objetivos](#objetivos)
  - [Actividades previas](#actividades-previas)
  - [Conclusiones](#conclusiones)
  - [Referencias](#referencias)
  - [Estructura del directorio](#estructura-del-directorio)
  - [Comandos npm del repositorio](#comandos-npm-del-repositorio)

***

## Introducción

En esta ocasión se desarrolla una práctica en la que se introduce la API de NodeJS, concretamente la librería 'fs' para la lectura/escritura en el sistema de ficheros en su versión síncrona.

A lo largo del informe se van a defender las decisiones tomadas en el desarrollo del programa, se explica la estructura de clases y se plantea cómo usar el programa.

***

## Objetivos

En esta práctica, a demás de persistir con las buenas prácticas de documentación, desarrollo TDD, integración continua con Github Actions, etc. se pretende conseguir elaborar un programa en el que se involucra la API de node para el manejo del sistema de ficheros.

Al finalizar la práctica se espera que el programa:

- Sea capaz de crear archivos JSON que representan notas individuales
- Funcione para mútliples usuarios (no simultáneamente)
- Funcione bajo línea de comandos
- Sea capaz de crear notas
- Sea capaz de eliminar notas
- Sea capaz de editar notas
- Sea capaz de leer notas

y se espera que el proyecto:

- Incluya el paquete ``chalk`` para mostrar la información por pantalla
- Incluya el paquete ``yargs`` para usar el programa mediante la línea de comandos
- Use la API de NodeJS
- Genere documentación
- Se desarrolle mediante TDD
- Se inspeccione el proyecto mediante Sonar Cloud
- Publique la cobertura de código en Coveralls
- Tenga workflows configurados para manejar mediante Github Actions los aspectos antes mencionados

## Actividades previas

Entre las actividades previas del proyecto, a parte de aceptar la tarea en el Github Classroom, se incluye la instalación de los paquetes que son requeridos en el guión para el desarrollo del programa.

Los paquetes a instalar son:

- **yargs**: ``npm install yargs`` ``npm install --save-dev @types/yargs``
- **chalk**: ``npm install chalk``

También puede ser necesario instalar los tipos de datos de TypeScript para **nodejs** si aún no se ha hecho para poder utilizar la API mediante el comando ```npm install --save-dev @types/node```

Parta ahorrar trabajo el repositorio se inicia desde una plantilla previamente diseñada para las prácticas de DSI que incluyen el _scaffold_ base del proyecto, los ficheros de configuración semicompletos y un test básico para probar las actions de Github tras la configuración inicial del proyecto. 

***

## Clases del programa

***

### Clase Note

### Clase User

## Programa principal

***

### Opción de creación de usuario

(crear una lista vacía)

### Opción de adición de nota

(creación automática de un usuario)

(notas por defecto)

### Opción de edición de una nota

(eficiencia evitando crear objetos)

(eliminación del conteido para escribir el nuevo)

### Opción de lectura de títutlos

(eficiencia evitando crear objetos)

### Opción de lectura de una nota

### Opción de eliminación de una nota


## Ejemplo de ejecución

***

## Conclusiones

(posible mejora implementando patrón facade para simplificar el uso de las llamadas al fs)

(aprovechamiento de JSON)

***

## Referencias

[Guión de la práctica](https://ull-esit-inf-dsi-2122.github.io/prct09-filesystem-notes-app/)

## Estructura del directorio

***

```txt
P09/
|____.github/         (Github actions workflow files)
| |____workflows/
| | |____deploy.yml
| | |____runtests.yml
| | |____sonarcloud.yml
|____dist/            (Transpiled JavaScript code)
|____doc/             (Autogenerated TypeDoc documentation files)
|____docs/            (Assingment report folder)
| |_____config.yml
| |____README.md
|____database/        (root folder for notes storage)
|____src/             (Source files for TypeScript code)
|____test/            (Test workbench folder)
|____package.json
|____.gitignore
|____.mocharc.json
|____.eslintrc.json
|____typedoc.json
|____sonar-project.properties
|____tsconfig.json

```

## Comandos para la aplicación de notas

## Comandos npm del repositorio

- npm test  `ejecuta los test unitarios`
- npm run test:watch `inicia la ejecución de los test unitarios de manera ininterrumpida`
- npm run test:coverage `inicia la ejecución de los test junto con la cobertura de código`
- npm run get:coverage `transforma el informe de la cobertura de código en formato lcov`
- npm run build `ejecuta los test y traduce el código TypeScript a JavaScript`
- npm run docs `Genera la documentación de código con TypeDoc del código fuente`
