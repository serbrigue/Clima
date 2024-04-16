from flask import Flask, jsonify
from flask_cors import CORS
from functions import *


app = Flask(__name__)
CORS(app)


#definimos las ruta

# Todos los datos de la api
@app.route("/api/<lat>/<lon>")
def datos(lat, lon):
    datos_api = obtener_datos_api(lat, lon)
    return datos_api

#Datos del clima filtrados por dia    
@app.route("/datos/<lat>/<lon>/")
def datos_dia(lat, lon):
    datos_por_dia = separar_datos(lat,lon,"temperature_instant", "temperature_max", "temperature_min", "precipitation")
    return jsonify(datos_por_dia)

@app.route("/buscador/<nombre>/")
def buscador(nombre):
    lat, lon = localizacion(nombre)
    return jsonify({"lat": lat, "lon": lon})

#Datos principales día
@app.route("/days/<lat>/<lon>/")
def datos_dia_route(lat,lon):
    data = days(lat, lon, "temperature_instant", "temperature_max", "temperature_min", "precipitation")
    return jsonify(data)






    


