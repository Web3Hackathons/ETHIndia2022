import React, { useState, useRef, useEffect } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonPage,
  IonTitle,
  useIonAlert,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import "swiper/swiper.min.css";
import "@ionic/react/css/ionic-swiper.css";
import { heartOutline, heart, giftOutline } from "ionicons/icons";
import { ethers } from "ethers";
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

  // const [blogTitleDB, setBlogTitleDB] = useState<string>("");
  // const [blogImgDB, setBlogImgDB] = useState<string>("");
  // const [blogContentDB, setBlogContentDB] = useState<string>("");

  // const [accountaddress, setAccountAddress] = useState<string>("");
  // const [nameFromDatabase, setNameFromDatabase] = useState<string>("");
  // const [aboutFromDatabase, setAboutFromDatabase] = useState<string>("");
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // const [isProfileAvailable, setIsProfileAvailable] = useState<boolean>(false);

  // const getBlogInfo = async (addressParam: any) => {
  //   await axios
  //     .post("http://localhost:4000/api/creators//getblogs", {
  //       blogCID: addressParam,
  //     })
  //     .then((res) => {
  //       setNameFromDatabase(res.data.name);
  //       setAboutFromDatabase(res.data.about);
  //       setIsProfileAvailable(true);
  //     })
  //     .catch((err) => {
  //       setIsProfileAvailable(false);
  //       console.log("some error occured > ", err);
  //     });
  // };

  // const getPostContent = (inputUrl: string) => {
  //   axios.get(inputUrl).then((res) => {
  //     console.log(res);
  //     return res;
  //   });
  // };

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
                        {card.author.name.slice(0, 15)}
                        {card.author.name.length > 15 ? "..." : ""}
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
              <EngageMenu />
            </SwiperSlide>
          ))}
        </Swiper>
      </IonContent>
    </IonPage>
  );
};
export default EachBlogCard;

const EngageMenu: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [isLiked, setIsLiked] = useState(false);

  const [presentAlert] = useIonAlert();
  const address = process.env.REACT_APP_CONTRACT;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  //const provider = process.env.REACT_APP_AURORA_URL;
  const Trikl = new ethers.Contract(
    "0x8a16ecb5128d30ec56c74bd0f5f75ffdb49391cb",
    abi,
    provider.getSigner()
  );

  // console.log(
  //   "address --->",
  //   address,
  //   "abi --->",
  //   abi,
  //   "provider --->",
  //   provider
  // );

  const handleClick = () => {
    axios
      .post("http://localhost:4000/api/likes/add-like", {
        blogCID: "12345gfhfhfh",
        nLikes: "1",
        author: {
          walletAddress: "0x9DC61eEc0C05BFA16eE1DC51B3a0aED358E18Eb521",
          profilePic: "string",
          name: "Shalu",
        },
      })
      .then(function (response) {
        presentAlert({
          header: "Congratulations 🤩",
          subHeader: "",
          message: "You got +10 points for the liking this post 🥳",
          buttons: ["OK"],
        });
        // console.log("response", response);
      })
      .catch((error) => {
        console.log("error", error.response.data.error);
        presentAlert({
          header: "Sorry! 🙇🏻",
          subHeader: error.response.data.error,
          message: "You already earned your reward for the liking this post 🥳",
          buttons: ["OK"],
        });
      });
  };

  const handleTip = async () => {
    const num = 100000000000000;
    await Trikl.tip("0xf3fb3cb8b34f5331b82219183c5adef40ee10ba5", {
      value: num,
    });
  };

  return (
    <div className="bg-white flex justify-around gap-2 w-5/6 mx-auto rounded-full text-sm mt-5 mb-10 drop-shadow-md">
      {/* <button > */}
      <IonButton fill="clear" shape="round" onClick={handleClick}>
        <IonIcon icon={isLiked ? heart : heartOutline} slot="start" />
        {isLiked ? "Liked" : "Like"}
      </IonButton>

      <IonButton fill="clear" shape="round" onClick={handleTip}>
        <IonIcon icon={giftOutline} slot="start" />
        Tip 0.0001 ETH
      </IonButton>
      {/* </button> */}
    </div>
  );
};
