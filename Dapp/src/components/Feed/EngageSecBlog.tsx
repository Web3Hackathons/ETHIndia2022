import { IonButton, IonIcon, useIonAlert } from "@ionic/react";
import axios from "axios";
import { ethers } from "ethers";
import { heart, heartOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import abi from "../../contract_Interact/ABI";
import ModalExample from "./TipInBlog";

const EngageMenu: React.FC<{ card: any }> = ({ card }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [activeUser, setActiveUser] = useState("");
  const [presentAlert] = useIonAlert();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const TipAmountRef = useRef<HTMLIonInputElement>(null);

  const Trikl = new ethers.Contract(
    "0x120D092B5B24aE6c1C661b888715f1d62a63B8f0",
    abi,
    provider.getSigner()
  );

  // Handle Like / Also connected with Tip In Blog
  const handleClick = () => {
    axios
      .post("http://localhost:4000/api/likes/add-like", {
        blogCID: card.blogCID,
        authorwalletAddress: card.author.walletAddress,
        likedUsers: activeUser,
      })
      .then(function (response) {
        presentAlert({
          header: "Congratulations 🤩",
          subHeader: "",
          message: "You got +10 points for the liking this post 🥳",
          buttons: ["OK"],
        });

        console.log("response from handleclick >>> ", response);
      })
      .catch((error) => {
        console.log("error", error);
        presentAlert({
          header: "Sorry! 🙇🏻",
          subHeader: error.response.data.error,
          message: "You already earned your reward for the liking this post 🥳",
          buttons: ["OK"],
        });
      });
  };

  const handleTip = async () => {
    const tipInputAmount = Number(TipAmountRef.current?.value) * 1e18;
    await Trikl.tip(card.author.walletAddress, {
      value: tipInputAmount.toString(),
    });
  };

  useEffect(() => {
    const getaccount = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      setActiveUser(accounts[0]);
    };

    getaccount();

    axios
      .post("http://localhost:4000/api/likes/get-likes-byCID/", {
        blogCID: card.blogCID,
      })
      .then((res) => {
        console.log("res>>>>>>>>", res);

        if (res.data.length) {
          res.data[0].likedUsers.map((user: any) => {
            if (user.walletAddress === activeUser) {
              setIsLiked(true);
            }
          });
        }
      })
      .catch((err) => {
        console.log("some error occured > ", err);
      });
  }, [handleClick]);

  //
  return (
    <div className="flex flex-col justify-around gap-4 pt-10 w-5/6 mx-auto">
      <div className="rounded-md text-sm drop-shadow-md bg-white">
        <IonButton
          fill="clear"
          shape="round"
          onClick={handleClick}
          disabled={isLiked}
        >
          <IonIcon icon={isLiked ? heart : heartOutline} slot="start" />
          {isLiked ? "Liked" : "Like"}
        </IonButton>
      </div>

      <div>
        <ModalExample
          Trikl={Trikl}
          handleTip={handleTip}
          TipAmountRef={TipAmountRef}
        />
      </div>
    </div>
  );
};

export default EngageMenu;
