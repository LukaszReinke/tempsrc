'use client';

import { FormWorkshopReport, LinkCard, FormContestReport } from '@hd/components';
import { EXTERNAL_WEB_URLS } from '@hd/consts';
import { LinkText } from '@hd/ui';
import { useState } from 'react';

type FormType = 'workshop' | 'contest';

export default function ContactPage() {
  const [formState, setFormState] = useState<FormType | null>(null);

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-200 relative">
      <div className="max-w-4xl mx-auto p-6 pb-20 pt-20 lg:pt-32 align-center justify-center">
        <h1 className="text-3xl font-semibold text-zinc-300/75 pb-8">Get in Touch with Us</h1>
        <p className="text-md pb-24 xl:text-lg 2xl:text-lg text-justify text-zinc-300/75">
          {`Have a question or want to chat? Feel free to reach out to us on `}
          <LinkText target="_blank" href={EXTERNAL_WEB_URLS.INSTAGRAM_URL}>
            Instagram
          </LinkText>
          {` or `}
          <LinkText target="_blank" href={EXTERNAL_WEB_URLS.FACEBOOK_URL}>
            Facebook
          </LinkText>
          {`. For event-related
        requests, use the forms below to report a workshop or contest and let us know if you'd like
        to add an event to our calendar.`}
        </p>
        <div className="flex gap-8 justify-center mb-16">
          {LINK_CARDS.map((card, i) => (
            <LinkCard
              key={i}
              heading={card.heading}
              onClick={() => setFormState(card.state as FormType)}
              isActive={formState === card.state}
            />
          ))}
        </div>

        {formState === 'contest' && <FormContestReport />}
        {formState === 'workshop' && <FormWorkshopReport />}
      </div>
    </div>
  );
}

const LINK_CARDS = [
  {
    state: 'workshop',
    heading: 'Report a Workshop',
  },
  {
    state: 'contest',
    heading: 'Report a Contest',
  },
];
