

import api from 'config/axios'


export const getAllApplication = (data) => {
    const url = `/insurance-application/get-all/${data.accountID}`;
    console.log(url);
    return api.get(url);
};