import { Link } from 'react-router-dom';
import { useBooking } from './booking-provider';

export function BookingLanding() {
  const { name } = useBooking();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b">
        <div className="container mx-auto py-6">
          <h1 className="text-2xl font-semibold text-center">{name}</h1>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Welcome to Booking</h2>
          <p>This is the landing page for booking appointments.</p>
          <Link
            to="create"
            className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Create Booking
          </Link>
        </div>
      </main>
    </div>
  );
}
