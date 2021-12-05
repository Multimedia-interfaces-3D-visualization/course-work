import * as React from 'react';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import styles from './styles';
import useStyles from '../../../utils/hooks/useStyles';

export default function RangeSlider({ min, max, label, value, setValue }) {
  const classes = useStyles(styles);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.slider}>
      <Slider
        getAriaLabel={() => label}
        value={value}
        min={min}
        max={max}
        defaultValue={[min, max]}
        onChange={handleChange}
        valueLabelDisplay="on"
        getAriaValueText={(value) => `${value} рік`}
      />
    </Box>
  );
}
