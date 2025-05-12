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

export type CreateNurseUuidInput = {
  supabaseId: Scalars['String']['input'];
};

export type CreateOrganizationUuidInput = {
  supabaseOrgId: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNurseUuid: NurseUuid;
  createOrganizationRecord: OrganizationUuid;
};


export type MutationCreateNurseUuidArgs = {
  input: CreateNurseUuidInput;
};


export type MutationCreateOrganizationRecordArgs = {
  input: CreateOrganizationUuidInput;
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
  getNurseUuids?: Maybe<NurseUuid>;
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