import { useMachine } from '@xstate/react';

import { Button } from '@/components';

import { bookingMachine, type BookingUserInfo } from './booking-machine';
import { ServiceSelector } from './service-selector';
import { DateSelector } from './date-selector';

export function BookingFlow() {
  const [state, send] = useMachine(bookingMachine);
  const step = state.value;
  const context = state.context;

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
            selectedDate={context.selectedDate ? new Date(context.selectedDate) : undefined}
            onDateSelect={date =>
              send({
                type: 'SELECT_SLOT',
                date: date?.toISOString() ?? '',
              })
            }
          />
        )}

        {step === 'userInfo' && (
          <>
            <input
              className="w-full p-2 border rounded"
              placeholder="Name"
              value={context.userInfo?.firstName || ''}
              onChange={e =>
                send({
                  type: 'UPDATE_USER',
                  userInfo: {
                    ...(context.userInfo as BookingUserInfo),
                    firstName: e.target.value ?? '',
                  },
                })
              }
            />
          </>
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
      <div className="py-2">
        {step !== 'review' && (
          <div className="flex gap-2">
            {step !== 'selectService' && (
              <Button
                onClick={() => send({ type: 'BACK' })}
                className="flex-1 py-3"
                variant="outline"
              >
                Back
              </Button>
            )}
            <Button
              onClick={() => send({ type: 'NEXT' })}
              className="flex-1 py-3"
              disabled={!state.can({ type: 'NEXT' })}
            >
              Next
            </Button>
          </div>
        )}
        {step === 'review' && (
          <Button onClick={() => console.log('context', context)} className="w-full py-3">
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}
