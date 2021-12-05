const styles = {
  wrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  container: {
    position: 'relative',
    width: '100%',
    height: 'calc(1.1876em + 39px)',
    padding: '18.5px 14px',
    paddingLeft: '46px',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: '4px',
    animationDuration: '10ms',
    cursor: 'pointer',
    boxSizing: 'border-box',

    '&:hover': {
      border: '1px solid rgba(0, 0, 0, 0.87)',
    },
  },
  containerError: {
    borderColor: '#f44336',

    '&:hover': {
      borderColor: '#f44336',
    },
  },
  input: {
    display: 'none',
  },
  placeholder: {
    display: 'block',
    fontSize: '16px',
    color: 'rgba(0, 0, 0, 0.5)',
  },
  label: {
    position: 'absolute',
    top: '0',
    left: '0',
    padding: '0 5px',
    background: 'rgb(250, 250, 250)',
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: '12px',
    transform: 'translate(8px, -50%)',
  },
  labelError: {
    color: '#f44336',
  },
  icon: {
    position: 'absolute',
    top: '14px',
    left: '12px',
  },
  error: {
    margin: '3px 14px 0',
    fontSize: '12px',
    color: '#f44336',
  },
};

export default styles;
