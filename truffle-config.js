const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic  = "need wrong mistake custom diet caught across left evidence romance magnet local"
const endpoint = "https://ropsten.infura.io/v3/a50ba5928bc04ae1924e779131827b27";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "1337"
    }, 
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, endpoint),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
  },
  compilers: {
    solc: {
      version: "^0.7.4",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
