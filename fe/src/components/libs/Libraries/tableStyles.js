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
  header: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButton: {
    color: 'green',
    borderColor: 'green',
    margin: '5px',
    backgroundColor: 'white',
    maxHeight: '50px',

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
  message: {
    fontFamily: 'KaTeX_Main',
    fontSize: '30px',
    fontStyle: 'italic',
    textAlign: 'center',
    height: '100%',
  },
};

export default styles;
