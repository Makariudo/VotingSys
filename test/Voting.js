const truffleAssert = require('truffle-assertions');
const Voting = artifacts.require("./Voting.sol");

contract("Voting", accounts => {
  let [admin,account1,account2] = accounts;
  let contractInstance;
  let proposalTesting = "Sergio";

  beforeEach(async () => {
      contractInstance = await Voting.new();
  });

  it("should deploy", async () => {
    assert(contractInstance.address)
  });

  it("should return accounts[0] is owner", async () => {
    let owner = await contractInstance.owner();
    assert.equal(owner, admin);
  })

  it("should fail to add voter", async () => {
    await truffleAssert.reverts(contractInstance.addVoter(account1, {
      'from': accounts[1]}))
});

})