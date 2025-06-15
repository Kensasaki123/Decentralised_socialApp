// ContractContext.tsx
import React, { createContext, useContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { BrowserProvider, JsonRpcSigner, Contract } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import type { Eip1193Provider } from "ethers";
import { contractABI, contractAddress } from "../constants/contract";



// ✅ Replace with your contract's ABI and address


type ContractContextType = {
  provider: BrowserProvider | null;
  signer: JsonRpcSigner | null;
  contract: Contract | null;
  account: string;
  address: string;
  setProvider: Dispatch<SetStateAction<BrowserProvider | null>>;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
  setContract: Dispatch<SetStateAction<Contract | null>>;
  setAccount: Dispatch<SetStateAction<string>>;
  connectWallet: () => Promise<void>;
};

const ContractContext = createContext<ContractContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const ContractProvider = ({ children }: Props) => {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [account, setAccount] = useState<string>("");

  const connectWallet = async () => {
    const detectedProvider = await detectEthereumProvider();

    if (detectedProvider) {
      try {
        const ethereum = detectedProvider as unknown as Eip1193Provider;
        const prov = new BrowserProvider(ethereum);
        await prov.send("eth_requestAccounts", []);
        const sign = await prov.getSigner();
        const addr = await sign.getAddress();
        const contr = new Contract(contractAddress, contractABI, sign);

        setProvider(prov);
        setSigner(sign);
        setContract(contr);
        setAccount(addr);

        (ethereum as any).on("accountsChanged", async (accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            const newSigner = await prov.getSigner();
            setSigner(newSigner);
            setContract(new Contract(contractAddress, contractABI, newSigner));
          } else {
            setAccount("");
            setSigner(null);
            setContract(null);
          }
        });

        (ethereum as any).on("chainChanged", () => {
          window.location.reload();
        });
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      console.error("MetaMask not found");
    }
  };

  return (
    <ContractContext.Provider
      value={{
        provider,
        signer,
        contract,
        account,
        address: account,
        setProvider,
        setSigner,
        setContract,
        setAccount,
        connectWallet,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = () => {
  const context = useContext(ContractContext);
  if (!context)
    throw new Error("useContract must be used inside a ContractProvider");
  return context;
};
