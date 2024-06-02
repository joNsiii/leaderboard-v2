import { User } from "firebase/auth";

export class Driver {
  driver: string | null | undefined;
  time: string = '';
  car: string = '';
  carClass: string = '';
  msec: number = 0;

  constructor(obj?: any) {
    this.driver = obj ? obj.driver : '';
    this.time = obj ? obj.time : '';
    this.car = obj ? obj.car : '';
    this.carClass = obj ? obj.carClass : '';
    this.msec = obj ? obj.msec : '';
  }


  public JSON() {
    return {
      driver: this.driver,
      time: this.time,
      car: this.car,
      carClass: this.carClass,
      msec: this.msec,
    };
  }
}
