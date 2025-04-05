import { Input, InputProps } from '@hd/ui';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

export const DateInput = (props: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^\d.]/g, '');

    if (value.length > 2 && value.charAt(2) !== '.') {
      value = value.slice(0, 2) + '.' + value.slice(2);
    }
    if (value.length > 5 && value.charAt(5) !== '.') {
      value = value.slice(0, 5) + '.' + value.slice(5);
    }

    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    e.target.value = value;
  };

  return (
    <Input
      {...props}
      icon={<CalendarDaysIcon className="w-5 h-5 text-zinc-400" />}
      type="text"
      onChange={handleChange}
      placeholder="DD.MM.YYYY"
      pattern="\d{2}\.\d{2}\.\d{4}"
      maxLength={10}
    />
  );
};
