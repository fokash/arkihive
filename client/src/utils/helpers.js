import axios from 'axios';
import apiURL from '../config/environment';

function getData(section) {
    return axios.get(apiURL() + section);
}

function postData(section, requestObject) {
    return axios.post(apiURL() + section, requestObject);
}

let helpers = {
    callService(section, httpType, requestObject) {
        if (httpType === 'get') {
            return axios.all([getData(section)])
                .then((arr) => {
                    return {
                        section: arr[0]
                    };
            });
        }
        else if (httpType === 'post') {
            return axios.all([postData(section, requestObject)])
                .then((arr) => {
                    return {
                        section: arr[0]
                    };
            });
        }
    }
};

export default helpers;