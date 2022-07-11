import React from 'react';

export type ClickHandler = React.MouseEventHandler<HTMLDivElement>;

export type HandlersModifier = (e: ClickHandler) => void;

export type DarknessHookReturn = [
  (newValue: boolean) => void,
  HandlersModifier,
  HandlersModifier
];

const DarknessContext = React.createContext<DarknessHookReturn | null>(null);

export default DarknessContext;
