import { PositionProps } from './position.props';

export class PositionResponse implements PositionProps {
  readonly id: string;
  readonly agreementRef: string;
  readonly xCoordinate: number;
  readonly yCoordinate: number;
  readonly datetime: Date;

  constructor(positionProps: PositionProps) {
    this.id = positionProps.id;
    this.agreementRef = positionProps.agreementRef;
    this.xCoordinate = positionProps.xCoordinate;
    this.yCoordinate = positionProps.yCoordinate;
    this.datetime = positionProps.datetime;
  }
}
