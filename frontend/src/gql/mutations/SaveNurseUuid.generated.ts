import * as Types from '../graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AvailableSlotsDto = {
  __typename?: 'AvailableSlotsDto';
  endTime: Scalars['DateTime']['output'];
  nurseId: Scalars['String']['output'];
  serviceId: Scalars['String']['output'];
  startTime: Scalars['DateTime']['output'];
};

export type BookingDto = {
  __typename?: 'BookingDto';
  createdAt: Scalars['DateTime']['output'];
  endTime: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  nurse: NurseUuid;
  nurseId: Scalars['String']['output'];
  person: PersonUuidDto;
  service: NurseServiceDto;
  startTime: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CancelBookingInput = {
  bookingId: Scalars['String']['input'];
};

export type CreateBookingInput = {
  endTime: Scalars['DateTime']['input'];
  isRebooking?: Scalars['Boolean']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  nurseId: Scalars['String']['input'];
  personId: Scalars['String']['input'];
  serviceId: Scalars['String']['input'];
  startTime: Scalars['DateTime']['input'];
};

export type CreateNurseAvailabilityInput = {
  nurseId: Scalars['String']['input'];
  slots: Array<NurseAvailabilitySlotInput>;
};

export type CreateNurseServicesInput = {
  nurseId: Scalars['String']['input'];
  services: Array<NurseServiceSlotInput>;
};

export type CreateNurseStatsInput = {
  newCustomersCount: Scalars['Int']['input'];
  newCustomersRevenue: Scalars['Float']['input'];
  nurseId: Scalars['String']['input'];
  rebookingsCount: Scalars['Int']['input'];
  rebookingsRevenue: Scalars['Float']['input'];
  totalRevenue: Scalars['Float']['input'];
};

export type CreateNurseUuidInput = {
  organizationId: Scalars['String']['input'];
  supabaseId: Scalars['String']['input'];
  timezone: Scalars['String']['input'];
};

export type CreateOrganizationUuidInput = {
  supabaseOrgId: Scalars['String']['input'];
};

export type CreatePersonUuidInput = {
  supabaseId: Scalars['String']['input'];
};

export type DeleteNurseAvailabilityInput = {
  availabilityIds: Array<Scalars['String']['input']>;
};

export type DeleteNurseServicesInput = {
  serviceIds: Array<Scalars['String']['input']>;
};

export type GetAppointmentsInput = {
  end?: InputMaybe<Scalars['String']['input']>;
  nurseId: Scalars['String']['input'];
  start: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelBooking: BookingDto;
  configureAvailability: Array<NurseAvailabilityDto>;
  configureNurseServices: Array<NurseServiceDto>;
  createBooking: BookingDto;
  createNurseStats: NurseStatsDto;
  createNurseUuid: NurseUuid;
  createOrganizationRecord: OrganizationUuid;
  createPersonUuid: PersonUuidDto;
  deleteAvailabilityByIds: Scalars['Boolean']['output'];
  deleteNurseServicesByIds: Scalars['Boolean']['output'];
  modifyBooking: BookingDto;
  updateNurseStats: NurseStatsDto;
};


export type MutationCancelBookingArgs = {
  input: CancelBookingInput;
};


export type MutationConfigureAvailabilityArgs = {
  input: CreateNurseAvailabilityInput;
};


export type MutationConfigureNurseServicesArgs = {
  input: CreateNurseServicesInput;
};


export type MutationCreateBookingArgs = {
  input: CreateBookingInput;
};


export type MutationCreateNurseStatsArgs = {
  input: CreateNurseStatsInput;
};


export type MutationCreateNurseUuidArgs = {
  input: CreateNurseUuidInput;
};


export type MutationCreateOrganizationRecordArgs = {
  input: CreateOrganizationUuidInput;
};


export type MutationCreatePersonUuidArgs = {
  input: CreatePersonUuidInput;
};


export type MutationDeleteAvailabilityByIdsArgs = {
  input: DeleteNurseAvailabilityInput;
};


export type MutationDeleteNurseServicesByIdsArgs = {
  input: DeleteNurseServicesInput;
};


export type MutationModifyBookingArgs = {
  input: UpdateBookingInput;
};


export type MutationUpdateNurseStatsArgs = {
  input: UpdateNurseStatsInput;
};

export type NurseAvailabilityDto = {
  __typename?: 'NurseAvailabilityDto';
  createdAt: Scalars['DateTime']['output'];
  dayOfWeek: Scalars['Float']['output'];
  endTime: Scalars['String']['output'];
  id: Scalars['String']['output'];
  nurseId: Scalars['String']['output'];
  startTime: Scalars['String']['output'];
};

export type NurseAvailabilitySlotInput = {
  dayOfWeek: Scalars['Float']['input'];
  endTime: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
};

export type NurseServiceDto = {
  __typename?: 'NurseServiceDto';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  durationMinutes: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  nurseId: Scalars['String']['output'];
  price?: Maybe<Scalars['Float']['output']>;
  topPick?: Maybe<Scalars['Boolean']['output']>;
};

export type NurseServiceSlotInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  durationMinutes: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  price?: InputMaybe<Scalars['Float']['input']>;
  topPick?: InputMaybe<Scalars['Boolean']['input']>;
};

