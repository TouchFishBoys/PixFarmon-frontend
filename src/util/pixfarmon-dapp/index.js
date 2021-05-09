import pixfarmonAbi from './Pixfarmon/build/contracts/Pixfarmon.json';
import repositoryAbi from './Pixfarmon/build/contracts/RepositoryBase.json';
import web3Core from '../web3-core';

let web3 = web3Core.getWeb3()

var pixfarmonContract = new web3.eth.Contract(pixfarmonAbi.abi, "0xFb64537b9CCE48421E6798bc0d86AE41809CCD9D");
var repositoryContract = new web3.eth.Contract(repositoryAbi.abi, "0x3afAc52c29Ea9B7554D01286E3ac2Ee06E9081DF");

export default {
  pixfarmonContract,
  repositoryContract
};
