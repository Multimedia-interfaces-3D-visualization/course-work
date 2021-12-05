from gtts import gTTS
import base64
from io import BytesIO
from flask import Blueprint, request, jsonify


generateAudio = Blueprint('generateAudio', __name__)


@generateAudio.route('/textToSpeech', methods=['POST'])
def generate_text_to_speech():
    if request.json is None:
         return jsonify({"err": "Expected json"}), 400
    if "text_data" not in request.json:
        return jsonify({"err": "Expected text_data in json"}), 400
    text_data = request.json['text_data']
    if not isinstance(text_data, str):
        return jsonify({"err": "Expected text_data in json as string"}), 400
    tts = gTTS(text_data, lang='uk')
    mp3_fp = BytesIO()
    tts.save("test.mp3")
    tts.write_to_fp(mp3_fp)
    mp3_fp.seek(0)
    b64 = base64.b64encode(mp3_fp.read())
    print(b64)
    return jsonify({ "data": b64.decode() }), 200
    