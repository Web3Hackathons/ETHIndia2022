import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonRouterLink,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  homeOutline,
  searchOutline,
  peopleOutline,
  personCircleOutline,
  walletOutline,
} from "ionicons/icons";

import Feed from "./pages/Feed/Feed";
import Profile from "./pages/Profile/Profile";
import Community from "./pages/Leaderboard/Leaderboard";
import Search from "./pages/Search/Search";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/tailwind.css";
import TriklLogo from "./assets/TriklLogo2.png";

// React Icons
import { TfiWrite } from "react-icons/tfi";
import LoginPage from "./pages/Login/LoginPage";
import NewPost from "./pages/NewPost/NewPost";
import { useState } from "react";

setupIonicReact();

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isProfileAvailable, setIsProfileAvailable] = useState<boolean>(false);
  const [accountaddress, setAccountAddress] = useState<string>("");
  const [nameFromDatabase, setNameFromDatabase] = useState<string>("");
  const [aboutFromDatabase, setAboutFromDatabase] = useState<string>("");

  return (
    <IonApp className="font-poppins">
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-padding-left ion-padding-top">
            <div className="flex justify-between items-center">
              <div>
                <IonRouterLink href="/feed">
                  <img src={TriklLogo} alt="Trikl Logo" width="30px" />
                </IonRouterLink>
              </div>
              <IonButton fill="clear" href="/newpost">
                <TfiWrite className="w-4" />
              </IonButton>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/feed">
                <Feed />
              </Route>
              <Route exact path="/search">
                <Search />
              </Route>
              <Route path="/community">
                <Community />
              </Route>
              <Route path="/profile">
                <Profile
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  isProfileAvailable={isProfileAvailable}
                  setIsProfileAvailable={setIsProfileAvailable}
                  accountaddress={accountaddress}
                  setAccountAddress={setAccountAddress}
                  nameFromDatabase={nameFromDatabase}
                  setNameFromDatabase={setNameFromDatabase}
                  aboutFromDatabase={aboutFromDatabase}
                  setAboutFromDatabase={setAboutFromDatabase}
                />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/newpost">
                <NewPost
                  accountaddress={accountaddress}
                  setAccountAddress={setAccountAddress}
                />
              </Route>
              <Route exact path="/">
                <Redirect to="/feed" />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="feed" href="/feed">
                <IonIcon icon={homeOutline} className="w-4" />
                <IonLabel>
                  <span className="text-xs">Feed</span>
                </IonLabel>
              </IonTabButton>

              <IonTabButton tab="community" href="/community">
                <IonIcon icon={peopleOutline} className="w-4" />
                <IonLabel>
                  <span className="text-xs">Leaderboard</span>
                </IonLabel>
              </IonTabButton>
              <IonTabButton tab="profile" href="/profile">
                <IonIcon icon={personCircleOutline} className="w-4" />
                <IonLabel>
                  <span className="text-xs">Profile</span>
                </IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonContent>
    </IonApp>
  );
};

export default App;
