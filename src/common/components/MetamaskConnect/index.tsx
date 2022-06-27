import React from "react";
import { useEthers } from "@usedapp/core";
import { Button } from "@chakra-ui/react";

export const MetamaskConnect = () => {
  const { account, activateBrowserWallet } = useEthers();

  const ConnectButton = () => (
    <div>
      <Button onClick={() => activateBrowserWallet()}>Connect Wallet</Button>
    </div>
  );

  return (
    <div>
      {account && (
        <div>
          <div className="inline">
            &nbsp;
            <div className="account">{account}</div>
          </div>
          <br />
        </div>
      )}
      {!account && <ConnectButton />}
    </div>
  );
};

export default MetamaskConnect;
