import React from 'react';
import useMobile from '../../lib/useMobile';
import TextField from '../TextField';
import styles from './Search.module.css';

const Search: React.FC<{ onCloseSearchClick?: () => void }> = ({
  onCloseSearchClick,
}) => {
  const isMobile = useMobile();
  return (
    <div className={styles.root}>
      <TextField placeholder="Search" />
      {isMobile ? (
        <button onClick={onCloseSearchClick}>Close Search</button>
      ) : null}
    </div>
  );
};

export default Search;
