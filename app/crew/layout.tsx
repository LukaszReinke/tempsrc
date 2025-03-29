import { AuthNavBar } from '@hd/components';
import { CONTAINER_WIDTHS } from '@hd/consts';

export default function CrewPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthNavBar />

      <div
        className="p-3 md:p-6 my-4 md:my-10 mx-auto"
        style={{ maxWidth: CONTAINER_WIDTHS.MAX_MAIN_WIDTH }}
      >
        {children}
      </div>
    </>
  );
}
