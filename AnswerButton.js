import React from 'react';

const AnswerButton = ({ answer, className, onClick, disabled }) => {
  return (
    <button 
      className={`answer-button ${className}`} 
      onClick={onClick} 
      disabled={disabled}
      dangerouslySetInnerHTML={{ __html: answer }}
    />
  );
};

export default AnswerButton;