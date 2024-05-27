from flask import Flask, jsonify, request, render_template, redirect

app = Flask(__name__)

filmes = []

@app.route('/api/filmes', methods=['GET'])
def get_filmes():
    """
    Lista todos os filmes
    ---
    responses:
      200:
        description: Lista de filmes
    """
    return jsonify(filmes)

@app.route('/api/filmes', methods=['POST'])
def create_filme():
    """
    Cria um novo filme
    ---
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            name:
              type: string
              description: string
    responses:
      201:
        description: Filme criado com sucesso
      400:
        description: Dados inválidos
    """
    novo_filme = request.get_json()  # Use get_json() para dados JSON
    if "name" not in novo_filme or "description" not in novo_filme:
        return jsonify({"error": "Nome e descrição são obrigatórios"}), 400
    filmes.append(novo_filme)
    return jsonify(novo_filme), 201

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)

