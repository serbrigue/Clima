Aplicación de Pronóstico del Tiempo

Esta es una aplicación web de pronóstico del tiempo que proporciona información meteorológica actualizada para diferentes ciudades. Utiliza datos de la API de Meteoblue para obtener el pronóstico del tiempo y la API de OpenStreetMap para convertir nombres de ciudades en coordenadas de latitud y longitud.

Características:
Mostrar el pronóstico del tiempo para una ciudad específica.
Filtrar los datos del pronóstico del tiempo por día y hora.
Interfaz de usuario intuitiva con tarjetas informativas para cada día.
Funcionalidad de búsqueda para buscar pronósticos del tiempo por nombre de ciudad.

Tecnologías utilizadas

Backend:
Flask (Python)
Flask-CORS para habilitar el intercambio de recursos entre orígenes (CORS)

Frontend:
React (JavaScript)
Axios para realizar solicitudes HTTP al backend
FontAwesome para iconos

Instalación y Uso:
Clona este repositorio.
En la carpeta del proyecto, instala las dependencias del backend y del frontend ejecutando pip install -r requirements.txt para el backend y npm install para el frontend.
Configura las variables de entorno necesarias:
WEATHER_API_KEY: API key de Meteoblue para acceder a los datos meteorológicos.
GEO_API_KEY: API key de OpenStreetMap para la búsqueda de ubicaciones.
Inicia el servidor backend ejecutando python app.py.
Inicia el servidor frontend ejecutando npm start.
Abre tu navegador web y ve a http://localhost:3000 para acceder a la aplicación.
