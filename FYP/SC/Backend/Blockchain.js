const crypto = require('crypto');
class Block {
    constructor(index, previousHash, timestamp, data, hash) {
      this.index = index;
      this.previousHash = previousHash;
      this.timestamp = timestamp;
      this.data = data;
      this.hash = hash;
    }
  }
  class Blockchain {
    constructor() {
      this.chain = [this.createGenesisBlock()];
      this.difficulty = 2; // Adjust the difficulty based on your needs
      this.miningReward = 100; // Reward for mining a block
    }
}