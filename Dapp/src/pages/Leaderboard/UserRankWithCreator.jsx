import { IonContent, IonHeader, IonItem } from "@ionic/react";
import axios from "axios";
import React, { useState } from "react";

const UserRankWithCreator = ({ creatorInfo }) => {
  // const [allBlogs, setAllBlogs] = useState<any[]>([])

  // const getAllBlogs = () => {
  //     axios.post("", )
  // }

  return (
    <div className="flex flex-col w-full mb-36">
      <IonItem className="w-full mb-3">
        <IonHeader class="w-full mx-auto">
          <h2 className="text-center flex justify-center text-lightAccent py-10">
            {creatorInfo?.name}'s Leaderboard
          </h2>
        </IonHeader>
      </IonItem>

      {StaticFollowerData.map((user, index) => (
        <IonItem key={index} lines="full" className="mb-1">
          <div className="flex justify-between items-center w-full px-2">
            <div className="text-left">{user.name}</div>
            <div>{user.score}</div>
          </div>
        </IonItem>
      ))}
    </div>
  );
};

export default UserRankWithCreator;

const StaticFollowerData = [
  {
    name: "JohnCrypto",
    score: 123,
  },

  {
    name: "Zeph Burton",
    score: 103,
  },

  {
    name: "Harmony Mann",
    score: 97,
  },

  {
    name: "Matilda Dunn",
    score: 95,
  },

  {
    name: "Trix Keller",
    score: 91,
  },

  {
    name: "Jocelyn Bond",
    score: 83,
  },

  {
    name: "Logan Wilkerson",
    score: 82,
  },

  {
    name: "Harmony Mann",
    score: 97,
  },

  {
    name: "Matilda Dunn",
    score: 95,
  },

  {
    name: "Trix Keller",
    score: 91,
  },

  {
    name: "Jocelyn Bond",
    score: 83,
  },

  {
    name: "Logan Wilkerson",
    score: 82,
  },
];
