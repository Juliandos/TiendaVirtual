import json
# import 

postman_export_file = "assets/API_Almacenamiento.postman_collection.json"

with open(postman_export_file, 'r') as file:
    postman_data = json.load(file)

for request in postman_data['item']:
    nombre = request['name']


    # Accede a la URL cruda
    # url_raw = data
    # metodo = request['item']['name']


    print(nombre)
