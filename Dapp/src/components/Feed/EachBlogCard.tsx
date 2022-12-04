import React, { useState, useRef, useEffect } from "react";
import { IonContent, IonImg, IonItem, IonPage } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import "swiper/swiper.min.css";
import "@ionic/react/css/ionic-swiper.css";

import EngageMenu from "./EngageSecBlog";

const EachBlogCard: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}api/blogs/`)
      .then((response) => {
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