export type NurseStatsDto = {
  __typename?: 'NurseStatsDto';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  newCustomersCount: Scalars['Int']['output'];
  newCustomersRevenue: Scalars['Float']['output'];
  nurseId: Scalars['String']['output'];
  rebookingsCount: Scalars['Int']['output'];
  rebookingsRevenue: Scalars['Float']['output'];
  totalRevenue: Scalars['Float']['output'];
};

export type NurseUuid = {
  __typename?: 'NurseUuid';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  organization: OrganizationUuid;
  services: Array<NurseServiceDto>;
  supabaseId: Scalars['String']['output'];
  timezone: Scalars['String']['output'];
};

export type OrganizationUuid = {
  __typename?: 'OrganizationUuid';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
};

export type PersonUuidDto = {
  __typename?: 'PersonUuidDto';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  supabaseId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAvailabilityByNurseId: Array<NurseAvailabilityDto>;
  getAvailableSlots: Array<AvailableSlotsDto>;
  getBookingById: BookingDto;
  getBookings: Array<BookingDto>;
  getNurseById?: Maybe<NurseUuid>;
  getNurseServicesByNurseId: Array<NurseServiceDto>;
  getNurseStats: Array<NurseStatsDto>;
  getOrganizationRecord: OrganizationUuid;
  getPersonBySupabaseId?: Maybe<PersonUuidDto>;
  getSelfAsNurse?: Maybe<NurseUuid>;
};


export type QueryGetAvailabilityByNurseIdArgs = {
  nurseId: Scalars['String']['input'];
};


export type QueryGetAvailableSlotsArgs = {
  input: SlotFinderInput;
};


export type QueryGetBookingByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetBookingsArgs = {
  input: GetAppointmentsInput;
};


export type QueryGetNurseByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetNurseServicesByNurseIdArgs = {
  nurseId: Scalars['String']['input'];
};


export type QueryGetNurseStatsArgs = {
  nurseId: Scalars['String']['input'];
};


export type QueryGetOrganizationRecordArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetPersonBySupabaseIdArgs = {
  supabaseId: Scalars['String']['input'];
};

export type SlotFinderInput = {
  end?: InputMaybe<Scalars['String']['input']>;
  nurseId: Scalars['String']['input'];
  serviceId: Scalars['String']['input'];
  start: Scalars['String']['input'];
};

export type UpdateBookingInput = {
  bookingId: Scalars['String']['input'];
  newEndTime: Scalars['DateTime']['input'];
  newStartTime: Scalars['DateTime']['input'];
};

export type UpdateNurseStatsInput = {
  id: Scalars['ID']['input'];
  newCustomersCount?: InputMaybe<Scalars['Int']['input']>;
  newCustomersRevenue?: InputMaybe<Scalars['Float']['input']>;
  rebookingsCount?: InputMaybe<Scalars['Int']['input']>;
  rebookingsRevenue?: InputMaybe<Scalars['Float']['input']>;
  totalRevenue?: InputMaybe<Scalars['Float']['input']>;
};

export type SaveNurseUuidMutationVariables = Types.Exact<{
  nurseId: Types.Scalars['String']['input'];
  orgId: Types.Scalars['String']['input'];
  timezone: Types.Scalars['String']['input'];
}>;


export type SaveNurseUuidMutation = { __typename?: 'Mutation', createNurseUuid: { __typename?: 'NurseUuid', id: string, supabaseId: string } };


export const SaveNurseUuidDocument = gql`
    mutation SaveNurseUuid($nurseId: String!, $orgId: String!, $timezone: String!) {
  createNurseUuid(
    input: {supabaseId: $nurseId, timezone: $timezone, organizationId: $orgId}
  ) {
    id
    supabaseId
  }
}
    `;
export type SaveNurseUuidMutationFn = Apollo.MutationFunction<SaveNurseUuidMutation, SaveNurseUuidMutationVariables>;

/**
 * __useSaveNurseUuidMutation__
 *
 * To run a mutation, you first call `useSaveNurseUuidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveNurseUuidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveNurseUuidMutation, { data, loading, error }] = useSaveNurseUuidMutation({
 *   variables: {
 *      nurseId: // value for 'nurseId'
 *      orgId: // value for 'orgId'
 *      timezone: // value for 'timezone'
 *   },
 * });
 */
export function useSaveNurseUuidMutation(baseOptions?: Apollo.MutationHookOptions<SaveNurseUuidMutation, SaveNurseUuidMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveNurseUuidMutation, SaveNurseUuidMutationVariables>(SaveNurseUuidDocument, options);
      }
export type SaveNurseUuidMutationHookResult = ReturnType<typeof useSaveNurseUuidMutation>;
export type SaveNurseUuidMutationResult = Apollo.MutationResult<SaveNurseUuidMutation>;
export type SaveNurseUuidMutationOptions = Apollo.BaseMutationOptions<SaveNurseUuidMutation, SaveNurseUuidMutationVariables>;