from flask import Flask, request, jsonify

app = Flask(__name__)

# Lista de tareas
tasks = [{'nombre': 'Aprender a crear APIs'}, {'nombre': 'Aprender más de Python'}]

@app.route('/', methods=['GET'])
def index():
    return jsonify({'mensaje': 'Hola, mundo'})

# Ruta para obtener todas las tareas
@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

# Ruta para agregar una nueva tarea
@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    task = data.get('task')

    if task:
        tasks.append(task)
        return jsonify({'message': 'Tarea agregada correctamente'})
    else:
        return jsonify({'error': 'La tarea no puede estar vacía'}), 400

if __name__ == '__main__':
    app.run()
