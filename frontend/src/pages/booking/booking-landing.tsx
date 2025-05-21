import { Link } from 'react-router-dom';
import { Syringe, CalendarCheck, FlaskConical } from 'lucide-react';

import { PageContainer, Button } from '@/components';

import { useBooking } from './booking-provider';

export function BookingLanding() {
  const { organization } = useBooking();

  return (
    <PageContainer className="max-w-lg">
      <main className="space-y-8 mb-8">
        <PageContentContainer>
          <h1 className="text-3xl font-bold tracking-tight">
            Feel Better, Faster - IV Therapy Delivered to You
          </h1>
          <p className="text-sm text-muted max-w-2xl">
            Schedule your visit with {organization?.name} in 60 seconds. We're here to provide the
            care you need.
          </p>
          <Button asChild size="lg" className="w-full md:w-auto">
            <Link to="create">Book today</Link>
          </Button>
        </PageContentContainer>

        <PageContentContainer>
          <div className="space-y-4 w-full">
            <FeatureBox
              icon={<Syringe className="w-6 h-6 text-primary" />}
              title="On-Demand Scheduling"
            />
            <FeatureBox
              icon={<CalendarCheck className="w-6 h-6 text-secondary" />}
              title="Licensed Registered Nurse"
            />
            <FeatureBox
              icon={<FlaskConical className="w-6 h-6 text-primary" />}
              title="Premium, Medical-Grade Products"
            />
          </div>
        </PageContentContainer>
      </main>

      <footer>
        <PageContentContainer>
          <h2 className="text-2xl font-bold tracking-tight">Ready to start?</h2>
          <p className="text-sm text-muted">Schedule your visit with {organization?.name} in 60 seconds.</p>
          <Button asChild size="lg" className="w-full md:w-auto">
            <Link to="create">Book today</Link>
          </Button>
        </PageContentContainer>
      </footer>
    </PageContainer>
  );
}

function PageContentContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        {children}
      </div>
    </div>
  );
}

interface FeatureBoxProps {
  icon: React.ReactNode;
  title: string;
}

function FeatureBox({ icon, title }: FeatureBoxProps) {
  return (
    <div className="flex items-center gap-4">
      {icon}
      <span className="font-bold">{title}</span>
    </div>
  );
}
