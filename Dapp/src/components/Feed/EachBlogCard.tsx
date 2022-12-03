import React, { useState, useRef, useEffect } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonPage,
  IonTitle,
  useIonAlert,
  useIonModal,
  useIonPopover,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import "swiper/swiper.min.css";
import "@ionic/react/css/ionic-swiper.css";
import { heartOutline, heart, giftOutline, car } from "ionicons/icons";
import { Contract, ethers } from "ethers";
import abi from "../../contract_Interact/ABI";
import { ImNewTab } from "react-icons/im";

const EachBlogCard: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/blogs/")
      .then((response) => {
        console.log(">>>>>>>>>", response.data);
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <IonPage>
      <IonContent>
        <Swiper>
          {data.map((card, index) => (
            <SwiperSlide
              key={`slide_${index}`}
              className="flex flex-col relative"
            >
              <IonImg src={card.heroImg} alt={card.title} />
              <h2 className="text-lg font-semibold px-2">{card.title}</h2>
              <IonItem lines="none">
                <a
                  className="text-sm text-triklGray"
                  href={card.blogCID}
                  target="_blank"
                  title="pop-up text"
                >
                  Open in IPFS
                </a>
              </IonItem>

              <IonItem lines="none">
                <section className="pt-5 w-full px-5 text-xs flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-[30px] h-[30px]">
                      <img
                        src={
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
                        }
                        alt="avatar"
                        className="rounded-full object-cover min-w-full min-h-full"
                      />
                    </div>
                    <div className="text-left px-3">
                      <h3 className="text-sm font-semibold">
                        {card.author.name.slice(0, 10)}
                        {card.author.name.length > 10 ? "..." : ""}
                      </h3>
                      <p className="text-triklGray">
                        {card.author.walletAddress.slice(0, 5)}...
                        {card.author.walletAddress.slice(-5)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button className="text-xs px-3 py-1 rounded-full bg-triklBlue">
                      Subscribe
                    </button>
                  </div>
                </section>
              </IonItem>

              <p className="px-5 text-center pt-5 text-sm">
                {card.blogContent}
              </p>

              {/* MENU */}
              <div className="w-full h-full">
                <EngageMenu card={card} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default EachBlogCard;

//
//
//
//
//

const EngageMenu: React.FC<{ card: any }> = ({ card }) => {
  console.log("Hello from EngageMenu", card.author.walletAddress);
  const [isLiked, setIsLiked] = useState(false);
  const [activeUser, setActiveUser] = useState("");

  useEffect(() => {
    const getaccount = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      setActiveUser(accounts[0]);
      console.log(accounts[0]);
    };

    getaccount();

    axios
      .post("http://localhost:4000/api/likes/get-likes-byCID/", {
        blogCID: card.blogCID,
      })
      .then((res) => {
        if (res.data.length) {
          console.log(res.data[0].likedUsers);
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
  }, []);

  const [presentAlert] = useIonAlert();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const Trikl = new ethers.Contract(
    "0x120D092B5B24aE6c1C661b888715f1d62a63B8f0",
    abi,
    provider.getSigner()
  );

  const handleClick = () => {
    axios
      .post("http://localhost:4000/api/likes/add-like", {
        blogCID: card.blogCID,
        authorwalletAddress: card.author.walletAddress,
        likedUsers: [{ walletAddress: activeUser }],
      })
      .then(function (response) {
        presentAlert({
          header: "Congratulations 🤩",
          subHeader: "",
          message: "You got +10 points for the liking this post 🥳",
          buttons: ["OK"],
        });

        console.log("response", response);
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

  // const [tipAmount, setTipAmount] = useState(0)
  const TipAmountRef = useRef<HTMLIonInputElement>(null);

  const handleTip = async () => {
    const tipInputAmount = Number(TipAmountRef.current?.value) * 1e18;

    console.log("Tip amount ==== ", tipInputAmount.toString());
    await Trikl.tip(card.author.walletAddress, {
      value: tipInputAmount.toString(),
    });
  };
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

//
//
//
//
//
//
//
//

const Body: React.FC<{
  // count: number;
  Trikl: Contract;
  handleTip: () => Promise<void>;
  onDismiss: () => void;
  TipAmountRef: any;
  // onIncrement: () => void;
}> = ({ Trikl, handleTip, onDismiss, TipAmountRef }) => {
  console.log(Trikl, TipAmountRef);
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center m-0">
      <IonItem className="flex flex-col gap-5">
        <IonLabel position="stacked">Enter Amount To Tip (MATIC)</IonLabel>
        <IonInput ref={TipAmountRef}></IonInput>
      </IonItem>
      <IonButton expand="block" onClick={() => handleTip()}>
        Tip
      </IonButton>
      <IonButton expand="block" onClick={() => onDismiss()}>
        Cancel
      </IonButton>
    </div>
  );
};

//
//
//
//
//
//
//
const ModalExample: React.FC<{
  Trikl: Contract;
  handleTip: () => Promise<void>;
  TipAmountRef: any;
}> = ({ Trikl, handleTip, TipAmountRef }) => {
  const handleDismiss = () => {
    dismiss();
  };

  /**
   * First parameter is the component to show, second is the props to pass
   */
  const [present, dismiss] = useIonModal(Body, {
    Trikl,
    handleTip,
    onDismiss: handleDismiss,
    TipAmountRef,
  });

  return (
    <IonButton
      expand="block"
      onClick={() => {
        present({
          cssClass: "my-class",
        });
      }}
    >
      <IonIcon icon={giftOutline} slot="start" />
      Tip
    </IonButton>
  );
};
