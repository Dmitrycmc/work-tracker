import React from "react";

const Symbol = ({show, value}) => (<span className={show ? '' : 'inactive'}>{value}</span>);

export const Delimiter = ({show}) => <Symbol show={show} value=':' />;

export const Minus = ({show}) => <Symbol show={show} value='-' />;