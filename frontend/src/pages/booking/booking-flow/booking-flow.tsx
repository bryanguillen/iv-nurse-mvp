import { useMachine } from '@xstate/react';
import { Info } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
} from '@/components';

import { bookingMachine, type BookingUserInfo } from './booking-machine';
import { useBooking } from '../booking-provider';

export function BookingFlow() {
  const [state, send] = useMachine(bookingMachine);
  const { nurse } = useBooking();
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
          <div className="space-y-2">
            <Select
              value={context.serviceId ?? ''}
              onValueChange={value => send({ type: 'SELECT_SERVICE', serviceId: value })}
            >
              <SelectTrigger className="w-full truncate">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {nurse.services.map(service => (
                  <SelectItem key={service.id} value={service.id} textValue={service.name}>
                    <div className="flex flex-col">
                      {service.description && (
                        <span className="text-sm text-muted">{service.description}</span>
                      )}
                      {service.price && (
                        <span className="text-sm font-medium">${service.price.toFixed(2)}</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2 text-sm text-muted">
              <Info className="size-4 text-primary" />
              <span className="text-muted">
                Want to combine drips? Add it in the notes section at checkout.
              </span>
            </div>
          </div>
        )}

        {step === 'selectSlot' && (
          <>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={context.selectedDate || ''}
              onChange={e =>
                send({
                  type: 'SELECT_SLOT',
                  date: e.target.value,
                })
              }
            />
          </>
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
