
export interface GuestWish {
  name: string;
  message: string;
  timestamp: number;
}

export enum AppState {
  ENVELOPE = 'ENVELOPE',
  MAIN_CONTENT = 'MAIN_CONTENT'
}
