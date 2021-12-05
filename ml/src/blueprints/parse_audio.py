from io import BytesIO
from flask import Blueprint, request, jsonify
from pydub import AudioSegment, audio_segment
from pydub.silence import detect_silence, detect_nonsilent


MIN_SILENCE_LEN = 300
SILENCE_THRESH = -23

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
    audio_pared = get_audio_segment(audio_data)
    if audio_pared is None:
        return jsonify({"err": "Couldn't parse audio file"}), 400

    nonsilent_ranges = detect_nonsilent(audio_pared, min_silence_len=MIN_SILENCE_LEN, silence_thresh=SILENCE_THRESH)

    print("nonsilent_ranges", nonsilent_ranges)

    for nonsilent_range in nonsilent_ranges:
        if nonsilent_range[0] > start_ms and (end_ms == -1 or nonsilent_range[0] < end_ms):
            return jsonify({ "isSilence": False }), 200

    return jsonify({ "isSilence": True }), 200
