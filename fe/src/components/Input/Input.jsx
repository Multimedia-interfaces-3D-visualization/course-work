import TextField from '@material-ui/core/TextField';
import { useCallback } from 'react';
import useStyles from '../../utils/hooks/useStyles';
import styles from './styles';

const Input = ({
  label,
  value,
  handleChange,
  defaultValue,
  step,
  error,
  ...props
}) => {
  const classes = useStyles(styles);

  const onChange = useCallback(
    (e) => {
      if (handleChange) {
        handleChange(e?.target?.value);
      }
    },
    [handleChange],
  );

  return (
    <>
      <div className={classes.label}>{label}</div>
      <TextField
        className={classes.input}
        id="outlined-number"
        type="number"
        //value={value}
        onChange={onChange}
        width="100px"
        error={!!error}
        helperText={error}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: step || 0.01,
          defaultValue: defaultValue || 0,
          ...props,
        }}
      />
    </>
  );
};

export default Input;
