import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
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
import abi from "../../contract_Interact/ABI";
import UserRankWithCreator from "../Leaderboard/UserRankWithCreator";

const CreatorPublicProfile: React.FC = () => {
  const creatorWalletAdd = window.location.pathname.split("/creator/");

  type creInfo = {
    _id: string;
    walletAddress: string;
    username: string;
    name: string;
    profilePic: string;
    coverImg: string;
    about: string;
    joinedDate: Date;
    nFollowers: number;
    SocialLinks: [
      {
        _socialId: string;
        platformName: string;
        profileLink: string;
      }
    ];
    followerInfo: [
      {
        userId: string;
        fUsername: string;
        fWalletAddress: string;
      }
    ];
  };
  const [creatorInfo, setCreatorInfo] = useState<creInfo>();
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const getCreatorInfo = () => {
    axios
      .post("http://localhost:4000/api/creators/get-creator-byWallet", {
        walletAddress: creatorWalletAdd,
      })
      .then((res) => {
        setCreatorInfo(res.data);
      })
      .catch((error) => console.log(error));
  };

  const Trikl = new ethers.Contract(
    process.env.REACT_APP_TRIKL_CONTRACT_ADDRESS!,
    // "0x120D092B5B24aE6c1C661b888715f1d62a63B8f0",
    abi,
    provider.getSigner()
  );

  const handleReward = async () => {
    const num = 100000000000000;
    await Trikl.fundCreatorPool("0xf3fb3cb8b34f5331b82219183c5adef40ee10ba5", {
      value: num,
    });
  };

  const handleRewardCreator = async () => {
    const num = 100000000000000;
    await Trikl.fundRewardPool({
      value: num,
    });
  };

  useEffect(() => {
    getCreatorInfo();
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid>
          <div className="w-full h-28 absolute top-0 -z-50 aspect-video mx-auto">
            <img
              className="w-full h-full object-cover"
              src={creatorInfo?.coverImg}
              alt="Cover Image"
            />
          </div>

          <div className="w-1/3 aspect-square rounded-full mt-10 mx-auto">
            <img
              className="w-full h-full object-cover rounded-full"
              src={creatorInfo?.profilePic}
              alt="Profile Image"
            />
          </div>

          <IonHeader class="ion-text-center ion-padding">
            <h2 className="text-xl text-lightAccent font-semibold pb-2">
              {creatorInfo?.name}
            </h2>
          </IonHeader>

          <IonItem lines="none">
            <div className="text-center px-2 py-4">
              {creatorInfo?.about.slice(0, 100)}...
            </div>
          </IonItem>

          <IonItem lines="none">
            <div className="text-center px-2 py-4 text-white text-lg font-semibold mx-auto">
              {creatorInfo?.nFollowers}{" "}
              <span className="text-sm font-normal">Followers</span>
            </div>
            <div className="text-center px-2 py-4 text-white text-lg font-semibold mx-auto">
              <span className="text-sm font-normal">Active Pool:</span> $300
            </div>
          </IonItem>

          <IonItem>
            <div className="flex gap-2 w-full justify-center pb-5">
              <IonButton onClick={handleReward} className="flex flex-1">
                Own Pool
              </IonButton>
              <IonButton onClick={handleRewardCreator} className="flex flex-1">
                Sponsor Pool
              </IonButton>
            </div>
          </IonItem>

          <IonItem className="mt-4">
            <UserRankWithCreator creatorInfo={creatorInfo} />
          </IonItem>

          {/* <IonRow>
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
                <IonInput ref={UserImgRef}>
                  {imgFromDatabase.length > 0 ? (
                    <div className="w-20 h-20 rounded-full mt-2">
                      <img
                        className="w-full h-full object-cover rounded-full"
                        src={imgFromDatabase}
                        alt="Cover Image"
                      />
                    </div>
                  ) : (
                    imgFromDatabase
                  )}
                </IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">
                  <span className="text-sm text-triklGray">Cover Image</span>
                </IonLabel>
                <IonInput ref={CreatorCoverImgRef}>
                  {coverImgFromDatabase.length > 0 ? (
                    <img
                      src={coverImgFromDatabase}
                      alt="Cover Image"
                      className="mt-2 max-h-[50vh] object-contain"
                    />
                  ) : (
                    coverImgFromDatabase
                  )}
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
                  className="w-full text-white bg-triklBlue rounded-full py-2 disabled:bg-transparent disabled:text-lightAccent/50 mt-5 mb-20"
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
          </IonRow> */}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default CreatorPublicProfile;
