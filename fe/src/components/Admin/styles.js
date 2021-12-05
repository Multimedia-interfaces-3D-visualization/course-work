/**
 * @type { Record<string, React.CSSProperties> }
 */
const styles = {
  logo: {
    display: 'block',
    width: '100%',
    maxHeight: 'calc(100vh - 64px) !important',
  },
  register: {
    color: 'green',
    borderColor: 'green',
    margin: '0 15px',
    '&:hover': {
      borderColor: 'darkgreen',
      backgroundColor: 'rgb(239, 247, 236)',
    },
  },
  calc: {
    marginRight: '15px',
  },
};

export default styles;
