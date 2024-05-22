import React from 'react';
import PropTypes from 'prop-types';
import { BoxContainer } from './BlackBoxStyles';

const BlackBox = ({ children, style }) => {
  return <BoxContainer style={style}>{children}</BoxContainer>;
};

BlackBox.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

export default BlackBox;
