import { useState } from "react";
import { ethers } from "ethers";
import { abi } from "./contractJson/Chai.json";
import "./App.css";
import Memos from "./assets/Components/Memos";
import Buy from "./assets/Components/Buy";
interface State {
  provider: any;
  signer: any;
  contract: any;
}
declare global {
  interface Window {
    ethereum?: any;
  }
}
function App() {
  const [state, setState] = useState<State>({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not connected");
  const [memos, setMemos] = useState([]);

  const contractAddress = "0x24E5a452B1F59e3Be861aaCd31397745C59D310c";
  const contractABI = abi;

  const connectToWallet = async () => {
    try {
      // Get metamask account
      const { ethereum } = window;
      const ethAccount = await ethereum.request({
        method: "eth_requestAccounts",
      });
      // Reload page if account is changed
      // window.ethereum.n("accountsChanged", () => {
      //   window.location.reload;
      // });
      // Set account
      setAccount(ethAccount);
      const provider = new ethers.providers.Web3Provider(ethereum); // to read the blockchain
      const signer = provider.getSigner(); //to write the blockchain
      // get contract to interact with
      const contract = await new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setState({ provider, signer, contract });
    } catch (error) {
      console.error(error);
    }
  };
  const updateMemos = async () => {
    const newMemos = await state.contract.getMemos();
    setMemos(newMemos);
  };
  return (
    <>
      <div className="App">
        <header className="header">
          <h1>Buy Chai</h1>
        </header>
        <main className="main-container">
          <section className="connection">
            <p>Connected account: {account}</p>
            <button type="button" onClick={connectToWallet}>
              Connect
            </button>
          </section>
          <Buy state={state} updateMemos={updateMemos} />
          <Memos state={state} memos={memos} setMemos={setMemos} />
        </main>
      </div>
    </>
  );
}

export default App;
