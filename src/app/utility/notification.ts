export class Notification {

  static message(msg: string) {
    return new Notification(msg, []);
  }

  static timeout() {
    return new Notification('request.timeout', ['timeout', 'fail']);
  }

  constructor(
    public message: string,
    public tags: Array<string>
  ) {}

}
