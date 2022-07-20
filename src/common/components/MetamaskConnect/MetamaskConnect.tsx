import { Button } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import React from "react";

export const MetamaskConnect = () => {
  const { account, activateBrowserWallet } = useEthers();

  const ConnectButton = () => (
    <Button onClick={() => activateBrowserWallet()}>Connect Wallet</Button>
  );

  return (
    <div>
      {account && (
        <>
          <div className="inline">
            &nbsp;
            <div className="account">{account}</div>
          </div>
          <br />
        </>
      )}
      {!account && <ConnectButton />}
    </div>
  );
};

