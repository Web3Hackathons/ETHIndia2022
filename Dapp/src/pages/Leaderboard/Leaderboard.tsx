import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { ethers } from "ethers";
import abi from "../../contract_Interact/ABI";

const Leaderboard: React.FC = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
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

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid>
          <IonHeader class="ion-text-center ion-padding">Leaderboard</IonHeader>

          <IonList inset={true} lines="inset">
            {staticDataCommunity.map((eachcreator, index) => (
              <IonItem key={index}>
                <div className="flex flex-col w-full py-3">
                  <IonRow>
                    <h3 className="font-semibold py-2">
                      {eachcreator.creatorName}
                    </h3>
                  </IonRow>

                  <IonRow class="ion-no-padding" className="flex gap-5">
                    <div className="flex gap-1 text-sm items-center">
                      <span className="text-xs">Points: </span>
                      <span className="text-lg">
                        {eachcreator.pointsEarned}
                      </span>
                    </div>

                    <div className="flex gap-1 text-sm items-center">
                      <span className="text-xs">Rank: </span>
                      <span className="text-green-600 text-lg">
                        {eachcreator.userRank}
                      </span>
                      <span>/</span>
                      <span className="text-xs">
                        {eachcreator.TotalParticipants}
                      </span>
                    </div>
                  </IonRow>
                </div>
                <div>
                  <IonButton onClick={handleReward}> Reward Pool</IonButton>
                  <IonButton onClick={handleRewardCreator}>
                    {" "}
                    Creator Reward Pool
                  </IonButton>
                </div>
              </IonItem>
            ))}
          </IonList>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Leaderboard;

const staticDataCommunity = [
  {
    creatorName: "John Crypto",
    pointsEarned: 43,
    userRank: 12,
    TotalParticipants: 232,
  },
  {
    creatorName: "John Crypto",
    pointsEarned: 43,
    userRank: 12,
    TotalParticipants: 232,
  },
  {
    creatorName: "John Crypto",
    pointsEarned: 43,
    userRank: 12,
    TotalParticipants: 232,
  },
  {
    creatorName: "John Crypto",
    pointsEarned: 43,
    userRank: 12,
    TotalParticipants: 232,
  },
  {
    creatorName: "John Crypto",
    pointsEarned: 43,
    userRank: 12,
    TotalParticipants: 232,
  },
  {
    creatorName: "John Crypto",
    pointsEarned: 43,
    userRank: 12,
    TotalParticipants: 232,
  },
];
