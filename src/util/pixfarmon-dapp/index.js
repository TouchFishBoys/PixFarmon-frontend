import pixfarmonAbi from './Pixfarmon/build/contracts/Pixfarmon.json';
import repositoryAbi from './Pixfarmon/build/contracts/RepositoryBase.json';
import Contract from 'web3-eth-contract';

var pixfarmonContract = new Contract(pixfarmonAbi.abi, "0x490eF64673A7Aaf95eF9b9e08E55A600E5b60887");
var repositoryContract = new Contract(repositoryAbi.abi, "0xD8a0e207b722Bb379fd7623FB3DD92752919aEB5");

export default {
  pixfarmonContract,
  repositoryContract
};
