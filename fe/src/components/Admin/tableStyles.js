/**
 * @type { Record<string, React.CSSProperties> }
 */
const styles = {
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 'calc(100vh - 300px) !important',
    minHeight: '400px',
  },
  acceptButton: {
    color: 'green',
    borderColor: 'green',
    marginTop: '10px',
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
      borderColor: 'darkgreen',
      backgroundColor: 'rgb(239, 247, 236)',
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
};

export default styles;
