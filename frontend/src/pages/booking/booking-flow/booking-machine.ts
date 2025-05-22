import { createMachine, assign } from 'xstate';

export interface BookingUserInfo {
  firstName: string;
  phone: string;
  notes?: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
}

export const bookingMachine = createMachine({
  types: {
    context: {} as {
      serviceId?: string;
      selectedDate?: string;
      userInfo?: BookingUserInfo;
      confirmed?: boolean;
    },
    events: {} as
      | { type: 'SELECT_SERVICE'; serviceId: string }
      | { type: 'SELECT_SLOT'; date: string }
      | { type: 'UPDATE_USER'; userInfo: BookingUserInfo }
      | { type: 'CONFIRM'; confirmed: boolean }
      | { type: 'NEXT' }
      | { type: 'BACK' },
  },

  id: 'booking',
  initial: 'selectService',
  context: {},

  states: {
    selectService: {
      on: {
        SELECT_SERVICE: {
          actions: assign(({ event }) => ({
            serviceId: event.serviceId,
          })),
        },
        NEXT: {
          guard: ({ context }) => !!context.serviceId,
          target: 'selectSlot',
        },
      },
    },
    selectSlot: {
      on: {
        SELECT_SLOT: {
          actions: assign(({ event }) => ({
            selectedDate: event.date,
          })),
        },
        NEXT: {
          guard: ({ context }) => !!context.selectedDate,
          target: 'userInfo',
        },
        BACK: 'selectService',
      },
    },
    userInfo: {
      on: {
        UPDATE_USER: {
          actions: assign(({ event }) => ({
            userInfo: event.userInfo,
          })),
        },
        NEXT: {
          guard: ({ context }) =>
            !!context.userInfo?.firstName &&
            !!context.userInfo?.phone &&
            !!context.userInfo?.streetAddress &&
            !!context.userInfo?.city &&
            !!context.userInfo?.state &&
            !!context.userInfo?.zip,
          target: 'review',
        },
        BACK: 'selectSlot',
      },
    },
    review: {
      on: {
        CONFIRM: {
          actions: assign(({ event }) => ({
            confirmed: event.confirmed,
          })),
        },
        BACK: 'userInfo',
      },
    },
  },
});
