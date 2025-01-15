import {
  ProtectedEndPointBaseRequest,
  CreateProjectRequest,
} from '@repo/types';

export type CreateProjectRequestDto = ProtectedEndPointBaseRequest &
  CreateProjectRequest;
