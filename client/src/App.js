import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import VotingContract from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, winningProposalId: null, voters: [], admin:'', status:''  };
  statusArray = ["RegisteringVoters","ProposalsRegistrationStarted","ProposalsRegistrationEnded", "VotingSessionStarted", "VotingSessionEnded", "VotesTallied"];
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = VotingContract.networks[networkId];
      const instance = new web3.eth.Contract(
      VotingContract.abi,
      deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.Admin);
      //listener event
      instance.events.WorkflowStatusChange({})
        .on('data', async (event) => {
          console.log(event)
        })
        .on('error', console.error)
      } 
      catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }

    this.getStatus();
  };

  componentDidUpdate = async () => {
    const { contract }  = this.state;
    contract.events.WorkflowStatusChange({})
        .on('data', async (event) => {
          console.log(event)
          //do setState status:
        })
        .on('error', console.error)
  }

  Admin = async () => {
    const { accounts, contract } = this.state;
    let admin  = await contract.methods.owner().call();
    console.log(admin);
    this.setState({admin})
 
  };


  getStatus = async () => {
    const { accounts, contract } = this.state;
    let status = await contract.methods.status().call();
    console.log('status', status);
    this.setState({status : this.statusArray[status]})
   
  }
  startProposalRegistration = async () => {
    const { accounts, contract } = this.state;
    try {
      await contract.methods.startProposalRegistration().send({from: accounts[0]});
      this.getStatus();
    } catch(err){
      console.log(err)
    }
  }

  endProposalRegistration = async () => {
    const { accounts, contract } = this.state;
    try {
      await contract.methods.endProposalRegistration().send({from: accounts[0]});
      this.getStatus();
    } catch(err){
      console.log(err)
    }
  }
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Contract Voting!</h1>
        <h2>Administrateur du contract : {this.state.admin}</h2>
        <h2>Status du vote :</h2>
        <h3>{this.state.status}</h3>
        <p>
         
        </p>
        {(this.state.status ===  "ProposalsRegistrationEnded" || this.state.status ===  "RegisteringVoters") && <button onClick={this.startProposalRegistration}>Start Proposal</button>}
        {this.state.status === "ProposalsRegistrationStarted" &&  <button onClick={this.endProposalRegistration}>End Proposal</button>}
      </div>
    );
  }
}

export default App;
