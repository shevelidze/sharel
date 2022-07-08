import React, { useState } from 'react';
import Switcher from '../Switcher';
import Header from '../Header';
import Search from '../Search';

const HeaderWithSearch: React.FC = () => {
  const [searchIsOpened, setSearchIsOpened] = useState(false);
  const [animationInSwitcherIsDisabled, setAnimationInSwitcherIsDisabled] =
    useState(true);
  function setSearchIsOpenedExtended(value: boolean) {
    if (animationInSwitcherIsDisabled) setAnimationInSwitcherIsDisabled(false);
    setSearchIsOpened(value);
  }

  return (
    <Switcher animationIsDisabled={animationInSwitcherIsDisabled}>
      {searchIsOpened ? (
        <Search onCloseSearchClick={() => setSearchIsOpenedExtended(false)} />
      ) : (
        <Header onSearchButtonClick={() => setSearchIsOpenedExtended(true)} />
      )}
    </Switcher>
  );
};

export default HeaderWithSearch;
