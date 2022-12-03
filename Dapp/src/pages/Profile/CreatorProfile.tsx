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
  IonTextarea,
  useIonAlert,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";

import axios from "axios";

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
  aboutFromDatabase: string;
  setAboutFromDatabase: React.Dispatch<React.SetStateAction<string>>;
  coverImgFromDatabase: string;
  setCoverImgFromDatabase: React.Dispatch<React.SetStateAction<string>>;
};
const CreatorProfile = ({
  isLoggedIn,
  setIsLoggedIn,
  isProfileAvailable,
  setIsProfileAvailable,
  accountaddress,
  setAccountAddress,
  nameFromDatabase,
  setNameFromDatabase,
  aboutFromDatabase,
  setAboutFromDatabase,
  imgFromDatabase,
  setImgFromDatabase,
  coverImgFromDatabase,
  setCoverImgFromDatabase,
}: propTypes) => {
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
    // CHECK IF USER EXISTS
    await axios
      .post("http://localhost:4000/api/users/get-user-byWallet", {
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
      .post("http://localhost:4000/api/creators/get-creator-byWallet", {
        walletAddress: addressParam,
      })
      .then((res) => {
        setCreatorProfileExists(true);
        setCoverImgFromDatabase(res.data.coverImg);
        setAboutFromDatabase(res.data.about);
        console.log("Current Creator Profile >> ", res);
      })
      .catch((err) => {
        setCreatorProfileExists(false);
        console.log("Creator not Found > ", err);
      });
  };

  const master = async () => {
    await checkConnection();
    const address = await handleLogin();
    await getUserInfo(address);
  };

  useEffect(() => {
    master();
  }, []);

  const [presentAlert] = useIonAlert();

  const NameInputRef = useRef<HTMLIonInputElement>(null);
  const UserImgRef = useRef<HTMLIonInputElement>(null);
  const CreatorCoverImgRef = useRef<HTMLIonInputElement>(null);
  const UserAboutRef = useRef<HTMLIonTextareaElement>(null);

  const submitProfile = (e: any) => {
    e.preventDefault();
    const NameInput = NameInputRef.current?.value?.toString();
    const UserImg = UserImgRef.current?.value?.toString();
    const CreatorCoverImg = CreatorCoverImgRef.current?.value?.toString();
    const UserAbout = UserAboutRef.current?.value?.toString();

    const creatorFormData = {
      walletAddress: accountaddress,
      username: "unnamed",
      name: nameFromDatabase,
      profilePic: imgFromDatabase,
      coverImg: CreatorCoverImg,
      about: UserAbout,
      nFollowers: "20",
      SocialLinks: [
        {
          _socialId: "23udewer",
          platformName: "unnamed",
          profileLink: "samplesocial.link",
        },
      ],
    };

    console.log("creatorFormData >>>>> ", creatorFormData);

    // Uploading form data to DB
    axios
      .post(
        "http://localhost:4000/api/creators/create-creator-profile",
        creatorFormData
      )
      .then(function (response) {
        console.log(response);
        presentAlert({
          header: "Congratulations  🤩 ",
          subHeader: "",
          message: "You're Now A Creator 🥳 ",
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
                ? `Let's Start Creating Content`
                : "Create Profile First"}
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

              <IonItem>
                <IonLabel position="stacked">
                  <span className="text-sm text-triklGray">Cover Image</span>
                </IonLabel>
                <IonInput ref={CreatorCoverImgRef}>
                  {coverImgFromDatabase}
                </IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">
                  <span className="text-sm text-triklGray">About</span>
                </IonLabel>
                <IonTextarea ref={UserAboutRef} autoGrow={true}>
                  {aboutFromDatabase}
                </IonTextarea>
              </IonItem>

              {isProfileAvailable ? (
                <IonButton
                  expand="block"
                  fill="clear"
                  disabled={creatorProfileExists}
                  href="/creatorProfile"
                  onClick={submitProfile}
                  className="w-full text-white bg-triklBlue rounded-full py-2 disabled:bg-transparent disabled:text-lightAccent/50"
                >
                  <span className="text-xs capitalize">
                    {creatorProfileExists
                      ? "Your Creator Profile Is Active!"
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

export default CreatorProfile;
