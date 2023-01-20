import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import PropTypes from "prop-types";

function Inventory({ addFish, loadSampleFishes, fishes, updateFish, deleteFish }) {
  return (
    <div className="inventory">
      <h2>Inventory!!!</h2>
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
