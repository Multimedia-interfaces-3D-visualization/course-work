import { useRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isLoggedIn } from '../../store/user/selectors'
import Button from '@material-ui/core/Button'
import '../../App.css'
import styles from './styles'
import useStyles from '../../utils/hooks/useStyles'
import Shevron from '../Shevron/Shevron'

function Main() {
  const classes = useStyles(styles)
  const contentRef = useRef(null)
  const loggedIn = useSelector(isLoggedIn)

  return (
    <div className="App">
      <div className="App-main">
        <img
          src="./dogs.png"
          alt="Math and notebook"
          className={classes.logo}
        />
        <div
          className="App-shevron"
          onClick={() =>
            contentRef.current.scrollIntoView({ behavior: 'smooth' })
          }
        >
          <Shevron />
          <div>Дізнатись більше</div>
        </div>
      </div>
      <div className="App-content" ref={contentRef}>
        <div className="App-content-article">
          <img
            src="./dog1.jfif"
            alt="Math and pen"
            width="500px"
            height="280px"
          />
          <span className="App-article">
            <b className="App-article-letter">Д</b>аний вебсервіс призначений
            для є гарним прикладом рішення задачі класифікації на прикладі
            визначення породи собаки за її фотографією.
          </span>
        </div>
        <div className="App-content-article">
          <div className="App-article-container">
            <span className="App-article">
              <b className="App-article-letter">В</b>икористовуючи алгоритми
              машинного навчання, а також потужний датасет із більш ніж 130
              різними видами породи, нашою командою розроюників була натренована
              нейронна мережа, що дозволяє дізнатися користувачу породу собаки
              із фотографії, а також отримати так звануц "впевненість" мережі у
              своєму виборі - належність до того чи іншого класу у відсотковому
              еквіваленті.
            </span>
            <span className="App-start">Почніть прямо зараз!</span>
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
  )
}

export default Main
