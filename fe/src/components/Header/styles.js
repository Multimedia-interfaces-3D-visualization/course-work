const styles = {
  header: {
    backgroundColor: 'white',
    color: 'black',
    boxShadow: `0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)`,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  title: {
    fontFamily: 'KaTeX_Main, "Times New Roman", serif',
    fontSize: '30px',
    flexGrow: 1,
  },
  link: {
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};

export default styles;
