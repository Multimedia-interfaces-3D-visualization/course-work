import { useState, useEffect, useReducer } from 'react';
import useStyles from '../../utils/hooks/useStyles';
import styles from './styles';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import hark from './hark';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import Owl from './Owl';
import { actions, selectors } from '../../store/assistant';

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
  const dispatchSaga = useDispatch();
  const recordedText = useSelector(selectors.getRecordedText) ?? '';
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

  const testPlayback = (data) => {
    console.log('BBFBFBFBFBFB');
    const formData = new FormData();
    formData.append(
      'text_data',
      'Привіт від голосового асистента! Ви сказали фразу: ' + data,
    );
    axios
      .post(
        'http://localhost:5000' + '/api/v1/ml/generateAudio/textToSpeech',
        formData,
      )
      .then((response) => {
        console.log(response.data.data);
        document
          .getElementById('audio-hidden')
          .setAttribute('src', 'data:audio/mp3;base64,' + response.data.data);
        document.getElementById('audio-hidden').play();
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
              dispatchSaga(actions.setRecordedText(response.data.data));

              // dispatch({ type: 'newText', data: response.data.data });
              // testPlayback(response.data.data);
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
        <Canvas style={{ width: '800px', height: '500px' }}>
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <directionalLight intensity={0.4} />
          <Suspense fallback={null}>
            <Owl position={[0, -1.5, 1.4]} rotation={[-0.01, -0.4, 0.0]} />
            <Environment preset={'lobby'} />
          </Suspense>
        </Canvas>

        <p>Статус: {status}</p>

        <button
          onClick={() => {
            startRecording();
          }}
        >
          Start
        </button>

        {/* <button
          onClick={() => {
            stopRecording();
          }}
        >
          Stop Recording
        </button> */}

        <p>Розпізнано: {recordedText}</p>
        <p>Сказано: </p>

        <audio id="audio-hidden" autoPlay="true" hidden={true}></audio>
      </div>
    </div>
  );
};

export default Assistant;
