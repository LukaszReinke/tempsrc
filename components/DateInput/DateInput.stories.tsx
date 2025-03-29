import { Meta, StoryFn } from '@storybook/react';
import { DateInput } from './DateInput';
import { InputProps } from '@hd/ui';

export default {
  title: 'Designsystem / Page Components / DateInput',
  component: DateInput,
  parameters: {
    controls: {
      expanded: true,
    },
  },
} as Meta;

const Template: StoryFn = (args: InputProps) => <DateInput {...args} />;

export const Default = Template;
Default.args = {
  date: '',
};

export const WithPreFilledDate = Template;
WithPreFilledDate.args = {
  date: '12.03.2025',
};

export const Empty = Template;
Empty.args = {
  date: '',
};
