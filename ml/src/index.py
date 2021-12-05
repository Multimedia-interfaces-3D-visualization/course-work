import os
from flask import Flask, jsonify
from dotenv import load_dotenv, find_dotenv
from waitress import serve
from blueprints.parse_audio import parseAudio
from blueprints.generate_audio import generateAudio


load_dotenv(find_dotenv())


PORT = int(os.getenv("PORT", "6000"))
DEBUG = bool(os.getenv("DEBUG", "true"))


app = Flask(__name__, static_url_path='')

app.register_blueprint(parseAudio, url_prefix='/parseAudio')
app.register_blueprint(generateAudio, url_prefix='/generateAudio')

@app.route('/')
def serve_static_index():
    return jsonify({"info": "test"}), 200


if __name__ == '__main__':
    if DEBUG:
        app.run(debug=True, host='0.0.0.0', port=PORT)
    else:
        serve(app, host='0.0.0.0', port=PORT)
