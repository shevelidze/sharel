import React from 'react';
import useMobile from '../../lib/useMobile';
import TextField, { type TextFieldProps } from '../TextField';
import SearchIcon from './SearchIcon.svg';
import styles from './Search.module.css';

export interface SearchProps {
  inputProps?: TextFieldProps['inputProps'];
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ inputProps }, ref) => {
    const isMobile = useMobile();
    return (
      <div className={styles.root}>
        <TextField placeholder="Search" ref={ref} inputProps={inputProps} />
        <SearchIcon />
      </div>
    );
  }
);

export default Search;
