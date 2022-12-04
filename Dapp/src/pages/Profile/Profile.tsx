import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  useIonAlert,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import { generateChallenge, authenticate } from "../../utils";
import { useSignMessage, useConnect, Connector } from "wagmi";
import { signMessage } from "@wagmi/core";
import { InjectedConnector } from "wagmi/connectors/injected";

//import { client, challenge, authenticate } from "../../utils";

import axios from "axios";
import { MetaMaskConnector } from "wagmi/dist/connectors/metaMask";

type propTypes = {
  isLoggedIn: boolean;
  setIsLoggedIn: (open: boolean) => void;
  isProfileAvailable: boolean;
  setIsProfileAvailable: (open: boolean) => void;
  accountaddress: string;
  setAccountAddress: React.Dispatch<React.SetStateAction<string>>;
  nameFromDatabase: string;
  setNameFromDatabase: React.Dispatch<React.SetStateAction<string>>;
  imgFromDatabase: string;
  setImgFromDatabase: React.Dispatch<React.SetStateAction<string>>;
};
const Profile = ({
  isLoggedIn,
  setIsLoggedIn,
  isProfileAvailable,
  setIsProfileAvailable,
  accountaddress,
  setAccountAddress,
  nameFromDatabase,
  setNameFromDatabase,
  imgFromDatabase,
  setImgFromDatabase,
}: propTypes) => {
  const [token, setToken] = useState();
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const [creatorProfileExists, setCreatorProfileExists] = useState(false);

  const checkConnection = async () => {
    const addresses = await provider.listAccounts();
    if (addresses.length) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const handleLogin = async () => {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setAccountAddress(address);
    return address;
  };

  const getUserInfo = async (addressParam: any) => {
    await axios
      .post(`${process.env.REACT_APP_SERVER}api/users/get-user-byWallet`, {
        walletAddress: addressParam,
      })
      .then((res) => {
        setNameFromDatabase(res.data.name);
        setImgFromDatabase(res.data.profilePic);
        setIsProfileAvailable(true);
      })
      .catch((err) => {
        setIsProfileAvailable(false);
        console.log("some error occured > ", err);
      });

    // CHECK IF USER HAS CREATOR PROFILE
    await axios
      .post(
        `${process.env.REACT_APP_SERVER}api/creators/get-creator-byWallet`,
        {
          walletAddress: addressParam,
        }
      )
      .then((res) => {
        setCreatorProfileExists(true);
        console.log("Current Creator Profile >> ", res);
      })
      .catch((err) => {
        setCreatorProfileExists(false);
        console.log("Creator not Found > ", err);
      });
  };

  const master = async () => {
    await checkConnection().then(() =>
      handleLogin().then((res) => getUserInfo(res))
    );
  };

  useEffect(() => {
    master();
  }, []);

  // const signIn = async () => {
  //   try {
  //     if (!isLoggedIn) {
  //       return alert("Please connect your wallet first");
  //     }
  //     const challenge = await generateChallenge(accountaddress);
  //     const signature = await signMessage({ message: challenge });

  //     const accessToken = await authenticate(accountaddress, signature);
  //     console.log({ accessToken });
  //     setToken(accessToken);
  //     window.sessionStorage.setItem("accessToken", accessToken);
  //     console.log({ signature });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const [presentAlert] = useIonAlert();

  const NameInputRef = useRef<HTMLIonInputElement>(null);
  const UserImgRef = useRef<HTMLIonInputElement>(null);

  const submitProfile = () => {
    const NameInput = NameInputRef.current?.value?.toString();
    const UserImg = UserImgRef.current?.value?.toString();

    axios
      .post(`${process.env.REACT_APP_SERVER}api/users/create-user`, {
        walletAddress: accountaddress,
        username: "unnamed",
        name: NameInput,
        profilePic: UserImg,
      })
      .then(function (response) {
        console.log(response);
        presentAlert({
          header: "Congratulations  🤩 ",
          subHeader: "",
          message: "Your Profile is Created 🥳 ",
          buttons: ["OK"],
        });
      })
      .catch((error) => {
        console.log("error", error);
        presentAlert({
          header: "Sorry! 🙇🏻",
          subHeader: error,
          message: "Please Try Again",
          buttons: ["OK"],
        });
      });
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid>
          <IonHeader class="ion-text-center ion-padding">
            <h2 className="text-xl text-lightAccent font-semibold pt-10">
              {nameFromDatabase
                ? `Welcome ${nameFromDatabase}`
                : "Create Profile"}
            </h2>
          </IonHeader>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Wallet Address</IonLabel>
                <IonInput disabled class="text-triklGray pt-1">
                  <span>
                    {accountaddress.slice(0, 5)}...{accountaddress.slice(-5)}
                  </span>
                </IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">
                  <span className="text-sm text-triklGray">
                    Name / Pseudonym
                  </span>
                </IonLabel>
                <IonInput ref={NameInputRef}>{nameFromDatabase}</IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">
                  <span className="text-sm text-triklGray">Profile Pic</span>
                </IonLabel>
                <IonInput ref={UserImgRef}>{imgFromDatabase}</IonInput>
              </IonItem>

              <div className="flex flex-col justify-center gap-5 pt-5">
                {isLoggedIn ? (
                  <button
                    onClick={submitProfile}
                    disabled={isProfileAvailable ? true : false}
                    className="bg-triklBlue/75 rounded-full py-2 px-4 disabled:bg-transparent text-triklGray"
                  >
                    {isProfileAvailable
                      ? "You're registered as User!"
                      : "Submit"}
                  </button>
                ) : (
                  ""
                )}

                <IonButton
                  onClick={handleLogin}
                  fill="clear"
                  disabled={isLoggedIn ? true : false}
                  className="bg-triklBlue rounded-full py-2 px-4 disabled:hidden"
                >
                  <span className="text-white">
                    {isLoggedIn ? "Connected" : "Connect Wallet"}
                  </span>
                </IonButton>
              </div>

              {isProfileAvailable ? (
                <IonButton
                  expand="block"
                  fill="clear"
                  // disabled={isCreator}
                  href="/creatorProfile"
                  className="w-full text-white bg-triklBlue rounded-full py-2 disabled:bg-transparent disabled:text-lightAccent/50"
                >
                  <span className="text-xs capitalize">
                    {creatorProfileExists
                      ? "Visit Your Creator Profile"
                      : "Activate Creator Profile"}
                  </span>
                </IonButton>
              ) : (
                ""
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
