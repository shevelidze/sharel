import React, { useState } from 'react';
import styles from './TextField.module.css';
import VisibilityIndicator from './VisibilityIndicator';

export interface TextFieldProps {
  isHidable?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  error?: string;
  placeholder?: string;
}

const TextField: React.FC<TextFieldProps & React.PropsWithChildren> = ({
  isHidable,
  inputProps,
  error,
  placeholder,
  children,
}) => {
  const [isHidden, setIsHidden] = useState(Boolean(isHidable));

  const rootClassList: [string] = [styles.root];

  if (error !== undefined) rootClassList.push(styles.withError);

  return (
    <div className={rootClassList.join(' ')}>
      <div className={styles.inputWrapper}>
        <input
          type={isHidden ? 'password' : 'text'}
          placeholder={placeholder}
          {...inputProps}
        />
        <div className={styles.icons}>
          {children}
          {isHidable ? (
            <VisibilityIndicator
              isHidden={isHidden}
              onClick={() => {
                setIsHidden(!isHidden);
              }}
            />
          ) : null}
        </div>
      </div>

      {error !== undefined ? <div className={styles.error}>{error}</div> : null}
    </div>
  );
};

export default TextField;
