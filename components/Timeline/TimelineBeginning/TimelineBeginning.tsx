export const TimelineBeginning = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="w-full flex items-center text-zinc-600 my-4 pl-14">
      <div className="flex-grow border-t border-zinc-600" />
      <span className="mx-4 text-lg font-semibold whitespace-nowrap">Today {formattedDate}</span>
      <div className="flex-grow border-t border-zinc-600" />
    </div>
  );
};
