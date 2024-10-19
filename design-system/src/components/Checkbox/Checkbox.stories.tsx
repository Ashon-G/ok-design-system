// src/components/Checkbox/Checkbox.stories.tsx

import React, { useState } from 'react';
import Checkbox from './Checkbox';
import { StoryFn, Meta } from '@storybook/react';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
} as Meta;

interface CheckboxArgs {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange prop
}

const Template: StoryFn<CheckboxArgs> = (args) => {
  const [checked, setChecked] = useState(args.checked);
  
  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={(e) => {
        setChecked(e.target.checked);
        args.onChange(e); // Call the onChange passed in args
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: '    ..I agree to the terms and conditions',
  checked: true,
  onChange: () => {}, // Placeholder for onChange
};
