import Web3 from 'web3';

/*
* 1. Check for injected web3 (mist/metamask)
* 2. If metamask/mist create a new web3 instance and pass on result
* 3. Get networkId - Now we can check the user is connected to the right
* network to use our dApp
* 4. Get user account from metamask
* 5. Get user balance
*/
ethereum.autoRefreshOnNetworkChange = false;

const getWeb3 = async function() {
  // Check for injected web3 (mist/metamask)
  const web3js = window.ethereum;
  if (typeof web3js !== 'undefined') {
    const web3 = new Web3(web3js);
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    console.log(accounts);
    const networkId = await new Promise((resolve, reject) => {
      web3.version.getNetwork((err, networkId) => {
        if (err) {
          console.log('Error when get network id', err);
          reject(err);
        } else {
          resolve(networkId);
        }
      });
    });
    const coinbase = await new Promise((resolve, reject) => {
      web3.eth.getCoinbase((err, coinbase) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(coinbase);
        }
      });
    });
    const balance = await new Promise((resolve, reject) => {
      web3.eth.getBalance(coinbase, (err, balance) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(balance);
        }
      });
    });
    return {
      injectedWeb3: web3.isConnected(),
      web3() {
        return web3;
      },
      networkId,
      coinbase,
      balance,
    };
  } else {
    // web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')) GANACHE FALLBACK
    alert('No wallet installed, consider install metamask in your browser');
    throw Error('Unable to connect to Metamask');
  }
};

export default getWeb3;
