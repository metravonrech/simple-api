import { Request } from 'express';

export type RequestWithValidatedData<T> = { validatedData: T } & Request;

export interface IStore<T> {
  getAll: () => T,
  removeAll: () => void
}
