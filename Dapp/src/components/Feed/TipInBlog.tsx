import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  useIonModal,
} from "@ionic/react";
import { Contract } from "ethers";
import { giftOutline } from "ionicons/icons";

const Body: React.FC<{
  Trikl: Contract;
  handleTip: () => Promise<void>;
  onDismiss: () => void;
  TipAmountRef: any;
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

export default ModalExample;
