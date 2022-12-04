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
  const [likeCount, setLikeCount] = useState("");

  const Trikl = new ethers.Contract(
    "0x120D092B5B24aE6c1C661b888715f1d62a63B8f0",
    abi,
    provider.getSigner()
  );

  // Handle Like / Also connected with Tip In Blog
  const handleClick = () => {
    axios
      .post("http://localhost:4000/api/likes/add-likes", {
        blogCID: card.blogCID,
        authorwalletAddress: card.author.walletAddress,
        likedUsers: activeUser,
      })
      .then(function (response) {
        console.log("handle click se response aaya >>> ", response);
        presentAlert({
          header: "Congratulations 🤩",
          subHeader: "",
          message: "You got +10 points for the liking this post 🥳",
          buttons: ["OK"],
        });
        setIsLiked(true);
      })
      .catch((error) => {
        console.log("error", error);
        presentAlert({
          header: "Sorry! 🙇🏻",
          subHeader: error.response.data.error,
          message: "Please Try Again! Some Error Occurred.",
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

  const getaccount = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    setActiveUser(accounts[0]);
    return accounts[0];
  };

  const getLikes = async () => {
    const currBlogId = await card.blogCID;
    await axios
      .post("http://localhost:4000/api/likes/get-likes-byCID/", {
        blogCID: currBlogId,
      })
      .then((res) => {
        if (res.data.length) {
          setLikeCount(res.data[0].likedUsers.length.toString());

          for (let i = 0; i < res.data[0].likedUsers.length; i++) {
            if (res.data[0].likedUsers[i] === activeUser) {
              setIsLiked(true);
            }
          }
        }
      })
      .catch((err) => {
        console.log("Error Fetching Likes", err);
      });
  };

  useEffect(() => {
    getaccount().then(() => getLikes());
  }, [, getLikes]);

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
          {isLiked ? `${likeCount} Liked` : `${likeCount} Like`}
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
