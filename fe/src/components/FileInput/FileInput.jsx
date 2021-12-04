import formStyles from './styles'
import useStyles from '../../utils/hooks/useStyles'
import ImageSearch from '@material-ui/icons/ImageSearch'
import { useCallback, useState } from 'react'

function FileInput(props) {
  const classes = useStyles(formStyles)
  const [value, setValue] = useState('')

  const onChange = useCallback(
    (event) => {
      setValue(event.target.value)
      props.onChange(event)
    },
    [props],
  )

  return (
    <div className={classes.wrapper}>
      <label
        className={`${classes.container} ${props.className} ${
          props.error ? classes.containerError : ''
        }`}
      >
        <input
          id={props.id}
          name={props.name}
          type="file"
          className={classes.input}
          onChange={onChange}
          value={props.value}
        />
        <ImageSearch className={classes.icon} />
        <span className={classes.placeholder}>
          {value || props.placeholder}
        </span>
        <span
          className={`${classes.label} ${
            props.error ? classes.labelError : ''
          }`}
        >
          {props.label}
        </span>
      </label>
      {props.error && <div className={classes.error}> {props.helperText} </div>}
    </div>
  )
}

export default FileInput
