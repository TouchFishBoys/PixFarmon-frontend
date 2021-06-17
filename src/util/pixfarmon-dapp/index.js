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
    "0x84943D3756bd1B62a3D5C4ecaA823334fd0622aa"
  );
  FarmMarket = new web3.eth.Contract(
    FarmMarketJSON.abi,
    "0xB3293E36031F620f72807A1a7bFAEd44Fa6Ae273"
  );
  Repository = new web3.eth.Contract(
    RepositoryJSON.abi,
    "0x4d832ea29fD9Aca29d032e79aA0Dafa1943Df2a3"
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

const getFriendList = async sender => {
  myConsole.log("Fetching friend list of", sender);
  const friends = await Pixfarm.methods.getFriendList().call({ from: sender });
  return friends;
};

const acceptFriend = async (sender, { index }, callback) => {
  try {
    await Pixfarm.methods.acceptFriend(index).call({ from: sender });
  } catch (error) {
    callback(error);
  }
};

const refuseFriend = async (sender, { index }, callback) => {
  try {
    await Pixfarm.methods.refuseFriend(index).call({ from: sender });
  } catch (error) {
    callback(error);
  }
};

const addFriend = async (sender, { username, address }, callback) => {
  try {
    if (username) {
      await Pixfarm.methods.AddFriendByName(username).send({ from: sender });
    } else if (address) {
      await Pixfarm.methods.AddFriendByAddress(address).call({
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
