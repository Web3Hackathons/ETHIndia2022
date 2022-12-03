import { IonButton, IonContent, IonGrid, IonItem, IonPage } from "@ionic/react";
import React from "react";
import { ethers } from "ethers";

const LoginPage: React.FC = () => {
  const handleLogin = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid className="w-screen h-full bg-blue-700 flex flex-col justify-center items-center text-white">
          <header className="flex flex-col gap-2 pb-10 items-center justify-center">
            <div className="text-xl">Welcome To</div>
            <div className="text-4xl font-semibold pb-5">TRIKL</div>
            <div className="text-xs tracking-widest">Read | Engage | Earn</div>
          </header>

          <button
            className="bg-triklOffWhite py-2 px-5 text-triklBlue rounded-md text-xs"
            onClick={handleLogin}
          >
            Continue With Metamask
          </button>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
