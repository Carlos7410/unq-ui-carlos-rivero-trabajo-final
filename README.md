# unq-ui-carlos-rivero-trabajo-final
# Trabajo Integrador Final

Juego de batalla naval

- Descarga e instalación del proyecto
~ En Linux 
Antes que nada para poder correr el proyecto se debe tener en el equipo el entorno de Node y más precisamente una versión específica de este. 
Para ello se recomienda la instalación de Node Version Manager que permite la instalación de diversas versiones de Node y poder cambiar entre
ellas con facilidad.
Para su instalación en Linux se debe seguir las intrucciones de instalación de la página correspondiente a Node Version Manager(nvm)
https://github.com/nvm-sh/nvm

Un breve resumen de los pasos para realizar la instalación en Linux sería:
-En terminal utilizar el siguiente comando
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

-Para verificar que la instalación se realizo correctamente se utiliza 
~ command -v nvm
Lo cual devuelve el mensaje de 'nvm' en caso de haberse instalado sin problemas, en caso contrario se debe intentar cerrar la terminal y abrirla nuevamente para volver a intentarlo. En caso contrario debería consultar la página de nvm.

-Lo siguiente será instalar la versión de node utilizada para el proyecto con el siguiente comando
~ nvm install 18.16.1

Con el comando (node -v) puede verificar cual es la versión de node que se esta utilizando en el equipo, de todas formas, se puede comenzar a usar dicha versión con el comando (nvm use 18.16.1)

Por otra parte se debe descargar el zip del proyecto desde el siguiente link
https://github.com/Carlos7410/unq-ui-carlos-rivero-trabajo-final

Ya con Node instalado, el proyecto descargado y extraído en la ubicación deseada se debe proceder a abrir una terminal en la ubicación del proyecto
y ejecutar el siguiente comando para instalar las dependencias

npm install

------------------
~ En Windows

La instalación en Windows, SO donde se desarrolló el proyecto, se realiza de una manera similar hacía el final de la instalación, pero lo necesario para realizar la instalación del nvm se encuentra en el siguiente link:
https://github.com/coreybutler/nvm-windows

En dicha página será dirigido a descargar el ejecutable de la última versión de nvm que se encuentra entre los releases, el cual se instala como cualquier otro programa
https://github.com/coreybutler/nvm-windows/releases

Tras finalizar, se hace uso de la herramienta Windows PowerShell para la instalación de la versión de Node a utilizar.
En dicha terminal se procede a usar el comando siguiente para instalar la versión de Node necesaria para el proyecto

nvm install 18.16.1

Para asegurarse que se utiliza la versión correcta, el siguiente comando
nvm use 18.16.1

Como en Linux, usando la terminal se debe mover a la carpeta del proyecto y usar el siguiente comando para instalar las dependencias
npm install

- Ejecutar localmente el proyecto

Tras finalizar la instalación de las dependencias y estando todavía en la carpeta del proyecto, se lo puede ejecutar con el siguiente comando (en Windows desde Windows Powershell) lo cual devolverá una dirección a usar en un navegador web para acceder al juego de batalla naval del proyecto

npm run dev
La terminal PowerShell de Windows o la de Linux, dará un link para pegar en el navegador y visualizar el juego

Para finalizar la ejecución, se debe usar la terminal presionando 'q' seguido de 'Enter'
