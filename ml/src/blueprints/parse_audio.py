import copy
import wave
import os
from os import path
from io import BytesIO
import numpy as np
import speech_recognition
from stt import Model
from flask import Blueprint, request, jsonify
from pydub import AudioSegment
from pydub.silence import detect_silence, detect_nonsilent


MIN_SILENCE_LEN = 300
SILENCE_THRESH = -23
SR = speech_recognition.Recognizer()


def get_audio_segment(data: BytesIO):
    try:
        sound = AudioSegment.from_file(data, codec="opus")
        return sound
    except Exception:
        pass
    try:
        sound = AudioSegment.from_file(data, codec="vorbis")
        return sound
    except Exception:
        pass
    return None

def convert_audio_for_recognition_legacy(audio_pasred: AudioSegment):
    audio_converted = copy.deepcopy(audio_pasred)
    audio_converted_bytes = BytesIO()
    audio_converted.set_frame_rate(16000).set_channels(1).export(audio_converted_bytes, "wav", codec="pcm_s16le")
    audio_converted_bytes.seek(0)
    return audio_converted_bytes

def convert_audio_for_recognition(audio_pasred: AudioSegment):
    audio_converted = copy.deepcopy(audio_pasred)
    audio_converted_bytes = BytesIO()
    audio_converted.export(audio_converted_bytes, "wav", codec="pcm_s16le")
    audio_converted_bytes.seek(0)
    return audio_converted_bytes

def speech_recognition_from_audio(audio_pasred: AudioSegment):
    audio_converted_bytes = convert_audio_for_recognition_legacy(audio_pasred)
    fin = wave.open(audio_converted_bytes, 'rb')
    audio = np.frombuffer(fin.readframes(fin.getnframes()), np.int16)
    fin.close()
    ds = Model(path.join(os.path.dirname(os.path.realpath(__file__)), "./../../data/uk.tflite"))
    result = ds.stt(audio)
    return result


parseAudio = Blueprint('parseAudio', __name__)

@parseAudio.route('/isSilence', methods=['POST'])
def parse_audio_is_silence():
    audio_file = request.files.get('audio')
    start_ms_raw = request.form.get('start_ms', '0')
    end_ms_raw = request.form.get('end_ms', '-1')
    if audio_file is None:
        return jsonify({"err": "Expected audio file"}), 400

    try:
        start_ms = int(start_ms_raw)
        end_ms = int(end_ms_raw)
        if end_ms <= start_ms and end_ms != -1:
            raise Exception("")
        if start_ms < 0:
            raise Exception("")
    except Exception:
        return jsonify({"err": "start/ens ms is invalid, expected int"}), 400
    
    audio_data = BytesIO(audio_file.stream.read())
    audio_pasred = get_audio_segment(audio_data)
    if audio_pasred is None:
        return jsonify({"err": "Couldn't parse audio file"}), 400

    nonsilent_ranges = detect_nonsilent(audio_pasred, min_silence_len=MIN_SILENCE_LEN, silence_thresh=SILENCE_THRESH)

    print("nonsilent_ranges", nonsilent_ranges)

    for nonsilent_range in nonsilent_ranges:
        if nonsilent_range[0] > start_ms and (end_ms == -1 or nonsilent_range[0] < end_ms):
            return jsonify({ "isSilence": False }), 200

    return jsonify({ "isSilence": True }), 200

@parseAudio.route('/speechRecognitionLegacy', methods=['POST'])
def speech_recognition_to_text_handler_legacy():
    audio_file = request.files.get('audio')

    if audio_file is None:
        return jsonify({"err": "Expected audio file"}), 400
    
    audio_data = BytesIO(audio_file.stream.read())
    audio_pasred = get_audio_segment(audio_data)
    if audio_pasred is None:
        return jsonify({"err": "Couldn't parse audio file"}), 400

    results = speech_recognition_from_audio(audio_pasred)

    print(results)
    return jsonify({ "data": results }), 200

@parseAudio.route('/speechRecognition', methods=['POST'])
def speech_recognition_to_text_handler():
    audio_file = request.files.get('audio')

    if audio_file is None:
        return jsonify({"err": "Expected audio file"}), 400
    
    audio_data = BytesIO(audio_file.stream.read())
    audio_pasred = get_audio_segment(audio_data)
    if audio_pasred is None:
        return jsonify({"err": "Couldn't parse audio file"}), 400

    audio_converted = convert_audio_for_recognition(audio_pasred)
    audio_bytes = speech_recognition.AudioFile(audio_converted)
    with audio_bytes as source:
        # SR.adjust_for_ambient_noise(source)
        audio = SR.record(source)
        try:
            text = SR.recognize_google(audio, language="uk-UA", show_all=False)
        except Exception as e:
            return jsonify({ "data": "" }), 200

    print(text)
    return jsonify({ "data": text }), 200
