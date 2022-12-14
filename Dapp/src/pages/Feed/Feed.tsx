import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import EachBlogCard from "../../components/Feed/EachBlogCard";

const Feed: React.FC = () => {
  return (
    <IonPage>
      <EachBlogCard />
    </IonPage>
  );
};

export default Feed;
