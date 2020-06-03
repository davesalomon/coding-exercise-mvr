export default interface AsyncDataLoad<T> {
  isLoading: boolean;
  isError: boolean;
  result: T;
}
