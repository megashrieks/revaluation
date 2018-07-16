import getToken from './getToken';
import axios from 'axios';
export default (source) => {
    return axios.get('/api/auth/check_auth', {}, {
        cancelToken: source.token
    })
}