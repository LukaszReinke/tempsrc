import { ImageProps } from 'next/image';

export const ExternalDomainImage = (props: ImageProps) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    {...props}
    src={props.src as string}
    alt={props.alt}
    loading="lazy"
    className={`${props.className} object-cover h-full w-full`}
  />
);
