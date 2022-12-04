import { Description } from "@ethersproject/properties";
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
  IonRouterLink,
  IonRow,
  IonTextarea,
  useIonAlert,
} from "@ionic/react";
import axios from "axios";
import { ethers } from "ethers";
import React, { useEffect, useRef } from "react";
import { Web3Storage } from "web3.storage";

type propTypes = {
  accountaddress: string;
  setAccountAddress: React.Dispatch<React.SetStateAction<string>>;
};
const NewPost = ({ accountaddress, setAccountAddress }: propTypes) => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const [presentAlert] = useIonAlert();

  const handleLogin = async () => {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    return setAccountAddress(address);
  };

  useEffect(() => {
    handleLogin();
  }, []);

  const TitleInputRef = useRef<HTMLIonInputElement>(null);
  const ImgUrlInputRef = useRef<HTMLIonInputElement>(null);
  const BlogContentInputRef = useRef<HTMLIonTextareaElement>(null);

  const submitBlog = () => {
    const titleVal = TitleInputRef.current?.value;
    const imgUrl = ImgUrlInputRef.current?.value;
    const blogVal = BlogContentInputRef.current?.value;

    const dataToStore = {
      title: titleVal,
      image: imgUrl,
      content: blogVal,
    };

    const postName = `${accountaddress.slice(0, 10)}_${Math.round(
      Math.random() * 10e10
    )}.json`;

    function getAccessToken() {
      return process.env.REACT_APP_WEB3STORAGE_TOKEN;
    }

    function makeStorageClient() {
      return new Web3Storage({ token: getAccessToken()! });
    }
    function makeFileObjects() {
      const postBlob = new Blob([JSON.stringify(dataToStore)], {
        type: "application/json",
      });

      const files = [new File([postBlob], postName)];

      return files;
    }

    const storeFiles = async (files: any) => {
      const client = makeStorageClient();
      const cid = await client.put(files);
      console.log("stored files with cid:", cid);
      return cid;
    };

    const storeFileToIPFS = async () => {
      const postToUpload = makeFileObjects();
      const ipfsRes = await storeFiles(postToUpload);
      const respPostUrl = `https://${ipfsRes}.ipfs.w3s.link/${postName}`;
      console.log("post cid", respPostUrl);
      return respPostUrl;
    };

    const masterFunc = async () => {
      const ipfsUrl = await storeFileToIPFS();
      axios
        .post(`${process.env.REACT_APP_SERVER}api/blogs/create-blog`, {
          blogCID: ipfsUrl.toString(),
          blogContent: blogVal,
          title: titleVal,
          heroImg: imgUrl,
          author: {
            walletAddress: accountaddress,
            name: postName,
          },
        })
        .then(function (response) {
          console.log(response);
          presentAlert({
            header: "Congratulations  🤩 ",
            subHeader: "",
            message: "Your Blog Has Been Posted 🥳 ",
            buttons: ["OK"],
          });
        })
        .catch((error) => {
          console.log("error", error.response);
          presentAlert({
            header: "Sorry! 🙇🏻",
            subHeader: error.response,
            message: "Please login first.",
            buttons: ["OK"],
          });
        });
    };
    masterFunc();
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid>
          <IonHeader class="ion-text-center ion-padding">Write Post</IonHeader>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">
                  <span className="text-xs text-triklGray">Wallet Address</span>
                </IonLabel>
                <IonInput>
                  <span className="text-sm text-triklGray">
                    {accountaddress.slice(0, 5)}...{accountaddress.slice(-5)}
                  </span>
                </IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="floating">Title</IonLabel>
                <IonInput ref={TitleInputRef}></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="floating">Image URL</IonLabel>
                <IonInput ref={ImgUrlInputRef}></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="floating">Type Here</IonLabel>
                <IonTextarea
                  autoGrow={true}
                  ref={BlogContentInputRef}
                ></IonTextarea>
              </IonItem>

              <div className="flex justify-center pt-5">
                <IonButton onClick={submitBlog}>Submit</IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default NewPost;
