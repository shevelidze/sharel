import React from 'react';

interface TextFieldProps {
  isHidable?: boolean;
}

const TextFileld: React.FC<TextFieldProps> = (props) => {
  return <input type="text" />;
};

export default TextFileld;
