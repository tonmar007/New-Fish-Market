import { useState, useEffect } from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import { useParams } from "react-router-dom";
import { db } from "../base";
import { doc, setDoc, deleteDoc, onSnapshot } from "firebase/firestore";

function App() {
  const [fishes, setFishes] = useState({});
  const [order, setOrder] = useState({});
  const { storeId } = useParams();

  const fishesRef = doc(db, `${storeId}`, "fishes");
  
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
    const copyFishes = { ...fishes };
    copyFishes[`fish${Date.now()}`] = fish;
    setFishes(copyFishes);
    setDoc(doc(db, `${storeId}`, "fishes"), copyFishes);
  };

  const loadSampleFishes = () => {
    setFishes( { ...fishes, ...sampleFishes});
    setDoc(doc(db, `${storeId}`, "fishes"), { ...fishes, ...sampleFishes});
  };

  const addToOrder = (key) => {
    const copyOrder = { ...order };
    copyOrder[key] = order[key] + 1 || 1;
    setOrder(copyOrder);
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
      />
      <Inventory 
        addFish={addFish} 
        loadSampleFishes={loadSampleFishes} 
      />
    </div>
  );
}

export default App;
