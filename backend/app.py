from flask import Flask, request, jsonify
from model_loader import model
from sklearn.decomposition import PCA
import numpy as np

app = Flask(__name__)

@app.route('/vector', methods=['GET'])
def get_vectors():
    words = request.args.getlist('word')
    vectors = []
    for word in words:
        try:
            vec = model[word]
            vectors.append(vec)
        except KeyError:
            return jsonify({"error": f"'{word}' not found in vocabulary"}), 400

    pca = PCA(n_components=3)
    reduced = pca.fit_transform(np.array(vectors))
    distances = np.linalg.norm(reduced[0] - reduced[1]) if len(reduced) == 2 else None
    return jsonify({
        "vectors": {w: reduced[i].tolist() for i, w in enumerate(words)},
        "distance": distances
    })

if __name__ == "__main__":
    app.run(debug=True)
