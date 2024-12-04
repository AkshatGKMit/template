import { ERRORS } from '@constants';

declare global {
  type ErrorType = (typeof ERRORS)[keyof typeof ERRORS];
}
