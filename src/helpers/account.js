async function requestAccount() {
    return await window.ethereum.request({ method: 'eth_requestAccounts' });
}

export default requestAccount;
