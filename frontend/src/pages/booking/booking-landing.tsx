import { Link } from 'react-router-dom';
import { Syringe, CalendarCheck, FlaskConical } from 'lucide-react';

import { PageContainer, Button } from '@/components';

import { useBooking } from './booking-provider';

export function BookingLanding() {
  const { organization, nurse } = useBooking();
  const topPickedServices = nurse?.services?.filter(service => service.topPick) ?? [];

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

        {topPickedServices.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-center">Our Top Services</h2>
            {topPickedServices.map(service => (
              <div className="container mx-auto p-4 bg-white rounded-lg shadow-md" key={service.id}>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{service.name}</h3>
                  {service.description && (
                    <p className="text-sm text-muted">{service.description}</p>
                  )}
                  {service.price && (
                    <p className="text-md font-semibold">${service.price.toFixed(2)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-center">Why Choose Us?</h2>
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
        </div>
      </main>

      <footer>
        <PageContentContainer>
          <h2 className="text-2xl font-bold tracking-tight">Ready to start?</h2>
          <p className="text-sm text-muted">
            Schedule your visit with {organization?.name} in 60 seconds.
          </p>
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
