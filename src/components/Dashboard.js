import { useState, useEffect } from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import { useParams } from "react-router-dom";
import { db } from "../dbConnection";
import { doc, setDoc, onSnapshot } from "firebase/firestore";

function Dashboard() {
  const [fishes, setFishes] = useState({});
  const [order, setOrder] = useState({});
  const { storeId } = useParams();
  const COLLECTION_NAME = "fishes";
  const fishesRef = doc(db, `${storeId}`, COLLECTION_NAME);
  
  useEffect(() => {
    const localStorageRef = localStorage.getItem(storeId);
    if(localStorageRef){
      setOrder(JSON.parse(localStorageRef));
    }

    onSnapshot(fishesRef, (doc) => {
      const dbFishes = doc.data();
      if(dbFishes){
        setFishes(dbFishes);
      }
    })
  }, []);

  useEffect(() => {
    if(Object.keys(order).length != 0){
      localStorage.setItem(storeId, JSON.stringify(order));
    }
  }, [order]);

  const addFish = (fish) => {
    const oldFishes = { ...fishes };
    oldFishes[`fish${Date.now()}`] = fish;
    setFishes(oldFishes);
    setDoc(doc(db, `${storeId}`, COLLECTION_NAME), oldFishes);
  };

  const loadSampleFishes = () => {
    setFishes( { ...fishes, ...sampleFishes});
    setDoc(doc(db, `${storeId}`, COLLECTION_NAME), { ...fishes, ...sampleFishes});
  };

  const updateFish = ( key, updatedFish ) => {
    const oldFishes = { ...fishes };
    oldFishes[key] = updatedFish;
    setFishes(oldFishes);
  };

  const deleteFish = key => {
    const oldFishes = { ...fishes };
    delete oldFishes[key];
    setFishes(oldFishes);
    setDoc(doc(db, `${storeId}`, COLLECTION_NAME), oldFishes);
  };

  const addToOrder = key => {
    const oldOrder = { ...order };
    oldOrder[key] = oldOrder[key] + 1 || 1;
    setOrder(oldOrder);
  };

  const removeFromOrder = key => {
    const oldOrder = { ...order };
    delete oldOrder[key];
    setOrder(oldOrder);
  };

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
        <ul className="fishes">
          {Object.keys(fishes).map((key) => (
            <Fish 
              key={key}
              index={key}
              details={fishes[key]} 
              addToOrder={addToOrder} 
            />
          ))}
        </ul>
      </div>
      <Order 
        fishes={fishes} 
        order={order} 
        removeFromOrder={removeFromOrder}
      />
      <Inventory 
        addFish={addFish} 
        updateFish={updateFish}
        deleteFish={deleteFish}
        loadSampleFishes={loadSampleFishes}
        fishes={fishes}
        storeId = {storeId}
      />
    </div>
  );
}

export default Dashboard;