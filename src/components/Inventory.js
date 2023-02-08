import { useEffect, useState } from "react";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import PropTypes from "prop-types";
import Login from "./Login";
import { FacebookAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { db, authApp} from "../base";
import { doc, onSnapshot, updateDoc, setDoc } from "firebase/firestore";

function Inventory({ addFish, loadSampleFishes, fishes, updateFish, deleteFish, storeId }) {
  const [user, setUser] = useState({ 
    uid: null,
    owner: null 
  });

  const [store, setStore] = useState({});

  useEffect(() => {
    authApp.onAuthStateChanged(user => {
      if(user){
        authHandler({ user });
      }
    })
  }, []);

  useEffect(() => {
    const fishesRef = doc(db, `${storeId}`, "owner");
    onSnapshot(fishesRef, (docc) => {
      setStore(docc.data());
    });
  }, []);

  const authHandler = async (authData) => {
    if(!store) {
      await setDoc(doc(db, `${storeId}`, "owner"), { data: authData.user.uid});
    }
    
    setUser({
      uid: authData.user.uid,
      owner: store?.data || authData.user.uid
    });
  };
  
  const authenticate = provider => {
    if(provider == "Facebook"){
    const facebookAuthProvider = new FacebookAuthProvider();
    signInWithPopup(authApp, facebookAuthProvider)
      .then(authHandler)
      .catch((err) => {
        console.log(err);
      });
    }

    if(provider == "Github"){
    const githubAuthProvider = new GithubAuthProvider();
    signInWithPopup(authApp, githubAuthProvider)
      .then(authHandler)
      .catch((err) => {
        console.log(err);
      });
    }
  };

  const Logout = async () => {
    await authApp.signOut();
    setUser({ uid: null });
  };

  const logout = <button onClick={Logout}>Log Out!</button>;

  if(!user.uid){
    return <Login authenticate={authenticate}/>;
  }

  if(user.uid !== user.owner) {
    return (
      <div>
        <p>Sorry you are not the owner!</p>
        {logout}
      </div>
    );
  }

  return (
    <div className="inventory">
      <h2>Inventory!!!</h2>
      {logout}
      {Object.keys(fishes).map(key => (
        <EditFishForm 
          key={key}
          index={key} 
          fish={fishes[key]}
          updateFish={updateFish}
          deleteFish={deleteFish}
        />
      ))}
      <AddFishForm addFish={addFish}/>
      <button onClick={loadSampleFishes}>Load Sample Fishes</button>
    </div>
  )
};

Inventory.propTypes = {
  fishes: PropTypes.object,
  addFish: PropTypes.func,
  loadSampleFishes: PropTypes.func,
  updateFish: PropTypes.func,
  deleteFish: PropTypes.func
};

export default Inventory;
