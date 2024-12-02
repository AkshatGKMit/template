import { ReactNode } from 'react';

declare global {
  interface ContextProviderProps {
    children?: ReactNode;
  }
}
