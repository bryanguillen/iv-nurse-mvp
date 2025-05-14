import { BasicInfo } from './basic-info';
import { AvailabilityServicesInfo } from './availability-services-info';
import { Alert, AlertDescription } from '@/components';

export function Settings() {
  return (
    <div className="max-w-md mx-auto flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Alert variant="info">
        <AlertDescription>
          If you need to change anything, please email us at{' '}
          <a href="mailto:example@example.com" className="text-primary hover:underline">
            example@example.com
          </a>
        </AlertDescription>
      </Alert>
      <BasicInfo />
      <AvailabilityServicesInfo />
    </div>
  );
}
