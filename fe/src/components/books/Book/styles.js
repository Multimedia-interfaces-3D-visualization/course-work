const styles = {
  content: {
    backgroundColor: 'whitesmoke',
    maxWidth: '1024px',
    margin: '0 auto',
    display: 'flex',
    minHeight: 'calc(100% - 128px)',
    fontSize: '19px',
    padding: '0 50px',
  },
  accountPhoto: {
    height: '250px',
    width: '250px',
  },
  userData: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '30px',
    padding: '20px',
  },
  leftside: {
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    display: 'flex',
  },
  fieldLabel: {
    display: 'flex',
    '&::after': {
      content: '":"',
      display: 'block',
      height: '10px',
    },
    marginRight: '5px',
    fontStyle: 'italic',
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
};

export default styles;
