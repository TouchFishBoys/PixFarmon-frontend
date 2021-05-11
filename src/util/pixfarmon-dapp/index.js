import PixfarmonJSON from "./Pixfarmon/build/contracts/Pixfarmon.json";
import RepositoryJSON from "./Pixfarmon/build/contracts/RepositoryBase.json";
import PixfarmJSON from "./Pixfarmon/build/contracts/PixFarm.json";
import FarmMarketJSON from "./Pixfarmon/build/contracts/FarmMarket.json";

let Pixfarm = null;
let Pixfarmon = null;
let Repository = null;
let FarmMarket = null;

const updateWeb3 = web3 => {
  Pixfarm = new web3.eth.Contract(
    PixfarmJSON.abi,
    "0x487DDac6910EDb2F06B61924Daf42e41f4D6868E"
  );
  Pixfarmon = new web3.eth.Contract(
    PixfarmonJSON.abi,
    "0xf11A6a034BD7e2e2c7Cca0109D4B8F9E7F4D202d"
  );
  Repository = new web3.eth.Contract(
    RepositoryJSON.abi,
    "0xAEFB6032d9731423cc1714dEB84D02B9676Ab521"
  );
  FarmMarket = new web3.eth.Contract(
    FarmMarketJSON.abi,
    "0x44399Afd5069a175fdb28C467544CfDBEcB5CaFb"
  );
};

const getFields = async (sender, { address }, callback) => {
  try {
    const fields = await Pixfarm.methods
      .getFields(address)
      .call({ from: sender });
    callback(null, fields);
  } catch (error) {
    callback(error, null);
  }
};

const getItemList = async (sender, { type, user, target }, callback) => {
  try {
    const items = await Repository.methods
      .getItemList(type, user, target)
      .call({ from: sender });
    callback(null, items);
  } catch (error) {
    callback(error, null);
  }
};

const getFriendList = async (sender, callback) => {
  try {
    const friends = await Repository.methods
      .getFriendList()
      .call({ from: sender });
    callback(null, friends);
  } catch (error) {
    callback(error, null);
  }
};

const acceptFriend = async (sender, { index }, callback) => {
  try {
    await Repository.methods.acceptFriend(index).call({ from: sender });
  } catch (error) {
    callback(error);
  }
};

const refuseFriend = async (sender, { index }, callback) => {
  try {
    await Repository.methods.refuseFriend(index).call({ from: sender });
  } catch (error) {
    callback(error);
  }
};

const addFriend = async (sender, { username, address }, callback) => {
  try {
    if (username) {
      await Pixfarmon.methods.AddFriendByName(username).send({ from: sender });
    } else if (address) {
      await Pixfarmon.methods.AddFriendByAddress(address).call({
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
    await Pixfarmon.methods
      .RechargeMoney(amount)
      .send({ from: sender, value: amount });
    callback();
  } catch (error) {
    callback(error);
  }
};

const buySeed = async (sender, { specie, level, amount }, callback) => {
  try {
    const price = await FarmMarket.methods
      .getSeedValue(specie, level)
      .call({ from: sender });
    await Pixfarmon.methods
      .BuySeedFromShop(specie, level, amount)
      .send({ from: sender, value: price });
    callback();
  } catch (error) {
    callback(error);
  }
};

const sowing = async (sender, { x, y, seedTag }, callback) => {
  try {
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

const harvest = async (sender, { x, y }, callback) => {
  try {
    await Pixfarm.methods.harvest(x, y).send({ from: sender });
    callback();
  } catch (error) {
    callback(error);
  }
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

const eradicate = async (sender, { x, y }, callback) => {
  try {
    await Pixfarm.methods.eradicate(x, y).send({ from: sender });
    callback();
  } catch (error) {
    callback(error, null);
  }
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

const register = async (sender, { username }, callback) => {
  try {
    const success = await Pixfarmon.methods
      .register(username)
      .send({ from: sender });
    if (success) {
      callback();
    } else {
      callback(new Error("Register failed"));
    }
  } catch (error) {
    callback(error);
  }
};

const login = async (sender, callback) => {
  try {
    console.log(sender);
    const username = await Pixfarmon.methods
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

export default {
  updateWeb3,
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
  },
  account: {
    register,
    login
  }
};
