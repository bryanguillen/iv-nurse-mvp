import { useMachine } from '@xstate/react';
import type { BookingUserInfo } from './booking-machine';

import { Button } from '@/components';

import { bookingMachine } from './booking-machine';
import { ServiceSelector } from './service-selector';
import { DateSelector } from './date-selector';
import { UserInfoForm } from './user-info-form';

export function BookingFlow() {
  const [state, send] = useMachine(bookingMachine);
  const step = state.value;
  const context = state.context;
  const userInfo = context.userInfo ?? {
    firstName: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
  };

  const handleUserInfoChange = (field: keyof BookingUserInfo, value: string) => {
    send({
      type: 'UPDATE_USER',
      userInfo: {
        ...userInfo,
        [field]: value,
      },
    });
  };

  const getTitle = () => {
    switch (step) {
      case 'selectService':
        return 'Choose a Service';
      case 'selectSlot':
        return 'Pick Date & Time';
      case 'userInfo':
        return 'Your Info';
      case 'review':
        return 'Review & Submit';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4">
      {/* Header */}
      <h1 className="text-lg font-semibold text-center">{getTitle()}</h1>

      {/* Content */}
      <div className="flex-1 py-4 space-y-4">
        {step === 'selectService' && (
          <ServiceSelector
            selectedServiceId={context.serviceId}
            onServiceSelect={value => send({ type: 'SELECT_SERVICE', serviceId: value })}
          />
        )}

        {step === 'selectSlot' && (
          <DateSelector
            selectedDate={context.selectedDate}
            onDateSelect={date =>
              send({
                type: 'SELECT_SLOT',
                date: date ?? '',
              })
            }
            serviceId={context.serviceId ?? ''}
          />
        )}

        {step === 'userInfo' && (
          <UserInfoForm userInfo={userInfo} onChange={handleUserInfoChange} />
        )}

        {step === 'review' && (
          <div className="space-y-2 text-sm">
            <p>
              <strong>Service:</strong> {context.serviceId}
            </p>
            <p>
              <strong>Date:</strong> {context.selectedDate}
            </p>
            <p>
              <strong>Name:</strong> {context.userInfo?.firstName}
            </p>
            <p>
              <strong>Phone:</strong> {context.userInfo?.phone}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="py-2 flex gap-2">
        {step !== 'selectService' && (
          <Button onClick={() => send({ type: 'BACK' })} className="flex-1 py-3" variant="outline">
            Back
          </Button>
        )}
        {step !== 'review' && (
          <Button
            onClick={() => send({ type: 'NEXT' })}
            className="flex-1 py-3"
            disabled={!state.can({ type: 'NEXT' })}
          >
            Next
          </Button>
        )}
        {step === 'review' && (
          <Button onClick={() => console.log('context', context)} className="flex-1 py-3">
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}
