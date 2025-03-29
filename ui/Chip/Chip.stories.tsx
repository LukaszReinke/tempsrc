import { Chip } from './Chip';

const meta = {
  title: 'Designsystem / UI Atoms / Chip',
  component: Chip,
  argTypes: {
    color: {
      control: {
        type: 'radio',
        options: ['primary', 'secondary', 'danger'],
      },
    },
    variant: {
      control: {
        type: 'radio',
        options: ['solid', 'outline'],
      },
    },
  },
};

export default meta;

export const PrimarySolid = {
  args: {
    color: 'primary',
    variant: 'solid',
    children: 'Primary Solid',
  },
};

export const PrimaryOutline = {
  args: {
    color: 'primary',
    variant: 'outline',
    children: 'Primary Outline',
  },
};

export const SecondarySolid = {
  args: {
    color: 'secondary',
    variant: 'solid',
    children: 'Secondary Solid',
  },
};

export const SecondaryOutline = {
  args: {
    color: 'secondary',
    variant: 'outline',
    children: 'Secondary Outline',
  },
};

export const DangerSolid = {
  args: {
    color: 'danger',
    variant: 'solid',
    children: 'Danger Solid',
  },
};

export const DangerOutline = {
  args: {
    color: 'danger',
    variant: 'outline',
    children: 'Danger Outline',
  },
};
