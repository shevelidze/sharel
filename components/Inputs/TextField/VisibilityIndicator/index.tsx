import React from 'react';
import VisibleIcon from './visible_icon.svg';
import HiddenIcon from './hidden_icon.svg';
import styles from './VisibilityIndicator.module.css';

interface VisibilityIndicatorProps {
  isHidden: boolean;
  onClick?: () => void;
}

const VisibilityIndicator: React.FC<VisibilityIndicatorProps> = ({
  isHidden,
  onClick,
}) => {
  let Icon: any = isHidden ? VisibleIcon : HiddenIcon;
  return (
    <Icon
      className={[styles.root, 'visibility-icon'].join(' ')}
      onClick={onClick}
    />
  );
};

export default VisibilityIndicator;
