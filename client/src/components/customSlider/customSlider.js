import React from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types';
import { SliderContainer, SliderLabel } from './SliderStyles';

const CustomSlider = ({ value, onValueChange, minimumValue, maximumValue, step, label }) => {
  return (
    <SliderContainer>
      {label && <SliderLabel>{label}</SliderLabel>}
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor="#6200EE"
        maximumTrackTintColor="#000000"
        thumbTintColor="#6200EE"
      />
      <Text>{value}</Text>
    </SliderContainer>
  );
};

CustomSlider.propTypes = {
  value: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
  minimumValue: PropTypes.number,
  maximumValue: PropTypes.number,
  step: PropTypes.number,
  label: PropTypes.string,
};

CustomSlider.defaultProps = {
  minimumValue: 0,
  maximumValue: 100,
  step: 1,
  label: '',
};

export default CustomSlider;
