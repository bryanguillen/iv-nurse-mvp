import { BasicInfo } from './basic-info';
import { AvailabilityServicesInfo } from './availability-services-info';
import { Alert, AlertDescription, PageContainer } from '@/components';

export function Settings() {
  return (
    <PageContainer>
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
    </PageContainer>
  );
}
