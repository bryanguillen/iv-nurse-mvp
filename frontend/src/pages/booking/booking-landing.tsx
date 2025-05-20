import { Link } from 'react-router-dom';

import { PageContainer, Button } from '@/components';

import { useBooking } from './booking-provider';

export function BookingLanding() {
  const { name } = useBooking();

  return (
    <PageContainer className="max-w-lg">
      <main>
        <HeroFooterContainer>
          <h1 className="text-3xl font-bold tracking-tight">
            Feel Better, Faster - IV Therapy Delivered to You
          </h1>
          <p className="text-sm text-muted max-w-2xl">
            Schedule your visit with {name} in 60 seconds. We're here to provide the care you need.
          </p>
          <Button asChild size="lg" className="w-full md:w-auto">
            <Link to="create">Book today</Link>
          </Button>
        </HeroFooterContainer>
      </main>

      <footer>
        <HeroFooterContainer>
          <h2 className="text-2xl font-bold tracking-tight">Ready to start?</h2>
          <p className="text-sm text-muted">Schedule your visit with {name} in 60 seconds.</p>
          <Button asChild size="lg" className="w-full md:w-auto">
            <Link to="create">Book today</Link>
          </Button>
        </HeroFooterContainer>
      </footer>
    </PageContainer>
  );
}

function HeroFooterContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        {children}
      </div>
    </div>
  );
}
