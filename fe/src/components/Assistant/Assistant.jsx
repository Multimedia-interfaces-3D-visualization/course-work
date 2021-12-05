import { useState, useEffect, useReducer } from 'react';
import useStyles from '../../utils/hooks/useStyles';
import styles from './styles';
import { useReactMediaRecorder } from 'react-media-recorder';
import axios from 'axios';
import hark from './hark';

const initialState = {
  recognizedText: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'newText':
      return {
        ...state,
        recognizedText: action.data,
      };
    default:
      throw new Error();
  }
}

const Assistant = () => {
  const classes = useStyles(styles);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inited, setInited] = useState(false);

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    previewAudioStream,
  } = useReactMediaRecorder({ audio: true, video: false, screen: false });

  useEffect(() => {
    if (previewAudioStream) {
      setInited(true);
      console.log('stbbb');
      const options = { interval: 100 };
      const speechEvents = hark(previewAudioStream, options);
      speechEvents.run();
      speechEvents.on('speaking', function () {
        console.log('speaking');
      });
      speechEvents.on('stopped_speaking', function () {
        console.log('stopped_speaking');
        stopRecording();
      });
      speechEvents.on('volume_change', function (volume, threshold) {});
    }
  }, [previewAudioStream, stopRecording, inited]);

  useEffect(() => {
    if (mediaBlobUrl) {
      console.log('ALAAAAARM');
      fetch(mediaBlobUrl)
        .then((r) => r.blob())
        .then((blob) => {
          if (!blob.type.startsWith('audio')) {
            return;
          }
          const formData = new FormData();
          formData.append('audio', blob);
          axios
            .post(
              'http://localhost:5000' +
                '/api/v1/ml/parseAudio/speechRecognition',
              formData,
            )
            .then((response) => {
              console.log(response.data.data);
              dispatch({ type: 'newText', data: response.data.data });
            })
            .catch((error) => {
              console.error(error);
            });
        });
    }
  }, [mediaBlobUrl]);

  return (
    <div className={classes.assistantContent}>
      <h2 className={classes.assistantTitle}>Мультимедійний асистент</h2>
      <div>
        <p>{status}</p>

        <button
          onClick={() => {
            startRecording();
          }}
        >
          Start Recording
        </button>

        <button
          onClick={() => {
            stopRecording();
          }}
        >
          Stop Recording
        </button>

        {/* <audio src={mediaBlobUrl} controls autoPlay={false} loop={false} /> */}
        <p>Розпізнано: {state.recognizedText}</p>
      </div>
    </div>
  );
};

export default Assistant;
