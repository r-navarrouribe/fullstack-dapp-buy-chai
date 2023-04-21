import { ethers } from "ethers";
import { useState } from "react";

const Buy = ({ state, updateMemos }: any) => {
  const { contract } = state;
  const [name, setName] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [amount, setAmount] = useState<any>({
    value: 0,
  });
  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const messageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const amountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount({ value: ethers.utils.parseEther(e.target.value) });
  };
  const buyChai = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const transaction = await contract.buyChai(name, message, amount);
    await transaction.wait();
    updateMemos();
    console.log("Transaction is successfull");
  };
  return (
    <>
      <form className="pay-form" onSubmit={buyChai}>
        <label htmlFor="name">
          Name
          <input type="text" id="name" name="name" onChange={nameHandler} />
        </label>
        <label htmlFor="message">
          Message
          <input
            type="text"
            id="message"
            name="message"
            onChange={messageHandler}
          />
        </label>
        <label htmlFor="message">
          Amount
          <input
            type="text"
            id="message"
            name="message"
            onChange={amountHandler}
          />
        </label>
        <button type="submit">Pay</button>
      </form>
    </>
  );
};

export default Buy;
