# CSTI - Culqi API REST TEST
***
## Introducción

El siguiente código responde a lo solicitado en la Prueba Técnica Desarrollador Backend.

## NodeJS

Se utilizó NodeJS en su versión 18.16.0.

## Rutas y Endpoints

### Main API endpoint access:

```
    http://localhost:3000
```

### Rutas de acceso:

```
    POST: '/tokens'
    GET: 'tokens/:id'
```

### Acceso a la base de datos:

El acceso a la base de datos está definido en el archivo de variables de entorno .env en la raíz del proyecto.

### Variables de entorno

El archivo .env, el cual define las variables de entorno, define las siguientes variables globales para un contenedor iniciado con 'docker compose':

```
    PORT=3000 // Puerto de acceso a la API
    MONGO_INITDB_ROOT_USERNAME=root // Usuario de acceso a la base de datos
    MONGO_INITDB_ROOT_PASSWORD=password // Contraseña de acceso a la base de datos
    MONGO_HOST=127.0.0.1:27017 // Host de acceso a la base de datos
```

Los archivos mongo-secrets.yml y backend-secrets.yml, en la raíz del proyecto, nos permitirán configurar las variables de entorno requeridas para el acceso a la base de datos:

```
    MONGO_INITDB_ROOT_USERNAME: root // Usuario de acceso a la base de datos
    MONGO_INITDB_ROOT_PASSWORD: password // Contraseña de acceso a la base de datos
```

## Instalación

Para instalar el proyecto, se debe clonar el repositorio y ejecutar el siguiente comando en la raíz del proyecto:

```
    npm install
```

## Construcción

Para construir la carpeta distribuible, se debe ejecutar el siguiente comando en la raíz del proyecto:

```
    npm run build
```

## Ejecución

Para ejecutar el proyecto, se debe ejecutar el siguiente comando en la raíz del proyecto:

```
    npm start
```

Se debe tener en cuenta tener una base de datos online siguiendo los criterios explicados en la sección de Variables de entorno.

## Ejecución de pruebas unitarias

Para ejecutar las pruebas unitarias, se debe ejecutar el siguiente comando en la raíz del proyecto:

```
    npx jest
```

## Pruebas en Postman

Se incluye el archivo ChallengeAPI.postman_collection.json en la raíz del proyecto, el cual contiene las pruebas y endpoints establecidos y clasificados, con información de muestra realizadas en Postman.

### Uso con Docker Compose

Se podrá iniciar el proyecto, el cual incluye dos contenedores: uno para la base de datos y otro para la API, ejecutando el siguiente comando en la raíz del proyecto:

```
    docker-compose up -d
```

Este comando descargará las imágenes necesarias para la ejecución de los contenedores y los iniciará.

### Uso con Kubernetes

En el presente proyecto se ha utilizado Minikube https://minikube.sigs.k8s.io/docs/start/ para la ejecución de Kubernetes en local.

Para iniciar el proyecto, se debe ejecutar el siguiente comando en la raíz del proyecto:

```
    minikube start
```

Una vez iniciado el servicio de Kubernetes, se deben ejecutar en secuencia los siguientes comandos en la raíz del proyecto:

```
    kubectl apply -f mongo-secrets.yml
    kubectl apply -f mongo-config.yml
    kubectl apply -f mongo.yml

    kubectl apply -f backend-secrets.yml
    kubectl apply -f backend.yml    
```

Finalmente, se debe ejecutar el siguiente comando para obtener la URL de acceso a la API:

```
    minikube service backend-service
```

## Autor
* **Jaime Arturo Pérez Frias** - *Desarrollador Backend*