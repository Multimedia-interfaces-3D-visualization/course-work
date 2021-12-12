import { useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '../../store/user/selectors';
import Button from '@material-ui/core/Button';
import '../../App.css';
import styles from './styles';
import useStyles from '../../utils/hooks/useStyles';
import Shevron from '../Shevron/Shevron';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import Owl from './../Assistant/Owl';

function Main() {
  const classes = useStyles(styles);
  const contentRef = useRef(null);
  const loggedIn = useSelector(isLoggedIn);

  return (
    <div className="App">
      <div className="App-main">
        <Canvas style={{ width: '100%', height: 'calc(100vh - 64px)' }}>
          <OrbitControls autoRotate={true} autoRotateSpeed={5} />
          <ambientLight intensity={0.5} />
          <directionalLight intensity={0.4} />
          <Suspense fallback={null}>
            <Owl
              animation={'idle'}
              position={[0, -1.5, 1.4]}
              rotation={[-0.01, -0.4, 0.0]}
            />
            <Environment preset={'lobby'} background={true} />
          </Suspense>
        </Canvas>
        <div
          className="App-shevron"
          onClick={() =>
            contentRef.current.scrollIntoView({ behavior: 'smooth' })
          }
        >
          <Shevron />
          <div
            style={{
              textShadow:
                '1px 1px 5px #fff, -1px -1px 5px #fff, 1px -1px 5px #fff, -1px 1px 5px #fff',
            }}
          >
            Дізнатись більше
          </div>
        </div>
      </div>
      <div className="App-content" ref={contentRef}>
        <div className="App-content-article">
          <img src="/owl.png" alt="Math and pen" width="500px" height="280px" />
          <span style={{ paddingLeft: '0' }} className="App-article">
            <b className="App-article-letter">Д</b>аний вебсервіс є реалізацією
            інтерактивної системи пошуку книг у бібліотеці з використанням
            мультимедійного помічника та голосового асистента.
          </span>
        </div>
        <div className="App-content-article">
          <div className="App-article-container">
            <span className="App-article">
              <b className="App-article-letter">Р</b>озробка призначена для
              спрощення пошуку та замовлення обраної книги для відвідувачів
              бібліотек і книгарень. Голосовий асистент надає змогу взаємодіяти
              з системою дуже швидко, що є особливо актуальним для літніх людей,
              яким зазвичай незручно використовувати клавіатуру. А
              мультимедійний помічник зробить цей процес більш інтерактивним, що
              може стати фактором популяризації читання книг серед дітей.
            </span>
            <span style={{ marginTop: '22px' }} className="App-start">
              Почніть прямо зараз!
            </span>
            <div className="App-actions">
              <Button
                variant="outlined"
                color="primary"
                component={RouterLink}
                to="/search-page"
                className={classes.calc}
              >
                Перейти до пошуку
              </Button>
              {loggedIn ? null : (
                <>
                  <Button variant="outlined" component={RouterLink} to="/login">
                    Увійти
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.register}
                    component={RouterLink}
                    to="/register"
                  >
                    Зареєструватися
                  </Button>
                </>
              )}
            </div>
          </div>
          {/* <img src="/Sextic_Graph.340.png" alt="Math and pen" /> */}
        </div>
      </div>
    </div>
  );
}

export default Main;
