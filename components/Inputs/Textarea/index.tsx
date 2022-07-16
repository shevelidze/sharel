import React from 'react';
import styles from './Textarea.module.css';

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (
  props
) => <textarea className={styles.root} {...props} />;

export default Textarea;
