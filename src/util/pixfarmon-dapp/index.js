import pixfarmonAbi from "./Pixfarmon/build/contracts/Pixfarmon.json";
import repositoryAbi from "./Pixfarmon/build/contracts/RepositoryBase.json";
import pixfarmAbi from "./Pixfarmon/build/contracts/PixFarm.json";
import farmMarketAbi from "./Pixfarmon/build/contracts/FarmMarket.json";
import web3Core from "../web3-core";

const web3 = web3Core.getWeb3();

const pixfarmContract = new web3.eth.Contract(
  pixfarmAbi.abi,
  "0x7373426fD988EC64623A3849E8750C4be76Ef22f"
);
const pixfarmonContract = new web3.eth.Contract(
  pixfarmonAbi.abi,
  "0x89ABb27f6103024A558027C30c7FD481BC927e54"
);
const repositoryContract = new web3.eth.Contract(
  repositoryAbi.abi,
  "0x3534F5F2d1AFaaf8F91937f35ceBA5eC4ab58897"
);
const farmMarketContract = new web3.eth.Contract(
  farmMarketAbi.abi,
  "0x160Da551ecFfBb33675C5873093d93709E7F360C"
);

const getFields = async (sender, { address }, callback) => {
  try {
    const fields = await pixfarmContract.methods
      .getFields(address)
      .call({ from: sender });
    callback(null, fields);
  } catch (error) {
    callback(error, null);
  }
};

const getItemList = async (sender, { type, user, target }, callback) => {
  try {
    const items = await repositoryContract.methods
      .getItemList(type, user, target)
      .call({ from: sender });
    callback(null, items);
  } catch (error) {
    callback(error, null);
  }
};

const getFriendList = async (sender, callback) => {
  try {
    const friends = await repositoryContract.methods
      .getFriendList()
      .call({ from: sender });
    callback(null, friends);
  } catch (error) {
    callback(error, null);
  }
};

const acceptFriend = async (sender, { index }, callback) => {
  try {
    await repositoryContract.methods.acceptFriend(index).call({ from: sender });
  } catch (error) {
    callback(error);
  }
};

const refuseFriend = async (sender, { index }, callback) => {
  try {
    await repositoryContract.methods.refuseFriend(index).call({ from: sender });
  } catch (error) {
    callback(error);
  }
};

const addFriend = async (sender, { username, address }, callback) => {
  try {
    if (username) {
      await pixfarmonContract.methods
        .AddFriendByName(username)
        .send({ from: sender });
    } else if (address) {
      await pixfarmonContract.methods.AddFriendByAddress(address).call({
        from: sender
      });
    } else {
      callback(new Error("No given"));
    }
    callback();
  } catch (error) {
    callback(error);
  }
};

const recharge = async (sender, { amount }, callback) => {
  try {
    await pixfarmonContract.methods
      .RechargeMoney(amount)
      .send({ from: sender, value: amount });
    callback();
  } catch (error) {
    callback(error);
  }
};

const buySeed = async (sender, { specie, level, amount }, callback) => {
  try {
    const price = await farmMarketContract.methods
      .getSeedValue(specie, level)
      .call({ from: sender });
    await pixfarmonContract.methods
      .BuySeedFromShop(specie, level, amount)
      .send({ from: sender, value: price });
    callback();
  } catch (error) {
    callback(error);
  }
};

const sowing = async (sender, { x, y, seedTag }, callback) => {
  try {
    const success = await pixfarmContract.methods
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

const harvest = async (sender, { x, y }, callback) => {
  try {
    await pixfarmContract.methods.harvest(x, y).send({ from: sender });
    callback();
  } catch (error) {
    callback(error);
  }
};

const steal = async (sender, { player, x, y }, callback) => {
  try {
    const success = await pixfarmContract.methods
      .stealPlant(player, x, y)
      .send({ from: sender });
    callback(null, success);
  } catch (error) {
    callback(error, null);
  }
};

const eradicate = async (sender, { x, y }, callback) => {
  try {
    await pixfarmContract.methods.eradicate(x, y).send({ from: sender });
    callback();
  } catch (error) {
    callback(error, null);
  }
};

const disassemble = async (sender, { fruitTag }, callback) => {
  try {
    const success = pixfarmContract.methods
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

export default {
  pixfarmonContract,
  repositoryContract,
  friend: {
    getFriendList,
    acceptFriend,
    refuseFriend,
    addFriend
  },
  farm: {
    buySeed,
    recharge
  },
  repository: {
    getItemList,
    disassemble
  },
  economy: {},
  field: {
    sowing,
    harvest,
    steal,
    eradicate,
    getFields
  }
};
