import * as React from 'react';
import Fab from '@material-ui/core/Fab';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';

export default function VoiceButton() {
  return (
    <Fab size="small" color="primary" aria-label="add">
      <KeyboardVoiceIcon sx={{ mr: 1 }} />
    </Fab>
  );
}
