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

const Assistant = () => {
  const dispatchSaga = useDispatch();
  const recordedText = useSelector(selectors.getRecordedText) ?? '';
  const IsStartedWorking = useSelector(selectors.getIsStartedWorking) ?? false;
  const IsCommandPlayed = useSelector(selectors.getIsCommandPlayed) ?? false;
  const IsAudioFinished = useSelector(selectors.getIsAudioFinished) ?? false;
  const Command = useSelector(selectors.getCommand) ?? null;

  const classes = useStyles(styles);
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
    const formData = new FormData();
    formData.append('text_data', data);
    dispatchSaga(actions.setAudioStarted());
    axios
      .post(
        'http://localhost:5000' + '/api/v1/ml/generateAudio/textToSpeech',
        formData,
      )
      .then((response) => {
        document
          .getElementById('audio-hidden')
          .setAttribute('src', 'data:audio/mp3;base64,' + response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    document.getElementById('audio-hidden').addEventListener(
      'ended',
      function ttt() {
        console.log('Audio played');
        dispatchSaga(actions.setAudioFinished());
      },
      false,
    );
  }, []);

  useEffect(() => {
    if (mediaBlobUrl) {
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
              console.log('===== parsed ======');
              console.log(response.data.data);
              console.log('===== parsed ======');
              dispatchSaga(actions.setRecordedText(response.data.data));
              dispatchSaga(actions.setNextCommand());
            })
            .catch((error) => {
              console.error(error);
            });
        });
    }
  }, [mediaBlobUrl]);

  useEffect(() => {
    if (IsAudioFinished && !IsCommandPlayed) {
      if (!Command.skip && !Command.field) {
        dispatchSaga(actions.setNextCommand());
      } else {
        startRecording();
      }
    } else {
      if (IsStartedWorking && !IsCommandPlayed) {
        console.log(Command);
        const txt = Command.text;
        testPlayback(txt);
      }
    }
  }, [IsStartedWorking, IsCommandPlayed, IsAudioFinished]);

  // useEffect(() => {

  // }, [])

  return (
    <div className={classes.assistantContent}>
      <h2 className={classes.assistantTitle}>Мультимедійний асистент</h2>
      {/* <div>
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

        <button
          onClick={() => {
            stopRecording();
          }}
        >
          Stop Recording
        </button>

        <p>Розпізнано: {recordedText}</p>
        <p>Сказано: </p>
        
      </div> */}
      <audio id="audio-hidden" autoPlay="true" hidden={true}></audio>
    </div>
  );
};

export default Assistant;
