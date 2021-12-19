const styles = {
  formContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  OwlAssistant: {
    position: 'fixed',
    top: '45px',
    right: '0',
    'z-index': '999999',
  },
  VoiceButton: {
    position: 'fixed',
    bottom: '40px',
    right: '20px',
    'z-index': '999999',
  },
  filters: {
    minWidth: '350px',
    maxWidth: '420px',
  },
  name: {
    maxWidth: '400px',
    padding: '10px',
    '& .MuiInputBase-root': {
      background: 'white',
    },
  },
  select: {
    margin: '10px',
  },
  selectForm: {
    minWidth: '300px',
    maxWidth: '420px',
  },
  inputLabel: {
    paddingLeft: '10px',
  },
  slider: {
    margin: '10px',
    marginTop: '45px',
    width: '300px',
  },
  nothing: {
    fontSize: '25px',
    fontStyle: 'italic',
    textAlign: 'center',
    width: '100%',
  },
  submit: {
    width: '100%',
    marginTop: '5px',
    height: '50px',
    background: 'white',
  },
  formSwitcher: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '16px',
    lineHeight: '1.2',
    textAlign: 'center',
  },
  formVariant: {
    margin: '20px 0',
    padding: '10px 20px',
    flex: '50%',
    background: 'rgba(220, 220, 220, .5)',
    cursor: 'pointer',

    '&:first-child': {
      borderRadius: '20px 0 0 20px',
    },
    '&:last-child': {
      borderRadius: '0 20px 20px 0',
    },
  },
  active: {
    background: 'rgba(220, 220, 220, 1)',
  },
};

export default styles;
