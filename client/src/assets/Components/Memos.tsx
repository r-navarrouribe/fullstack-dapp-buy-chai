import { useEffect } from "react";

const Memos = ({ state, memos, setMemos }: any) => {
  const { contract } = state;

  useEffect(() => {
    const memosMessage = async () => {
      const newMemos = await contract.getMemos();
      setMemos(newMemos);
    };
    contract && memosMessage();
  }, [contract, setMemos]);

  return (
    <>
      {memos.map((memo: any, index: any) => {
        return (
          <div key={index}>
            <h2>Transaction number {index}</h2>
            <ul>
              <li>Name: {memo.name}</li>
              <li>Message: {memo.message}</li>
              <li>Date: {new Date(memo.timestamp * 1000).toLocaleString()}</li>
              <li>Address: {memo.from}</li>
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default Memos;
