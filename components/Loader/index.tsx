import React from 'react';
import LoaderIcon from './LoaderIcon.svg';
import styles from './Loader.module.css';

const Loader: React.FC = () => {
  return <LoaderIcon className={styles.root} />;
};

export default Loader;
