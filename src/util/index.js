import web3Core from "./web3-core";

const getPlantType = seedTag => {
  // eslint-disable-next-line no-bitwise
  return seedTag >> 17;
};

const getPlantAge = level => {
  if (level >= 100) {
    return 3;
  }
  if (level <= 10) {
    return 0;
  }
  if (level > 10 && level <= 50) {
    return 1;
  }
  if (level > 50 && level <= 99) {
    return 2;
  }
  return -1;
};

export default {
  web3Core,
  getPlantType,
  getPlantAge
};
