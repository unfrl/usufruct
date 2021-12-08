import { makeAutoObservable } from 'mobx';

export interface Toast {
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
}

export class ToastStore {
  public toast: Toast | null = null;

  public get isOpen() {
    return !!this.toast;
  }

  public constructor() {
    makeAutoObservable(this);
  }

  public open = (toast: Toast) => {
    this.toast = toast;
  };

  public error = (message: string) => {
    this.open({ message, type: 'error' });
  };

  public success = (message: string) => {
    this.open({ message, type: 'success' });
  };

  public close = () => {
    this.toast = null;
  };
}
