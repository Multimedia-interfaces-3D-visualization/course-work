const isLoggedIn = () => !!localStorage.getItem('userAuthToken')

export default isLoggedIn
