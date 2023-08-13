import React from 'react';
import { useNavigate } from 'react-router';
import styles from '../css/goBackButton.module.scss';

function GoBackButton() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // go back
  };

  return (
    <button className={`${styles.btn} btn`} onClick={handleGoBack}>
      Go Back
    </button>
  );
}

export default GoBackButton;