import React, { useState } from 'react';
import TextField from '../TextField';
import styles from './HidableSearch.module.css';

function SearchIcon(onClick: any) {
  return <div onClick={onClick}>search icon</div>;
}

const HidableSearch: React.FC = () => {
  const [isClosed, setIsClosed] = useState(false);

  const rootClassList = [styles.root];
  if (isClosed) rootClassList.push(styles.closed);

  return (
    <div className={rootClassList.join(' ')}>
      <TextField placeholder="Search" />
      <SearchIcon onClick={setIsClosed.bind(null, !isClosed)} />
    </div>
  );
};

export default HidableSearch;
