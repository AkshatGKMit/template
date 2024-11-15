import { Errors } from '@constants';

declare global {
  type ErrorType = (typeof Errors)[keyof typeof Errors];
}
