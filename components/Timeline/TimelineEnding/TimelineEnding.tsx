import { ROUTES } from '@hd/consts';
import { TransitionLink } from '@hd/ui';

export const TimelineEnding = () => {
  return (
    <div className="w-full flex items-center text-zinc-600 my-4 pl-14">
      <div className="flex-grow border-t border-zinc-600" />
      <span className="mx-4 text-lg font-semibold">
        <span className="hover:text-amber-500">
          <TransitionLink href={ROUTES.CONTACT}>
            That’s all we’ve got — try adjusting filters or let us know about an event
          </TransitionLink>
        </span>
      </span>
      <div className="flex-grow border-t border-zinc-600" />
    </div>
  );
};
