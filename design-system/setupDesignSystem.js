const fs = require('fs');
const path = require('path');

// Helper function to create directories recursively
const createDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Helper function to write files
const createFile = (filePath, content) => {
  fs.writeFileSync(filePath, content, 'utf8');
};

// Base directory for components
const baseDir = 'src/components';

// Global CSS content
const globalCssContent = `
:root {
  --primary-color: #007bff;
  --secondary-color: #ff6600;
  --text-color: #333;
  --border-color: #000;
  --shadow-color: rgba(0, 0, 0, 0.2);
  --border-radius: 8px;
  --font-family: 'Roboto', sans-serif;
}

body {
  font-family: var(--font-family);
  background-color: #fff;
  color: var(--text-color);
}
`;

// Button Component
const buttonTsxContent = `
import React from 'react';
import './button.css';

export interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ label, variant = 'primary', onClick }) => {
  return (
    <button className={\`button-base button-\${variant}\`} onClick={onClick}>
      {label}
    </button>
  );
};
`;

const buttonCssContent = `
@import '../../styles/global.css';

.button-base {
  padding: 12px 24px;
  border-radius: var(--border-radius);
  font-size: 16px;
  border: 2px solid var(--border-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.button-primary {
  background-color: var(--primary-color);
  color: white;
  box-shadow: 4px 4px var(--shadow-color);
}

.button-primary:hover {
  background-color: #0056b3;
  box-shadow: none;
}

.button-secondary {
  background-color: var(--secondary-color);
  color: white;
  box-shadow: 4px 4px var(--shadow-color);
}

.button-secondary:hover {
  background-color: #cc5200;
  box-shadow: none;
}
`;

const buttonStoryContent = `
import React from 'react';
import { StoryFn } from '@storybook/react';
import { Button, ButtonProps } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
};

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary Button',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary Button',
  variant: 'secondary',
};
`;

// Card Component
const cardTsxContent = `
import React from 'react';
import './card.css';

export interface CardProps {
  title: string;
  content: string;
}

export const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <p className="card-content">{content}</p>
    </div>
  );
};
`;

const cardCssContent = `
@import '../../styles/global.css';

.card {
  padding: 16px;
  background-color: #fff;
  border: 2px solid var(--border-color);
  box-shadow: 6px 6px var(--shadow-color);
  border-radius: var(--border-radius);
}

.card-title {
  font-size: 18px;
  color: var(--primary-color);
}

.card-content {
  color: var(--text-color);
}
`;

const cardStoryContent = `
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
`;

// Input Component
const inputTsxContent = `
import React from 'react';
import './input.css';

export interface InputProps {
  placeholder: string;
  type?: string;
}

export const Input: React.FC<InputProps> = ({ placeholder, type = 'text' }) => {
  return <input className="input" type={type} placeholder={placeholder} />;
};
`;

const inputCssContent = `
@import '../../styles/global.css';

.input {
  padding: 12px;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 16px;
  box-shadow: 4px 4px var(--shadow-color);
  transition: border 0.3s ease;
}

.input:focus {
  outline: none;
  border-color: var(--primary-color);
}
`;

const inputStoryContent = `
import React from 'react';
import { StoryFn } from '@storybook/react';
import { Input, InputProps } from './Input';

export default {
  title: 'Components/Input',
  component: Input,
};

const Template: StoryFn<InputProps> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Type here...',
};
`;

// Function to create components
const createComponent = (name, tsxContent, cssContent, storyContent) => {
  const componentDir = path.join(baseDir, name);
  createDir(componentDir);

  createFile(path.join(componentDir, `${name}.tsx`), tsxContent);
  createFile(path.join(componentDir, `${name}.stories.tsx`), storyContent);
  createFile(path.join(componentDir, `${name.toLowerCase()}.css`), cssContent);
};

// Create global styles
createDir('src/styles');
createFile('src/styles/global.css', globalCssContent);

// Create Button component
createComponent('Button', buttonTsxContent, buttonCssContent, buttonStoryContent);

// Create Card component
createComponent('Card', cardTsxContent, cardCssContent, cardStoryContent);

// Create Input component
createComponent('Input', inputTsxContent, inputCssContent, inputStoryContent);

// Create index.ts to export components
const indexTsContent = `
export { Button } from './Button/Button';
export { Card } from './Card/Card';
export { Input } from './Input/Input';
`;
createFile(path.join(baseDir, 'index.ts'), indexTsContent);

console.log('Component library structure created successfully!');
