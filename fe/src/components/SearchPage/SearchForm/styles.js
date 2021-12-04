const styles = {
  formContainer: {
    width: '100%',
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
}

export default styles
