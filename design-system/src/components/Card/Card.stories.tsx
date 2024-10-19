
import React from 'react';
import { StoryFn } from '@storybook/react';
import { Card, CardProps } from './Card';

export default {
  title: 'Components/Card',
  component: Card,
};

const Template: StoryFn<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Card Title',
  content: 'This is the content of the card.',
};
