const base = `http://localhost:5000/api/v1`

const apiUrls = {
  login: `${base}/auth/login`,
  register: `${base}/auth/register`,
  reports: `${base}/reports`,
  breeds: `${base}/ml/serving/breeds/preview`,
  users: `${base}/user/all`,
  libs: `${base}/library/all`,
}

export default apiUrls
