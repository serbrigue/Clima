import os
import requests
from dotenv import load_dotenv


load_dotenv()

#Funcion que obtiene los datos de la api meteoblue
#Como esta api funciona mediante coordenadas cambiar según lo necesario

def obtener_datos_api(lat, lon):
    #Cambiar la api key en el archivo .env
    Api = os.getenv('WEATHER_API_KEY')
    url = f"https://my.meteoblue.com/packages/basic-6h_basic-day?apikey={Api}&lat={lat}&lon={lon}&asl=1&format=json"
    print(url)
    
    #Realizamos la peticion a la api
    try:
        response = requests.get(url)
        print(response.status_code)
    
        #Validamos la respuesta
        if response.status_code == 200:

            #Obtenemos los datos de la api
            datos_api = response.json()
            return datos_api
    #Manejamos los errores

        else:

            return {"error": "Error al obtener los datos de la API"}
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}
    

# Esta funcion es la encargada de filtrar la informacion por día, utilizar los argumentos tipos_datos para filtrar los datos que se desean obtener
# Ejemplo de uso: separar_datos(lat, lon, 'temperature_instant', 'temperature_max', 'temperature_min', 'precipitation')
# Este ejemplo entregará la informacion de la temperatura y precipitacion, si se necesitan más datos revisar la api y agregar el parametro.     
def separar_datos(lat, lon, *tipos_dato):
    try:
        #Obtenemos los datos del clima mediante la api
        datos_respuesta = obtener_datos_api(lat, lon)

        #Separamos los datos por fecha y hora
        datos_clima = datos_respuesta['data_6h']
        fechas = datos_clima['time']

        #Iniciamos los diccionarios para guardar los datos
        fechas_por_dia = {}


        #Separamos los datos por dia y hora
        for i, fecha in enumerate(fechas):
            dia, hora = fecha.split(" ")

            #Si el diccionario de esa fecha no existe, es creado
            if dia not in fechas_por_dia:
                fechas_por_dia[dia] = {}
            
            #Filtramos los datos por hora
            for tipo_dato in tipos_dato:
                datos_tipo = datos_clima[tipo_dato]
                if hora not in fechas_por_dia[dia]:
                    fechas_por_dia[dia][hora] = {}
                fechas_por_dia[dia][hora][tipo_dato] = datos_tipo[i]
        return fechas_por_dia
    
    #Manejamos los errores
    except Exception as e:
        print(f"Ocurrió un error: {e}")
        return None


# Esta funcion es la encargada de procesar la lat y lon para entregar el nombre de la ciudad.
# Utiliza la api openstreetmap para obtener la informacion de la localizacion.
def localizacion(ciudad):
    api_key = os.getenv("GEO_API_KEY")
    print(api_key)
    url_base = f"http://api.openweathermap.org/geo/1.0/direct?q={ciudad}&appid={api_key}"
    print(url_base)
    
    print("OK!")
    
    # Realizar la solicitud GET a la API de Nominatim
    try:
        respuesta = requests.get(url_base)
        print(respuesta.status_code)
        if respuesta.status_code == 200:
            lat=respuesta.json()[0]['lat']
            lon=respuesta.json()[0]['lon']

            return lat,lon
    except requests.exceptions.RequestException as e:
        print(f"Ocurrio un error: {e}")
        return None


def days(lat, lon, *tipos_dato):
    try:
        #Obtenemos los datos del clima mediante la api
        datos_respuesta = obtener_datos_api(lat, lon)
        #Separamos los datos por fecha y hora
        datos_clima = datos_respuesta['data_day']
        fechas = datos_clima['time']

        #Iniciamos los diccionarios para guardar los datos
        fechas_por_dia = {}

        for i, dias in enumerate(fechas):
            if dias not in fechas_por_dia:
                fechas_por_dia[dias]={}

            for tipo_dato in tipos_dato:
                datos_dia = datos_clima[tipo_dato]
                fechas_por_dia[dias][tipo_dato] = datos_dia[i]
                
        return fechas_por_dia
        
    except Exception as e:
        return "Error al obtener los datos de la API"
    

        

localizacion("Santiago")