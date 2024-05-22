import React from 'react';
import PropTypes from 'prop-types';
import { BoxContainer, Avatar, ContactInfo, ContactName, ContactDetails } from './ContactBoxStyles';

const ContactBox = ({ name, details, avatar }) => {
  return (
    <BoxContainer>
      <Avatar source={{ uri: avatar }} />
      <ContactInfo>
        <ContactName>{name}</ContactName>
        <ContactDetails>{details}</ContactDetails>
      </ContactInfo>
    </BoxContainer>
  );
};

ContactBox.propTypes = {
  name: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default ContactBox;
