import React, {useState} from 'react';

const GetVoters = ({ voter }) => {


  return (
    <ul className="list">
    {
       Object.keys(voter).map((param, i) => (
        <li key={i}>{`${param} : ${voter[param]}`}</li>
      ))
    }
    </ul>
  );
};

export default GetVoters;