import Vue from "vue";
import web3Core from "./web3-core";
import myConsole from "./my-console";

Vue.use(myConsole);
Vue.use(web3Core);

const CURRENT_TIME_ETH = () => {
  return Math.floor(Date.now() / 1000);
};

/**
 *
 * @param {number} seedTag Tag of seed
 * @returns Type of plant
 */
const calSeedType = seedTag => {
  // eslint-disable-next-line no-bitwise
  return seedTag >> 17;
};

/**
 *
 * @param {number} level Plant.level
 * @returns Age of the plant(0,1,2,3)
 */
const getPlantAge = level => {
  if (level >= 100) {
    return 3;
  }
  if (level <= 10) {
    return 1;
  }
  if (level > 10 && level <= 50) {
    return 1;
  }
  if (level > 50 && level <= 99) {
    return 2;
  }
  return 1;
};

const calPlantAge = (sowingTime, maturityTime, currentTime) => {
  const level =
    ((currentTime - sowingTime) / (maturityTime - sowingTime)) * 100;
  return getPlantAge(level);
};

/**
 * @description 转换 Eth的时间(block.timestamp) 到 js的时间
 * @param {number} timeInEth block.timestamp
 * @returns time in js
 */
const calTimeInJS = timeInEth => {
  return timeInEth * 1000;
};

const calTimeInEth = timeInJS => {
  return Math.floor(timeInJS / 1000);
};

export const indexToCoor = index => {
  return {
    x: Math.floor(index / 6),
    y: Math.floor(index % 6)
  };
};

export const CoorToIndex = (x, y) => {
  return Math.floor(x * 6 + y);
};

export const ArrayUtil = {
  group: (array, subGroupLength) => {
    let index = 0;
    const newArray = [];
    while (index < array.length) {
      newArray.push(array.slice(index, (index += subGroupLength)));
    }
    return newArray;
  }
};

export default {
  web3Core,
  calSeedType,
  calPlantAge,
  calTimeInEth,
  calTimeInJS,
  ArrayUtil,
  /**
   * @returns 当前以太坊的timestamp
   */
  CURRENT_TIME_ETH,
  getItemSpecie: tag => {
    this.$log(tag);
  }
};
