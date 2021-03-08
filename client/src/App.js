import React, { Component } from "react";
import VotingContract from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";

import AddVoter from "./Components/AddVoter";
import GetVoters from "./Components/GetVoters";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, winningProposalId: null, voters: [], voter:undefined, admin:'', status:'', getVoters: false, address:'', notification:''  };
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
          this.setState({
            notification: event.event,
            status: this.statusArray[event.returnValues.newStatus]
          });
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
    console.log('status via array', this.statusArray[status]);
    this.setState({status : this.statusArray[status]});
  }


  startProposalRegistration = async () => {
    const { accounts, contract } = this.state;
    try {
      await contract.methods.startProposalRegistration().send({from: accounts[0]});
    } catch(err){
      console.log(err)
    }
  }

  endProposalRegistration = async () => {
      const { accounts, contract } = this.state;
      try {
        await contract.methods.endProposalRegistration().send({from: accounts[0]});
      } catch(err){
        console.log(err)
      }
    }

    handleChange = (event) => {
      this.setState({address: event.target.value});
    }


  addVoter = async (_address) => {
    const { accounts, contract } = this.state;
    try {
      await contract.methods.addVoter(_address).send({from: accounts[0]});
    } catch(err){
      console.log(err)
    }
  }

  getVoter = async () => {
    const { accounts, contract } = this.state;
    try {
      const res = await contract.methods.whiteList(this.state.address).call();
      console.log('res', res);
      this.setState({
        voter: res,
        getVoters: true
      })
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
        <h2>Administrateur du contract : <span style={{color: "blue"}}>{this.state.admin}</span></h2>
        <h2>Statut du vote :</h2>
        <h3 style={{color: "red"}}>{this.state.status}</h3>
        {this.state.status === this.statusArray[0] ? <AddVoter addVoter={this.addVoter} /> : null}
        <p></p>
        <input type="text" value={this.state.address} onChange={this.handleChange}/>
        <button onClick={this.getVoter}> GetVoter </button>
        {this.state.getVoters ? <GetVoters voter={this.state.voter} /> : null}
        <p>
         Passer à l'étape suivante du vote 
        </p>
        {(this.state.status ===  "ProposalsRegistrationEnded" || this.state.status ===  "RegisteringVoters") && <button onClick={this.startProposalRegistration}>Start Proposal</button>}
        {this.state.status === "ProposalsRegistrationStarted" &&  <button onClick={this.endProposalRegistration}>End Proposal</button>}
      </div>
    );
  }
}

export default App;
