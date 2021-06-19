import PixfarmJSON from "./Pixfarmon/build/contracts/PixFarm.json";
import FarmMarketJSON from "./Pixfarmon/build/contracts/FarmMarket.json";
import RepositoryJSON from "./Pixfarmon/build/contracts/Repository.json";
import myConsole from "../my-console";

let Pixfarm = null;
let FarmMarket = null;
let Repository = null;

const updateWeb3 = web3 => {
  Pixfarm = new web3.eth.Contract(
    PixfarmJSON.abi,
    "0xf9a0CA48ad04C4c405e79b9F2D1F709Aae28280D"
  );
  FarmMarket = new web3.eth.Contract(
    FarmMarketJSON.abi,
    "0x06592C64ed404B24Ae31E9927f2f170FbdB9750f"
  );
  Repository = new web3.eth.Contract(
    RepositoryJSON.abi,
    "0x75A0Ca1596E63aDC279329E12CD433A94e55ED5B"
  );
};

const getFields = async (sender, callback) => {
  try {
    const fields = await Pixfarm.methods.getFields().call({ from: sender });
    callback(null, fields);
  } catch (error) {
    callback(error, null);
  }
};

const getItemList = async (sender, { type, user, target }) => {
  myConsole.log("fetching item list of ", sender);
  const items = await Repository.methods
    .getItemList(type, user, target)
    .call({ from: sender });
  return items;
};

const recharge = async (sender, { amount }, callback) => {
  try {
    await Pixfarm.methods
      .RechargeMoney(amount)
      .send({ from: sender, value: amount });
    callback();
  } catch (error) {
    callback(error);
  }
};

const buySeed = async (sender, { specie, level, amount }) => {
  await FarmMarket.methods
    .buySeed(specie, level, amount)
    .send({ from: sender });
};

const sowing = async (sender, { x, y, seedTag }, callback) => {
  try {
    myConsole.log(`Sowing seed ${seedTag} at ${x},${y}`);
    const success = await Pixfarm.methods
      .sowing(x, y, seedTag)
      .send({ from: sender });
    if (success) {
      callback();
    } else {
      callback(new Error("Failed"));
    }
  } catch (error) {
    callback(error, null);
  }
};

const harvest = async (sender, { x, y }) => {
  myConsole.debug("Harvesting", x, y);
  await Pixfarm.methods.harvest(x, y).send({ from: sender });
};

const steal = async (sender, { player, x, y }, callback) => {
  try {
    const success = await Pixfarm.methods
      .stealPlant(player, x, y)
      .send({ from: sender });
    callback(null, success);
  } catch (error) {
    callback(error, null);
  }
};

const eradicate = async (sender, { x, y }) => {
  await Pixfarm.methods.eradicate(x, y).send({ from: sender });
};

const disassemble = async (sender, { fruitTag }, callback) => {
  try {
    const success = Pixfarm.methods
      .disassembling(fruitTag)
      .send({ from: sender });
    if (success) {
      callback();
    } else {
      callback(new Error("Disassenble failed"));
    }
  } catch (error) {
    callback(error, null);
  }
};

const register = async (sender, { username }) => {
  const success = await Pixfarm.methods
    .register(username)
    .send({ from: sender });
  if (!success) {
    throw new Error("Register failed");
  }
};

const login = async (sender, callback) => {
  try {
    console.log(sender);
    const username = await Pixfarm.methods
      .getUsername(sender)
      .call({ from: sender });
    if (username) {
      callback(null, username);
    } else {
      callback(new Error(404));
    }
  } catch (error) {
    callback(error);
  }
};

const getMoney = async sender => {
  const money = await Repository.methods.money(sender).call({ from: sender });
  return money;
};

export default {
  updateWeb3,
  farm: {
    buySeed,
    recharge
  },
  repository: {
    getItemList,
    disassemble,
    getMoney
  },
  economy: {},
  field: {
    sowing,
    harvest,
    steal,
    eradicate,
    getFields
  },
  account: {
    register,
    login
  }
};
