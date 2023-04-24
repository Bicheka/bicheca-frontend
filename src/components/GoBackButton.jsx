import React from 'react';
import { useNavigate } from 'react-router';


function GoBackButton() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // go back
  };

  return (
    <button onClick={handleGoBack}>
      Go Back
    </button>
  );
}

export default GoBackButton;