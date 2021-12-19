const styles = {
  assistantContent: {
    backgroundColor: 'whitesmoke',
    maxWidth: '1024px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: 'calc(100% - 128px)',
    paddingBottom: '20px',
  },
  assistantTitle: {
    textAlign: 'center',
    fontSize: '35px',
    textShadow: '1px 1px white',
  },
  owlBoxDrawer: {
    width: '300px !important',
    height: '300px !important',
  },
  '@media (min-width:1900px)': {
    owlBoxDrawer: {
      width: '450px !important',
      height: '450px !important',
      // marginRight: '-50px',
      marginTop: '245px',
    }
  }
};

export default styles;
