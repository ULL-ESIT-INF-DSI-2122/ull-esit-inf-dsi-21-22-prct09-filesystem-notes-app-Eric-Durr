# PRACTICA 9 - Aplicación de procesamiento de notas de texto

>Informe para la asignatura de Desarrollo de Sistemas Informáticos
>
>>**Eric Dürr Sierra** - **eric.durr.20@ull.edu.es**
>>
>> **Última modificación**: 24/04/2022

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Eric-Durr/badge.svg?branch=master)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Eric-Durr?branch=master)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Eric-Durr&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Eric-Durr)

***CI STATUS***

[![Deploy report](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Eric-Durr/actions/workflows/deploy.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Eric-Durr/actions/workflows/deploy.yml)
[![Sonar-Cloud Analysis](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Eric-Durr/actions/workflows/sonarcloud.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Eric-Durr/actions/workflows/sonarcloud.yml)
[![Test and coverage](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Eric-Durr/actions/workflows/runtests.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Eric-Durr/actions/workflows/runtests.yml)
***

## [Enlace a la documentación generada con TypeDoc](http://dsi-p09-code-docs.surge.sh/modules.html)

## Indice

- [PRACTICA 9 - Aplicación de procesamiento de notas de texto](#practica-9---aplicación-de-procesamiento-de-notas-de-texto)
  - [Enlace a la documentación generada con TypeDoc](#enlace-a-la-documentación-generada-con-typedoc)
  - [Indice](#indice)
  - [Introducción](#introducción)
  - [Objetivos](#objetivos)
  - [Actividades previas](#actividades-previas)
  - [Clases del programa](#clases-del-programa)
    - [Clase Note](#clase-note)
    - [Clase User](#clase-user)
  - [Programa principal](#programa-principal)
    - [Opción de creación de usuario](#opción-de-creación-de-usuario)
    - [Opción de creación de usuario](#opción-de-creación-de-usuario-1)
    - [Opción de adición de nota](#opción-de-adición-de-nota)
    - [Opción de edición de una nota](#opción-de-edición-de-una-nota)
    - [Opción de lectura de títulos](#opción-de-lectura-de-títulos)
    - [Opción de lectura de una nota](#opción-de-lectura-de-una-nota)
    - [Opción de eliminación de una nota](#opción-de-eliminación-de-una-nota)
  - [Para la ejecución](#para-la-ejecución)
  - [Referencias](#referencias)
  - [Estructura del directorio](#estructura-del-directorio)
  - [Comandos para la aplicación de notas](#comandos-para-la-aplicación-de-notas)
  - [Comandos npm del repositorio](#comandos-npm-del-repositorio)

***

## Introducción

En esta ocasión se desarrolla una práctica en la que se introduce la API de NodeJS, concretamente la librería 'fs' para
la lectura/escritura en el sistema de ficheros en su versión síncrona.

A lo largo del informe se van a defender las decisiones tomadas en el desarrollo del programa, se explica la estructura
de clases y se plantea cómo usar el programa.

***

## Objetivos

En esta práctica, a demás de persistir con las buenas prácticas de documentación, desarrollo TDD, integración continua
con Github Actions, etc. se pretende conseguir elaborar un programa en el que se involucra la API de node para el manejo
del sistema de ficheros.

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

Entre las actividades previas del proyecto, a parte de aceptar la tarea en el Github Classroom, se incluye la
instalación de los paquetes que son requeridos en el guión para el desarrollo del programa.

Los paquetes a instalar son:

- **yargs**: ``npm install yargs`` ``npm install --save-dev @types/yargs``
- **chalk**: ``npm install chalk``

También puede ser necesario instalar los tipos de datos de TypeScript para **nodejs** si aún no se ha hecho para poder
utilizar la API mediante el comando ```npm install --save-dev @types/node```

Parta ahorrar trabajo el repositorio se inicia desde una plantilla previamente diseñada para las prácticas de DSI que
incluyen el _scaffold_ base del proyecto, los ficheros de configuración semicompletos y
un test básico para probar las actions de Github tras la configuración inicial del proyecto. 

***

## Clases del programa

Para manejar la información en el programa se crean las clases de **notas** (Notes) y de **usuario** (User). 
Se diseñan para controlar la información que se solicita y que se introduce en el sistema de la aplicación de notas.

### Clase Note

Esta clase pretende servir de interfaz para, a la hora de cargar una nota o escribir una nota, manejar las propiedades
de:
- título: título de la nota
- cuerpo: texto de contenido de la nota
- color: color de la nota

Esta última propiedad se representa por un tipo personalizado de datos que limita a las cadenas de caracteres "red",
"blue", "green" y "yellow" de modo que se pueda controlar que las notas puedan mutar sólo entre esas opciones.

Para esta clase se crean métodos accesores para cada una de las propiedades empleando la sintaxis que brinda TypeScript 
, ya que este método hace que se asegure la forma de acceder a los datos

```TypeScript
get title(): string { return this._title; }
get body(): string { return this._body; }
get color(): Color { return this._color; }

get JSON() {
  return {
    title: `${this.title}`,
    body: `${this.body}`,
    color: `${this.color}`,
  };
}
get toJSONString(): string {
  return '{\n'
          + `\t"title": "${this.title}",\n`
          + `\t"body": "${this.body}",\n`
          + `\t"color": "${this.color}"\n`
          + '}\n';
}
```
A demás permite acceder como si fueran atributos a datos que la clase genera de una manera más elaborada sin tener que 
crear los propios atributos

De la misma manera se crean métodos modificadores empleando una sintaxis similar para el título y el cuerpo

```TypeScript
set title(value: string) { this._title = value; }

set body(value: string) { this._body = value; }
```

Sin embargo para el atributo de color se añade una serie de métodos que mutan el color de una forma más controlada,
añadiendo una segunda capa de control para no incluir colores no contemplados. Para cada color se incluye un método.

```TypeScript
public colorIsYellow() { this._color = 'yellow'; }

public colorIsBlue() { this._color = 'blue'; }

public colorIsRed() { this._color = 'red'; }

public colorIsGreen() { this._color = 'green'; }
```

Se va a contemplar que el usuario pueda añadir notas por defecto, es decir vacías y sin especificar un título, para ello
se diseña un constructor por defecto que crea una nota con nombre "New note", un cuerpo vacío y con color amarillo. Se
pretende que el usuario experimente la menor sensación de restricción posible, este aspecto se va a ampliar en el
programa principal.

***

### Clase User

Para concebir el usuario de la aplicación se diseña una clase que permita contener las propiedades que este va a aplicar
en el programa. En este caso basta con definir un nombre de usuario y una lista de notas (de objetos Note). 

No se nombra esta clase como NotesList o algo similar porque se pretende que esta clase sea el nexo de las 
funcionalidades y aspectos que incumben al usuario en el programa.

El usuario siempre se crea por defecto con la lista de notas vacía para a posteriori gestionar cuáles se incluyen en la
lista. Siempre es necesario especificar un nombre de usuario, ya que no tiene sentido en este contexto un usuario por
defecto.

No se espera modificar el objeto usuario para representarlo a lo largo de la aplicación, siempre se crea y se destruye 
con cada ejecución, por ende esta propiedad es readonly.

Nuevamente se incluyen métodos accesores, en este caso para obtener toda la lista de notas y para obtener el nombre de
usuario. Por otro lado, las notas pueden accedidas individualmente tanto por índice en la lista como por su título.

```TypeScript
  public note(inx: number): Note | undefined {
    return this.notes.find((_, i) => i === inx);
  }

  public noteByTitle(title: string): Note | undefined {
    return this.notes.find((note) => note.title === title);
  }
```

A la hora de añadir una nueva nota se comprueba que no exista ya una nota con ese título haciendo uso del método 'find'
de los array de JavaScript. Como se espera que el usuario pueda no especificar un título o especificar sólo un título se
contemplan cuatro opciones_:

- crear una nota con todos los datos
- crear una nota con un título específico, de color amarillo y con el cuerpo vacío
- crear una nota por defecto
- crear más de una nota por defecto

Si el usuario ya tiene una nota por defecto, se analiza ese caso y se crea una nueva nota que modifica el título por
defecto para añadirle su posición en la lista, es decir, si se añade una segunda nota por defecto podría llamarse
_New note (1)_.

```TypeScript
  public addNote(title?: string, body?: string, color?: Color): boolean {
    if (!this.notes.find((el) => el.title === title)) {
      if (title !== undefined && body !== undefined && color !== undefined) {
        this.notes.push(new Note(title, body, color));
      } else if (title !== undefined && (body === undefined || color === undefined)) {
        this.notes.push(new Note(title));
      } else if (this.notes.find((el) => el.title === 'New note')) {
        this.notes.push(new Note(`New note (${this.notes.length})`));
      } else {
        this.notes.push(new Note());
      }
      return true;
    }
    return false;
  }
```

También se contempla que el usuario pueda editar una nota, para ello se comprueba que la nota exista haciendo uso del 
método definido para encontrar notas por títulos, en caso afirmativo se modifican los campos  haciendo uso de los 
métodos accesores de la clase Note

Para eliminar las notas también se comprueba que la nota exista, en caso afirmativo se aplica el método _filter_ de los 
arrays de JavaScript para sobrescribir el array de objetos Note.

Todos estos métodos devuelven feedback al programa principal para saber si la operación se ha completado correctamente. 
Al no haber múltiples tipos de error se devuelve ``true`` si ha funcionado y `false` si no; a partir de esto el programa
será capaz de notificar al usuario de cómo ha ido el proceso.

El método que se usa para leer una nota (readNote()) en lugar de devolver un booleano devuelve ``false`` o la cadena de
caracteres formateada para leer la nota.

***

## Programa principal

***

### Opción de creación de usuario

A demás de las opciones especificadas en el guión se ha añadido la posibilidad de representar la creación de un usuario
para lo cual se gestiona el comando ``new-user`` que recibe como único parámetro el nombre de usuario y que, en caso de
no existir ya dicho usuario, crea una nueva carpeta con el nombre del usuario. Para esta operación se usa el método
``mkdirSync`` de la librería `fs` que crea el directorio bajo la carpeta `database`.

### Opción de creación de usuario

Para complementar la anterior opción del programa y siguiendo la misma lógica, se desarrolla de manera análoga la
eliminación de un usuario junto con sus notas para lo cual se comprueba que el usuario exista y se llama al método 
``rmSync`` de la librería ``fs`` cuyos parámetros son la ruta al directorio del usuario y las opciones de ejecución es 
decir una eliminación recursiva y forzosa para simular la ejecución de ``rm -rf database/[usuario]`` 

### Opción de adición de nota

Como ya se ha comentado se pretende que el usuario pueda añadir notas por defecto por eso el único dato obligatorio es
el nombre de usuario.

Lo primero que se hace al manejar este comando es crear un objeto User, ya que sí o sí se va a crear un usuario; esto
con el fin de hacer una aplicación lo menos restrictiva posible, es decir, si el usuario no existe y va a crear una
nueva nota, en lugar de fallar el programa crea un nuevo usuario. Para comprobar que el usuario existe se crea una
variable que contiene todos los directorios de usuario bajo ``database`` y si se incluye uno con el nombre de usuario
carga todas las notas de este en el objeto de tipo User, en otro caso crea el usuario e informa de ello.

El siguiente paso es crear la nota, para lo cual previamente se comprueba que se especifique el título. Esto permite al
programa conocer cuándo se crea una nota por defecto y cuándo incluyendo el título. En el caso de incluir el título se
lanza el método de creación de una nota dentro de una sentencia ``if`` para manejar el feedback de la función, ya que en
caso de fallo se lanza un mensaje informando de ello y se termina el programa.

En caso de añadir exitosamente la nota, si se incluye un cuerpo este es modificado en la nueva nota y si se incluye un
color se maneja el cambio de color en la nueva nota.

Finalmente este cambio se hace persistente escribiendo un fichero bajo el directorio del usuario con el título de la
nueva nota y en formato JSON haciendo uso del método síncrono de escritura de la librería ``fs``. Este método hace uso 
del accesor de la clase nota para emitir un output en formato JSON para escribir en el nuevo fichero. El usuario es 
informado de la creación de su nueva nota tras esto

### Opción de edición de una nota

En este caso, para editar una nota se busca un enfoque distinto, no se crea un objeto usuario. Se busca evitar cargar 
toda la lista de notas, ya que es solo una la que se va a modificar y se busca evitar crear innecesariamente objetos, 
por lo que se carga exclusivamente el JSON que representa esa nota para modificar aquellos campos que el usuario haya
especificado, siempre y cuando el usuario exista y la nota se encuentre entre las creadas por el usuario.

La modificación de los campos es independiente y no es necesario que se especifiquen todos. Un aspecto que no se plantea
es cambiar el título, ya que para eso podría directamente crear otra nota, el título es crucial para identificarla.

La comprobación de cada campo es casi idéntica al resto de opciones del programa por lo que tampoco se va a ahondar de 
nuevo en este aspecto.

A la hora de actualizar la información se elimina el fichero de la nota que se está modificando para crear uno nuevo 
con el JSON que se ha creado en esta sección.

### Opción de lectura de títulos

De la misma manera que en el comando anterior se evita crear un objeto usuario y un objeto nota siguiendo la misma 
mecánica especificada anteriormente. Entonces, siempre que el usuario exista, se puede imprimir dos tipos de mensaje:

1. Se informa al usuario de que no tiene notas
2. se recorre el array de títulos de notas para crear un objeto JSON con los datos del fichero para imprimir cada título
  con el color que la nota especifica en su atributo ``color``

### Opción de lectura de una nota

Para leer una sola nota espeficiada en la línea de comandos se crea un usuario y se cargan las notas que le corresponden
siguiendo el mismo proceso ya explicado. Nuevamente si el usuario no tiene notas se imprime por pantalla un mensaje 
informativo, que es menos violento que concluir el programa directamente. En el caso de que el usuario sí que tenga 
notas se usa el método ``noteByTitle`` en el condicional comprobando que el objeto devuelto sea una instancia de la
clase ``Note`` para que en caso negativo se termine el programa informando del error de no encontrar una nota con dicho
nombre. En caso afirmativo, en un switch se lee el atributo ``color`` del objeto extraído y así poder llamar al método 
``toString()`` de dicha nota e imprimirla en el color esperado.  

### Opción de eliminación de una nota

Para eliminar una nota sí que se debe crear un objeto User, ya que este es el que hace de interfaz para comprobar que la 
nota que se va a eliminar exista y el que se debe encargar de que la eliminación es correcta (imaginando un escenario 
en el que el método cambie para restringir específicamente que una nota pueda o no ser eliminada, por ejemplo mediante 
un flag). Una vez la eliminación se aplica de manera exitosa en el objeto se refleja en la persistencia de los datos
eliminando el fichero correspondiente en el directorio del usuario indicado en la línea de comandos

## Para la ejecución

En primer lugar es necesario compilar el programa (``npm run build``) por si no existiera el archivo JavaScript a 
ejecutar.

Para continuar se debe ejecutar con node el archivo del programa, es decir, hay que ejecutar 
``node dist/notes.js [opción] [argumentos]`` donde las opciones son:

- new-user
- delete-user
- list-notes
- add-note
- edit-note
- read-note
- delete-note

y cuyos argumentos pueden ser:

- --user="nombre de usuario"
- --title="título de la nota"
- --body="contenido de la nota"
- --color=("red", "blue", "green", "yellow")

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
