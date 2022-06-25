import { Position } from '../domain/position';
import { PositionResponse } from '../domain/position.response';
import { ControllerEndpointsUtils } from '../../shared/utils/controller.endpoints.utils';

export class PositionAdapter {
  public static toPositionResponse(
    dto: Position,
    baseUrl: string,
  ): PositionResponse {
    return new PositionResponse({
      id: dto.id,
      agreementRef: `${baseUrl}/agreement/${dto.agreementRef}`,
      xCoordinate: dto.xCoordinate,
      yCoordinate: dto.yCoordinate,
      datetime: dto.datetime,
    });
  }
}
