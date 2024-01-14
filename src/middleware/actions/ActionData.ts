export interface ActionData<T> {
  type: string;
  data: T;
}
export interface ActionPersist<T> {
  type: string;
  data?: T;
  token?: string;
  role?: string;
  payload?: ActionData<T>;
}
