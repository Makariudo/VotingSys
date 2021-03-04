const { assert } = require("chai");
const Voting = artifacts.require("Voting");

contract("Voting", accounts => {
  let [account1, account2] = accounts;
  let contractInstance;
  beforeEach(async () => {
    contractInstance = await Voting.new();
  });

  it("should deploy", async () => {
    const votingInstance = await Voting.deployed();
    //const balance = votingInstance.getBalance.call(accounts[0])
    assert(votingInstance.address)
  });

  it("workflow status should be RegisteringVoters", () => {
    return Voting.deployed()
      .then(instance => instance.status())
      .then(status => assert.equal(status.toNumber(), 0), "status should be RegisteringVoters upon deploy")
  })
  it("")
})
