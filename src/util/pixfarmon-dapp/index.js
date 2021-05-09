import fs from 'fs';
import Contract from 'web3-eth-contract';

var pixfarmonContract = new Contract(fs.readFileSync('./Pixfarmon/build/contracts/Pixfarmon.json'), "0x0");

export default {
  pixfarmonContract
};
