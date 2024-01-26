import api from 'config/axios'


export const contractClaimRequest = (contractID, data) => {
    const url = `/Contract/{accountID}/${contractID}/$claim`;
    return api.post(url, data);
};