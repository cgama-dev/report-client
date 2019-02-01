import axios from 'axios'

const api = axios.create({
    baseURL: "https://report-api-slqlkcynfd.now.sh"
})

export default api