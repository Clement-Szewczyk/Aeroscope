from flask import Flask, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS  # Ajout de CORS
import csv

app = Flask(__name__)
CORS(app)  # Active CORS pour toutes les routes

api = Api(app)

def find_aircraft(icao24):
    try:
        csv.field_size_limit(10 * 1024 * 1024)
        with open('./data/aircraft25_2.csv', 'r', encoding='utf-8') as file:
            reader = csv.reader(file, skipinitialspace=True)
            next(reader, None)  # Ignorer l'en-tête si présent
            for row in reader:
                if row and len(row) > 1:
                    row = [field if field.strip() else None for field in row]
                    if row[0] == "'" + icao24 + "'":
                        return row
    except FileNotFoundError:
        return None
    except (IndexError, csv.Error):
        return None
    return None

class AircraftResource(Resource):
    def get(self, icao24):
        result = find_aircraft(icao24)
        if result:
            return jsonify({"status": "success", "data": result})
        else:
            return jsonify({"status": "error", "message": "Aucun avion trouvé avec cet identifiant ICAO24."})

api.add_resource(AircraftResource, '/aircraft/<string:icao24>')

if __name__ == '__main__':
    app.run(debug=True)
