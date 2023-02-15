import PropTypes from "prop-types";

function EditFishForm({ fish, updateFish, index, deleteFish }) {
  const handleChange = (event) => {
    const updatedFish = {
      ...fish,
      [event.currentTarget.name]: event.currentTarget.value
    }
    updateFish(index, updatedFish);
  };

  return (
    <div className="fish-edit">
      <input 
        type="text" 
        name="name"
        onChange={handleChange} 
        value={fish.name} 
      />
      <input 
        type="text" 
        name="price"
        onChange={handleChange} 
        value={fish.price} 
      />
      <select 
        type="text" 
        name="status"
        onChange={handleChange} 
        value={fish.status}
      >
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>
      <textarea 
        name="desc"
        onChange={handleChange} 
        value={fish.desc} 
      />
      <input 
        type="text" 
        name="image"
        onChange={handleChange} 
        value={fish.image} 
      />
      <button onClick={() => deleteFish(index)}>
        Remove Fish
      </button>
    </div>
  );
};

EditFishForm.propTypes = {
  fish: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    desc: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number
  }),
  updateFish: PropTypes.func,
  index: PropTypes.string,
  deleteFish: PropTypes.func
};

export default EditFishForm;
