import contract from "@truffle/contract";
import PixfarmonJSON from "./Pixfarmon/build/contracts/Pixfarmon.json";
import RepositoryJSON from "./Pixfarmon/build/contracts/RepositoryBase.json";
import PixfarmJSON from "./Pixfarmon/build/contracts/PixFarm.json";
import FarmMarketJSON from "./Pixfarmon/build/contracts/FarmMarket.json";

const Pixfarm = contract({
  abi: PixfarmJSON.abi,
  address: "0x7373426fD988EC64623A3849E8750C4be76Ef22f"
});
const Pixfarmon = contract({
  abi: PixfarmonJSON.abi,
  address: "0x89ABb27f6103024A558027C30c7FD481BC927e54"
});
const Repository = contract({
  abi: RepositoryJSON.abi,
  address: "0x3534F5F2d1AFaaf8F91937f35ceBA5eC4ab58897"
});
const FarmMarket = contract({
  abi: FarmMarketJSON.abi,
  address: "0x160Da551ecFfBb33675C5873093d93709E7F360C"
});

const setProvider = provider => {
  Pixfarm.setProvider(provider);
  Pixfarmon.setProvider(provider);
  Repository.setProvider(provider);
  FarmMarket.setProvider(provider);
};

const getFields = async (sender, { address }, callback) => {
  try {
    const instance = await Pixfarm.deployed();
    const fields = await instance.getFields(address, { from: sender });
    callback(null, fields);
  } catch (error) {
    callback(error, null);
  }
};

const getItemList = async (sender, { type, user, target }, callback) => {
  try {
    const instance = await Repository.deployed();
    const items = await instance.getItemList(type, user, target, {
      from: sender
    });
    callback(null, items);
  } catch (error) {
    callback(error, null);
  }
};

const getFriendList = async (sender, callback) => {
  try {
    const instance = await Repository.deployed();
    const friends = await instance.getFriendList({ from: sender });
    callback(null, friends);
  } catch (error) {
    callback(error, null);
  }
};

const acceptFriend = async (sender, { index }, callback) => {
  try {
    const instance = await Repository.deployed();
    await instance.acceptFriend(index, { from: sender });
    callback();
  } catch (error) {
    callback(error);
  }
};

const refuseFriend = async (sender, { index }, callback) => {
  try {
    const instance = await Repository.deployed();
    await instance.refuseFriend(index, { from: sender });
  } catch (error) {
    callback(error);
  }
};

const addFriend = async (sender, { username, address }, callback) => {
  try {
    const instance = await Pixfarmon.deployed();
    if (username) {
      await instance.AddFriendByName(username, { from: sender });
    } else if (address) {
      await instance.AddFriendByAddress(address, {
        from: sender
      });
    } else {
      callback(new Error("Send request failed"));
    }
    callback();
  } catch (error) {
    callback(error);
  }
};

const recharge = async (sender, { amount }, callback) => {
  try {
    const instance = await Pixfarmon.deployed();
    await instance.RechargeMoney(amount, { from: sender, value: amount });
    callback();
  } catch (error) {
    callback(error);
  }
};

const buySeed = async (sender, { specie, level, amount }, callback) => {
  try {
    const instance = await FarmMarket.deployed();
    const price = await instance.getSeedValue(specie, level, { from: sender });
    await instance.BuySeedFromShop(specie, level, amount, {
      from: sender,
      value: price
    });
    callback();
  } catch (error) {
    callback(error);
  }
};

const sowing = async (sender, { x, y, seedTag }, callback) => {
  try {
    const instance = await Pixfarm.deployed();
    const success = await instance.sowing(x, y, seedTag, { from: sender });
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
    const instance = await Pixfarm.deployed();
    await instance.harvest(x, y, { from: sender });
    callback();
  } catch (error) {
    callback(error);
  }
};

const steal = async (sender, { player, x, y }, callback) => {
  try {
    const instance = await Pixfarm.deployed();
    const success = await instance.stealPlant(player, x, y, { from: sender });
    callback(null, success);
  } catch (error) {
    callback(error, null);
  }
};

const eradicate = async (sender, { x, y }, callback) => {
  try {
    const instance = await Pixfarm.deployed();
    await instance.eradicate(x, y, { from: sender });
    callback();
  } catch (error) {
    callback(error, null);
  }
};

const disassemble = async (sender, { fruitTag }, callback) => {
  try {
    const instance = await Pixfarm.deployed();
    const success = await instance.disassembling(fruitTag, { from: sender });
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
    const instance = await Pixfarmon.deployed();
    const success = await instance.register(username, { from: sender });
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
    const instance = await Repository.deployed();
    const username = await instance.getUsername(sender, { from: sender });
    if (username) {
      callback(null, username);
    } else {
      callback(new Error("Returned invalid username"));
    }
  } catch (error) {
    callback(error);
  }
};

export default {
  setProvider,
  pixfarmonContract: Pixfarmon,
  repositoryContract: Repository,
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
