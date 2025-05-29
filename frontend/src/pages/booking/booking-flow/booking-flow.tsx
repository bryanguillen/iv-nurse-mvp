import { useState } from 'react';
import { useMachine } from '@xstate/react';
import { useParams, useSearchParams } from 'react-router-dom';

import { Button } from '@/components';
import { useCreatePersonUuidMutation } from '@/gql/mutations/CreatePersonUuid.generated';
import { useGetPersonBySupabaseIdLazyQuery } from '@/gql/queries/GetPersonBySupabaseId.generated';
import { useCreateBookingMutation } from '@/gql/mutations/CreateBooking.generated';

import type { BookingUserInfo } from './booking-machine';
import { bookingMachine } from './booking-machine';
import { ServiceSelector } from './service-selector';
import { DateSelector } from './date-selector';
import { UserInfoForm } from './user-info-form';
import { Review } from './review';

export function BookingFlow() {
  const [state, send] = useMachine(bookingMachine);
  const step = state.value;
  const context = state.context;
  const [searchParams] = useSearchParams();
  const isRebooking = searchParams.get('rebooking') === 'true';
  const userInfo: BookingUserInfo = context.userInfo ?? {
    firstName: '',
    lastName: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
  };

  const [createBookingResult, setCreateBookingResult] = useState<string | null>(null);
  const [creatingPersonInSupabase, setCreatingPersonInSupabase] = useState<boolean>(false);

  const [createPersonUuid, { loading: createPersonUuidLoading }] = useCreatePersonUuidMutation();
  const [getPersonBySupabaseId, { loading: getPersonBySupabaseIdLoading }] =
    useGetPersonBySupabaseIdLazyQuery();
  const [createBooking, { loading: createBookingLoading }] = useCreateBookingMutation();

  const { nurseId } = useParams<{ nurseId: string }>();

  const submissionInProgress =
    creatingPersonInSupabase ||
    createPersonUuidLoading ||
    getPersonBySupabaseIdLoading ||
    createBookingLoading;

  const handleSubmit = async () => {
    setCreatingPersonInSupabase(true);

    const result = await createPatientInSupabase(userInfo);
    let personUuid = '';

    setCreatingPersonInSupabase(false);

    if (result.newUser) {
      const { data } = await createPersonUuid({
        variables: {
          supabaseId: result.patientId,
        },
      });

      if (data?.createPersonUuid) {
        personUuid = data.createPersonUuid.id;
      }
    } else {
      const { data } = await getPersonBySupabaseId({
        variables: {
          supabaseId: result.patientId,
        },
      });

      if (data?.getPersonBySupabaseId) {
        personUuid = data.getPersonBySupabaseId.id;
      }
    }

    const { data } = await createBooking({
      variables: {
        input: {
          nurseId: nurseId ?? '',
          personId: personUuid,
          serviceId: context.serviceId ?? '',
          startTime: context.selectedDate ?? '',
          endTime: context.selectedDate ?? '',
          notes: userInfo.notes ?? '',
          isRebooking,
        },
      },
    });

    setCreateBookingResult(data?.createBooking?.id ?? null);
    send({ type: 'SUCCESS' });
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

  const handleConfirm = (confirmed: boolean) => {
    send({ type: 'CONFIRM', confirmed });
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
      case 'success':
        return 'Success!';
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

        {(step === 'review' || step === 'success') && (
          <Review
            serviceId={context.serviceId ?? ''}
            selectedDate={context.selectedDate ?? ''}
            userInfo={userInfo}
            confirmed={context.confirmed ?? false}
            onConfirm={handleConfirm}
            bookingId={createBookingResult}
          />
        )}
      </div>

      {/* Footer */}
      {step !== 'success' && (
        <div className="py-2 flex gap-2">
          {step !== 'selectService' && (
            <Button
              onClick={() => send({ type: 'BACK' })}
              className="flex-1 py-3"
              variant="outline"
              disabled={submissionInProgress}
            >
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
            <Button
              onClick={() => handleSubmit()}
              className="flex-1 py-3"
              disabled={!context.confirmed || submissionInProgress}
            >
              Submit
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

async function createPatientInSupabase(userInfo: BookingUserInfo) {
  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_EDGE_FUNCTIONS_URL}/v1/create-patient`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        phone: userInfo.phone,
        address: {
          line1: userInfo.streetAddress,
          city: userInfo.city,
          state: userInfo.state,
          postal_code: userInfo.zip,
        },
      }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to create patient');
  }

  return result;
}
