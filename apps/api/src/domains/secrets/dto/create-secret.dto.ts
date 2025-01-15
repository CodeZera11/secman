import { ProtectedEndPointBaseRequest, CreateSecretRequest } from '@repo/types';

export type CreateSecretRequestDto = ProtectedEndPointBaseRequest &
  CreateSecretRequest;
