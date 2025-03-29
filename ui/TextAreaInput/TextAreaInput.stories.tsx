import { Meta } from '@storybook/react';
import { TextAreaInput } from './TextAreaInput';

export default {
  title: 'Designsystem / UI Atoms / Text Area',
  component: TextAreaInput,
  argTypes: {
    label: { control: 'text' },
    required: { control: 'boolean' },
    rows: { control: 'number' },
    name: { control: 'text' },
  },
} as Meta;

export const Default = {
  args: {
    label: 'Enter text',
    required: false,
    rows: 6,
  },
};

export const RequiredField = {
  args: {
    label: 'Required text area',
    required: true,
    rows: 6,
  },
};

export const CustomRows = {
  args: {
    label: 'Custom rows text area',
    required: false,
    rows: 10,
  },
};

export const WithDefaultValue = {
  args: {
    label: 'Text area with default value',
    required: false,
    rows: 6,
    defaultValue: 'This is a default value',
  },
};

export const WithMultiLinePlaceholder = {
  args: {
    label: 'Text area with multi-line placeholder',
    required: false,
    rows: 6,
    placeholder: 'This is line 1\nThis is line 2\nThis is line 3',
  },
};

export const ResizeEnabled = {
  args: {
    label: 'Drag conrer to resize',
    required: false,
    resizeEnabled: true,
  },
};
