import api from 'config/axios'


export const getPaymentRequest = (contractId, transactionId) => {
    const url = `/payment/?ContractID=${contractId}&TransactionID=${transactionId}`;
    return api.get(url);
};