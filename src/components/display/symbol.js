import React from "react";

export const Symbol = ({show, children}) => (<span className={show ? '' : 'inactive'}>{children}</span>);

export const Delimiter = ({show}) => <Symbol show={show}>:</Symbol>;

export const Minus = ({show}) => <Symbol show={show}>-</Symbol>;