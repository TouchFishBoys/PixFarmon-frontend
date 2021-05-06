import Web3 from 'web3'
const { promisify } = require('util')

/*
* 1. Check for injected web3 (mist/metamask)
* 2. If metamask/mist create a new web3 instance and pass on result
* 3. Get networkId - Now we can check the user is connected to the right network to use our dApp
* 4. Get user account from metamask
* 5. Get user balance
*/
ethereum.autoRefreshOnNetworkChange = false

let getWeb3 = async function () {
  // Check for injected web3 (mist/metamask)
  var web3js = window.ethereum
  if (typeof web3js !== 'undefined') {
    var web3 = new Web3(web3js)
    let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    console.log(accounts)
    let networkId = await new Promise((resolve, reject) => {
      web3.version.getNetwork((err, networkId) => {
        if (err) {
          console.log("Error when get network id", err)
          reject(err)
        } else {
          resolve(networkId)
        }
      })
    })
    let coinbase = await new Promise((resolve, reject) => {
      web3.eth.getCoinbase((err, coinbase) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          resolve(coinbase)
        }
      })
    })
    let balance = await new Promise((resolve, reject) => {
      web3.eth.getBalance(coinbase, (err, balance) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          resolve(balance)
        }
      })
    })
    return {
      injectedWeb3: web3.isConnected(),
      web3() {
        return web3
      },
      networkId,
      coinbase,
      balance
    }
  } else {
    // web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')) GANACHE FALLBACK
    alert("Looks like no wallet installed, consider install metamask in your browser")
    throw Error('Unable to connect to Metamask')
  }
}
/*
  .then(result => {
    return new Promise(function (resolve, reject) {
      // Retrieve network ID
      result.web3().version.getNetwork((err, networkId) => {
        if (err) {
          // If we can't find a networkId keep result the same and reject the promise
          console.log(err)
          reject(new Error('Unable to retrieve network ID'))
        } else {
          // Assign the networkId property to our result and resolve promise
          result = Object.assign({}, result, { networkId })
          resolve(result)
        }
      })
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      // Retrieve coinbase
      result.web3().eth.getCoinbase((err, coinbase) => {
        if (err) {
          reject(new Error('Unable to retrieve coinbase'))
        } else {
          result = Object.assign({}, result, { coinbase })
          resolve(result)
        }
      })
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      // Retrieve balance for coinbase
      result.web3().eth.getBalance(result.coinbase, (err, balance) => {
        if (err) {
          reject(new Error('Unable to retrieve balance for address: ' + result.coinbase))
        } else {
          result = Object.assign({}, result, { balance })
          resolve(result)
        }
      })
    })
  })
*/
export default getWeb3
