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
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../../contract_Interact/ABI";
import axios from "axios";

const Leaderboard: React.FC = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [creatorsInfo, setCreatorsInfo] = useState<any[]>([]);

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
    axios
      .get("http://localhost:4000/api/creators")
      .then((res) => {
        console.log(res.data);
        setCreatorsInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid>
          <IonHeader class="ion-text-center ion-padding">
            <h2 className="text-xl text-lightAccent font-semibold pt-5">
              Creator Leaderboards
            </h2>
          </IonHeader>

          <IonList inset={true} lines="inset">
            {creatorsInfo.map((eachcreator, index) => (
              <IonItem key={index}>
                <div className="flex flex-col w-full border-b-[1px] pb-10 border-triklGray/20">
                  <IonRow>
                    <h3 className="font-semibold pt-5 justify-center w-full text-center text-lg">
                      {eachcreator.name}
                    </h3>
                  </IonRow>

                  <IonRow
                    class="ion-no-padding"
                    className="flex gap-5 justify-center py-5"
                  >
                    <div className="flex gap-2 text-sm items-center">
                      <span className="text-lg">{eachcreator.nFollowers}</span>
                      <span className="">Followers</span>
                    </div>

                    <div className="flex gap-1 text-sm items-center">
                      <span className="text-xs">Rank: </span>
                      <span className="text-green-600 text-lg">
                        {Math.round(Math.random() * 10)}/
                      </span>
                      <span>/</span>
                      <span className="text-xs">
                        {Math.round(Math.random() * 100)}
                      </span>
                    </div>
                  </IonRow>
                  <IonRow className="flex gap-5 justify-center">
                    <IonButton href={"/creator/" + eachcreator.walletAddress}>
                      View Profile
                    </IonButton>
                  </IonRow>
                  {/* <IonRow className="flex gap-5 justify-center">
                    <IonButton onClick={handleReward}>Own Pool</IonButton>
                    <IonButton onClick={handleRewardCreator}>
                      Sponsor Pool
                    </IonButton>
                  </IonRow> */}
                </div>
                {/* <div>
                 
                </div> */}
              </IonItem>
            ))}
          </IonList>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Leaderboard;
