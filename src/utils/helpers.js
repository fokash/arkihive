import axios from 'axios';
import apiURL from '../config/environment';

function getData(section) {
    return axios.get(apiURL() + section);
}

let helpers = {
    getAllData(section) {
        return axios.all([getData(section)])
            .then((arr) => {
               return {
                   section: arr[0]
               };
            });
    }
};

export default helpers;