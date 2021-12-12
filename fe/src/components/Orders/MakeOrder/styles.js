/**
 * @type { Record<string, React.CSSProperties> }
 */
const styles = {
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 'calc(100vh - 230px) !important',
    minHeight: '400px',
  },
  acceptButton: {
    color: 'green',
    borderColor: 'green',
    marginTop: '10px',
    marginRight: '10px',
    backgroundColor: 'white',

    '&:hover': {
      borderColor: 'darkgreen',
      backgroundColor: 'rgb(239, 247, 236)',
    },
  },
  breedPhotoContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  breedPhoto: {
    maxWidth: '150px',
  },
  rejectButton: {
    color: 'red',
    borderColor: 'red',
    marginTop: '10px',
    backgroundColor: 'white',

    '&:hover': {
      borderColor: 'red',
      backgroundColor: 'rgb(250, 220, 256)',
    },
  },
  header: {
    fontSize: '16px',
  },
  message: {
    fontFamily: 'KaTeX_Main',
    fontSize: '30px',
    fontStyle: 'italic',
    textAlign: 'center',
    height: '100%',
  },
  registerContent: {
    backgroundColor: 'whitesmoke',
    maxWidth: '1024px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: 'calc(100% - 128px)',
    paddingBottom: '20px',
  },
  registerTitle: {
    textAlign: 'center',
    fontSize: '35px',
    textShadow: '1px 1px white',
  },
  registerForm: {
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
  lastName: {
    marginBottom: '15px',
    '& .MuiInputBase-root': {
      background: 'white',
    },
  },
  firstName: {
    marginBottom: '15px',
    '& .MuiInputBase-root': {
      background: 'white',
    },
  },
  passwordField: {
    marginBottom: '15px',
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
  login: {
    textTransform: 'none',
    fontSize: '16px',
    '&:hover': {
      background: 'none',
      textDecoration: 'underline',
    },
  },
};

export default styles;
