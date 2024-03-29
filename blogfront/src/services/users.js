import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll }
