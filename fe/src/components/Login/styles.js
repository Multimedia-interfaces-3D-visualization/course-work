const styles = {
  loginContent: {
    backgroundColor: 'whitesmoke',
    maxWidth: '1024px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: 'calc(100% - 128px)',
  },
  loginTitle: {
    textAlign: 'center',
    fontSize: '35px',
    textShadow: '1px 1px white',
  },
  loginForm: {
    width: '500px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  emailField: {
    marginBottom: '15px',
    '& .MuiInputBase-root': {
      background: 'white',
    },
  },
  passwordField: {
    marginBottom: '5px',
    '& .MuiInputBase-root': {
      background: 'white',
    },
  },
  submit: {
    width: '200px',
    height: '50px',
    background: 'white',
  },
  checkbox: {
    alignSelf: 'start',
    marginBottom: '10px',
  },
  alert: {
    marginTop: '5px',
    width: '500px',
  },
  actions: {
    width: '500px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  register: {
    textTransform: 'none',
    fontSize: '16px',
    '&:hover': {
      background: 'none',
      textDecoration: 'underline',
    },
  },
};

export default styles;
