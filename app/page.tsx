import { LinkCard } from '@hd/components';
import { ROUTES } from '@hd/consts';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-200 relative">
      <div className="relative w-full max-w-1200 h-[300px] sm:h-[480px] md:h-[640px] lg:h-[760px] z-0">
        <Image
          fill
          src="/hds_homepage_image.jpg"
          alt="poledance background"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center pl-16 md:justify-center z-0">
          <div className="md:pt-16">
            <h1 className="text-4xl font-bold text-zinc-100">Be Different</h1>
            <h1 className="text-4xl font-bold text-zinc-400">Be Driven</h1>
            <h1 className="text-4xl font-bold text-zinc-600">Be a Pole Dancer</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 pb-20 pt-20 lg:pt-32">
        <h1 className="text-xl md:text-3xl font-semibold text-zinc-300/75 pb-8">
          Welcome to Highly Driven
        </h1>
        <p className="text-md xl:text-lg 2xl:text-lg text-justify text-zinc-300/75 leading-relaxed">
          Our studio is a premier destination for pole dance enthusiasts that offers a diverse range
          of classes, including pole dance, stretching, aerial dance, and aerial yoga, all designed
          to enhance your strength, flexibility, and confidence. We pride ourselves on fostering a
          supportive and empowering environment where individuals of all skill levels can explore
          and excel in these dynamic art forms.
        </p>

        <h2 className="text-xl md:text-3xl font-semibold text-zinc-300/75 pt-20 lg:pt-32 pb-8">
          <span className="text-amber-500">Empower</span> Your Pole Dance Journey. Track:
          <span className="text-white pl-3">Classes</span>,
          <span className="text-amber-500 pl-3">Workshops</span>, and
          <span className="text-zinc-500 px-3">Contests</span>
          with Ease
        </h2>
        <p className="text-md xl:text-lg 2xl:text-lg text-justify text-zinc-300/75 pb-16 leading-relaxed">
          To ensure you stay connected and informed about our offerings, our website features three
          key tools:
        </p>

        <div className="flex flex-wrap gap-4 lg:gap-8 justify-center items-stretch">
          {CARD_LINKS.map((card) => (
            <LinkCard key={card.href} href={card.href} heading={card.heading} tags={card.tags}>
              {card.text}
            </LinkCard>
          ))}
        </div>
        <h2 className="text-3xl font-semibold text-zinc-300/75 pt-20 pb-8">Missing an event?</h2>
        <p className="text-md xl:text-lg 2xl:text-lg text-justify text-zinc-300/75 pb-16 leading-relaxed">
          {`We're committed to showcasing every exciting workshop and contest for our community. Your
          feedback is essential to ensuring our calendar is always complete and up-to-date. Thank
          you for helping us keep our community informed!`}
        </p>
        <div className="flex justify-center">
          <LinkCard href={ROUTES.CONTACT} heading="Contact us!">
            {`Report any missing event—whether it's a contest or a workshop—and help us keep our
            calendar complete and up-to-date!`}
          </LinkCard>
        </div>
      </div>
    </div>
  );
}

const CARD_LINKS = [
  {
    href: ROUTES.WORKSHOPS,
    heading: 'Workshops Board',
    tags: ['improvement', 'masterClass', 'advancedTrainings'],
    text: 'Discover upcoming workshops led by industry professionals to enrich your learning experience.',
  },
  {
    href: ROUTES.CONTESTS,
    heading: 'Contest Updates',
    tags: ['contest', 'competition'],
    text: 'Stay informed about local and national pole dance competitions.',
  },
  {
    href: ROUTES.CLASSES,
    heading: 'Classes Tracking',
    tags: ['classes', 'trainings'],
    text: 'Stay updated on new class offerings tailored to your skill level and interests.',
  },
];
