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

export type BookingDto = {
  __typename?: 'BookingDto';
  createdAt: Scalars['DateTime']['output'];
  endTime: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  nurseId: Scalars['String']['output'];
  personId: Scalars['String']['output'];
  serviceId: Scalars['String']['output'];
  startTime: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CancelBookingInput = {
  bookingId: Scalars['String']['input'];
};

export type CreateBookingInput = {
  endTime: Scalars['DateTime']['input'];
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

export type CreateNurseUuidInput = {
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
  createNurseUuid: NurseUuid;
  createOrganizationRecord: OrganizationUuid;
  createPersonUuid: PersonUuidDto;
  deleteAvailabilityByIds: Scalars['Boolean']['output'];
  deleteNurseServicesByIds: Scalars['Boolean']['output'];
  modifyBooking: BookingDto;
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
  durationMinutes: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  nurseId: Scalars['String']['output'];
  price?: Maybe<Scalars['Float']['output']>;
};

export type NurseServiceSlotInput = {
  durationMinutes: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  price?: InputMaybe<Scalars['Float']['input']>;
};

export type NurseUuid = {
  __typename?: 'NurseUuid';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  supabaseId: Scalars['String']['output'];
  timezone: Scalars['String']['output'];
};

export type OrganizationUuid = {
  __typename?: 'OrganizationUuid';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  supabaseOrgId: Scalars['String']['output'];
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
  getBookings: Array<BookingDto>;
  getNurseServicesByNurseId: Array<NurseServiceDto>;
  getNurseUuids?: Maybe<NurseUuid>;
  getOrganizationRecord: OrganizationUuid;
  getSelfAsNurse?: Maybe<NurseUuid>;
};


export type QueryGetAvailabilityByNurseIdArgs = {
  nurseId: Scalars['String']['input'];
};


export type QueryGetBookingsArgs = {
  input: GetAppointmentsInput;
};


export type QueryGetNurseServicesByNurseIdArgs = {
  nurseId: Scalars['String']['input'];
};


export type QueryGetOrganizationRecordArgs = {
  id: Scalars['String']['input'];
};

export type UpdateBookingInput = {
  bookingId: Scalars['String']['input'];
  newEndTime: Scalars['DateTime']['input'];
  newStartTime: Scalars['DateTime']['input'];
};

export type GetOrganizationByUuidQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type GetOrganizationByUuidQuery = { __typename?: 'Query', getOrganizationRecord: { __typename?: 'OrganizationUuid', id: string, supabaseOrgId: string } };


export const GetOrganizationByUuidDocument = gql`
    query GetOrganizationByUuid($id: String!) {
  getOrganizationRecord(id: $id) {
    id
    supabaseOrgId
  }
}
    `;

/**
 * __useGetOrganizationByUuidQuery__
 *
 * To run a query within a React component, call `useGetOrganizationByUuidQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizationByUuidQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizationByUuidQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOrganizationByUuidQuery(baseOptions: Apollo.QueryHookOptions<GetOrganizationByUuidQuery, GetOrganizationByUuidQueryVariables> & ({ variables: GetOrganizationByUuidQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrganizationByUuidQuery, GetOrganizationByUuidQueryVariables>(GetOrganizationByUuidDocument, options);
      }
export function useGetOrganizationByUuidLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrganizationByUuidQuery, GetOrganizationByUuidQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrganizationByUuidQuery, GetOrganizationByUuidQueryVariables>(GetOrganizationByUuidDocument, options);
        }
export function useGetOrganizationByUuidSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOrganizationByUuidQuery, GetOrganizationByUuidQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrganizationByUuidQuery, GetOrganizationByUuidQueryVariables>(GetOrganizationByUuidDocument, options);
        }
export type GetOrganizationByUuidQueryHookResult = ReturnType<typeof useGetOrganizationByUuidQuery>;
export type GetOrganizationByUuidLazyQueryHookResult = ReturnType<typeof useGetOrganizationByUuidLazyQuery>;
export type GetOrganizationByUuidSuspenseQueryHookResult = ReturnType<typeof useGetOrganizationByUuidSuspenseQuery>;
export type GetOrganizationByUuidQueryResult = Apollo.QueryResult<GetOrganizationByUuidQuery, GetOrganizationByUuidQueryVariables>;