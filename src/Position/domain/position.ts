import { PositionProps } from './position.props';

export class Position implements PositionProps {
  private readonly _id: string;
  private readonly _agreementRef: string;
  private readonly _xCoordinate: number;
  private readonly _yCoordinate: number;
  private readonly _datetime: Date;

  constructor(positionProps: PositionProps) {
    this._id = positionProps.id;
    this._agreementRef = positionProps.agreementRef;
    this._xCoordinate = positionProps.xCoordinate;
    this._yCoordinate = positionProps.yCoordinate;
    this._datetime = positionProps.datetime;
  }

  get id(): string {
    return this._id;
  }

  get agreementRef(): string {
    return this._agreementRef;
  }

  get xCoordinate(): number {
    return this._xCoordinate;
  }

  get yCoordinate(): number {
    return this._yCoordinate;
  }

  get datetime(): Date {
    return this._datetime;
  }
}
