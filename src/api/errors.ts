export class APIError<J> extends Error {
  public status: number;
  public json: J;

  constructor(message: string, status: number, json: J) {
    super(message);
    Object.setPrototypeOf(this, APIError.prototype);
    this.status = status;
    this.json = json;
  }
}
