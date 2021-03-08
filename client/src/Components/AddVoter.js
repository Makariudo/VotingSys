import React, {useState} from 'react';

const AddVoter = ({ addVoter }) => {
  const [address, setAdress] = useState('');
  const handleEnter = (e, address) => {
    if (e.keyCode === 13) {
     addVoter(address);
     setAdress('');
    }
  };
  const handleSubmit = () => {
    addVoter(address);
    setAdress('');
  }
  const handleChange = (e) => {
    setAdress(e.target.value);
  };
  return (
    <div className="header">
      <h4 className="header__h1">Entrez une adresse:</h4>
      <input
        className="header__input"
        type="text"
        value={address}
        onChange={handleChange}
        onKeyUp={(e) => handleEnter(e, address)}
      />
      <button onClick={handleSubmit}>Envoyer !</button>
    </div>
  );
};

export default AddVoter;