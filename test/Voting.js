
const Voting = artifacts.require("./Voting.sol");
/*
contract("SimpleStorage", accounts => {
  it("...should store the value 89.", async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();

    // Set value of 89
    await simpleStorageInstance.set(89, { from: accounts[0] });

    // Get stored value
    const storedData = await simpleStorageInstance.get.call();

    assert.equal(storedData, 89, "The value 89 was not stored.");
  });
});*/

contract("Voting", accounts => {
  it("should deploy", async () => {
    const votingInstance = await Voting.deployed();
    //const balance = votingInstance.getBalance.call(accounts[0])
    assert(votingInstance.address)
  });
});

