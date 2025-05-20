import { Link } from 'react-router-dom';

export function BookingLanding() {
  return (
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
  );
}
