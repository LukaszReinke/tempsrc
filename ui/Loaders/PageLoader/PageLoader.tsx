import React, { forwardRef } from 'react';
import Image from 'next/image';

const PageLoader = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="h-[100vh] w-[100vw] flex justify-center items-center">
      <Image width={261} height={147} src="/BeDifferent.png" alt="pole_dance_image" />
    </div>
  );
});

PageLoader.displayName = 'PageLoader';

export { PageLoader };
