import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { View } from 'react-native';
import { ButtonUI } from '../ButtonUI';

// Mock expo-haptics before importing the component
jest.mock('expo-haptics', () => ({
  ImpactFeedbackStyle: {
    Soft: 'soft',
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
    Rigid: 'rigid',
  },
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  selectionAsync: jest.fn(),
}));

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  return Reanimated;
});

describe('ButtonUI', () => {
  it('renders children text', () => {
    const { getByText } = render(<ButtonUI>Press me</ButtonUI>);
    expect(getByText('Press me')).toBeTruthy();
  });

  it('fires onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <ButtonUI onPress={onPress}>Press me</ButtonUI>
    );

    fireEvent.press(getByText('Press me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders with startContent and endContent', () => {
    const { getByText } = render(
      <ButtonUI
        startContent={<View />}
        endContent={<View />}
      >
        Content
      </ButtonUI>
    );

    expect(getByText('Content')).toBeTruthy();
  });
});
