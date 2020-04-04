import * as React from 'react';

export const nevRef = React.createRef();

export const navigate = (name, params) => {
  nevRef.current?.navigate(name, params);
};
