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
    fontSize: '13px',
    width: '200px',

    '&:hover': {
      borderColor: 'darkgreen',
      backgroundColor: 'rgb(239, 247, 236)',
    },
  },
  orderButton: {
    color: 'blueviolet',
    borderColor: 'blueviolet',
    marginTop: '10px',
    marginRight: '10px',
    backgroundColor: 'white',
    width: 'inherit',
    fontSize: '13px',

    '&:hover': {
      borderColor: 'darkblue',
      backgroundColor: '#9c42f024',
    },
  },
  orderButtonDisabled: {
    color: 'blueviolet',
    borderColor: 'blueviolet',
    marginTop: '10px',
    marginRight: '10px',
    backgroundColor: 'white',
    fontSize: '13px',
    width: 'inherit',

    '&:hover': {
      borderColor: 'darkblue',
      backgroundColor: '#9c42f024',
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
};

export default styles;
