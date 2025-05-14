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
};

export type CreateOrganizationUuidInput = {
  supabaseOrgId: Scalars['String']['input'];
};

export type DeleteNurseAvailabilityInput = {
  availabilityIds: Array<Scalars['String']['input']>;
};

export type DeleteNurseServicesInput = {
  serviceIds: Array<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  configureAvailability: Array<NurseAvailabilityDto>;
  configureNurseServices: Array<NurseServiceDto>;
  createNurseUuid: NurseUuid;
  createOrganizationRecord: OrganizationUuid;
  deleteAvailabilityByIds: Scalars['Boolean']['output'];
  deleteNurseServicesByIds: Scalars['Boolean']['output'];
};


export type MutationConfigureAvailabilityArgs = {
  input: CreateNurseAvailabilityInput;
};


export type MutationConfigureNurseServicesArgs = {
  input: CreateNurseServicesInput;
};


export type MutationCreateNurseUuidArgs = {
  input: CreateNurseUuidInput;
};


export type MutationCreateOrganizationRecordArgs = {
  input: CreateOrganizationUuidInput;
};


export type MutationDeleteAvailabilityByIdsArgs = {
  input: DeleteNurseAvailabilityInput;
};


export type MutationDeleteNurseServicesByIdsArgs = {
  input: DeleteNurseServicesInput;
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
};

export type OrganizationUuid = {
  __typename?: 'OrganizationUuid';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  supabaseOrgId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAvailabilityByNurseId: Array<NurseAvailabilityDto>;
  getNurseServicesByNurseId: Array<NurseServiceDto>;
  getNurseUuids?: Maybe<NurseUuid>;
  getSelfAsNurse?: Maybe<NurseUuid>;
};


export type QueryGetAvailabilityByNurseIdArgs = {
  nurseId: Scalars['String']['input'];
};


export type QueryGetNurseServicesByNurseIdArgs = {
  nurseId: Scalars['String']['input'];
};

export type SaveSupabaseIdsMutationVariables = Types.Exact<{
  nurseId: Types.Scalars['String']['input'];
  orgId: Types.Scalars['String']['input'];
}>;


export type SaveSupabaseIdsMutation = { __typename?: 'Mutation', createNurseUuid: { __typename?: 'NurseUuid', id: string, supabaseId: string }, createOrganizationRecord: { __typename?: 'OrganizationUuid', id: string, supabaseOrgId: string } };


export const SaveSupabaseIdsDocument = gql`
    mutation SaveSupabaseIds($nurseId: String!, $orgId: String!) {
  createNurseUuid(input: {supabaseId: $nurseId}) {
    id
    supabaseId
  }
  createOrganizationRecord(input: {supabaseOrgId: $orgId}) {
    id
    supabaseOrgId
  }
}
    `;
export type SaveSupabaseIdsMutationFn = Apollo.MutationFunction<SaveSupabaseIdsMutation, SaveSupabaseIdsMutationVariables>;

/**
 * __useSaveSupabaseIdsMutation__
 *
 * To run a mutation, you first call `useSaveSupabaseIdsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveSupabaseIdsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveSupabaseIdsMutation, { data, loading, error }] = useSaveSupabaseIdsMutation({
 *   variables: {
 *      nurseId: // value for 'nurseId'
 *      orgId: // value for 'orgId'
 *   },
 * });
 */
export function useSaveSupabaseIdsMutation(baseOptions?: Apollo.MutationHookOptions<SaveSupabaseIdsMutation, SaveSupabaseIdsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveSupabaseIdsMutation, SaveSupabaseIdsMutationVariables>(SaveSupabaseIdsDocument, options);
      }
export type SaveSupabaseIdsMutationHookResult = ReturnType<typeof useSaveSupabaseIdsMutation>;
export type SaveSupabaseIdsMutationResult = Apollo.MutationResult<SaveSupabaseIdsMutation>;
export type SaveSupabaseIdsMutationOptions = Apollo.BaseMutationOptions<SaveSupabaseIdsMutation, SaveSupabaseIdsMutationVariables>;