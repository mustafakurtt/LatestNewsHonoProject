

export default class RouteResponse<T> {
    isSuccess: boolean;
    time: string;
    data: T;
  constructor(data: T) {
    this.isSuccess = true;
    this.time = new Date().toISOString();
    this.data = data;
  }
}