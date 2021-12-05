import * as React from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import styles from './styles';
import useStyles from '../../../utils/hooks/useStyles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 7.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

export default function ManySelect({ label, list, selected, setSelected }) {
  const classes = useStyles(styles);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelected(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div className={classes.select}>
      <FormControl className={classes.selectForm} sx={{ m: 1, width: 300 }}>
        <InputLabel
          id="demo-multiple-checkbox-label"
          className={classes.inputLabel}
        >
          {label}
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selected}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(select) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {select.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {list.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selected.indexOf(name) > -1} />
              <ListItemText
                primary={name}
                style={{ 'white-space': 'break-spaces' }}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
