import { AvailabilityResponse } from '../domain/availability.response';
import { AvailabilityProps } from '../domain/availability.props';
import { ControllerEndpointsUtils } from '../../shared/utils/controller.endpoints.utils';
import { Availability } from '../domain/availability';

export class AvailabilityAdapter {
  public static toAvailabilityResponse(
    dto: Availability,
    baseUrl: string,
  ): AvailabilityResponse {
    const props: AvailabilityProps = {
      id: dto.id,
      day: dto.day,
      dailyAvailability: dto.dailyAvailability,
      providerId: `${baseUrl}/${ControllerEndpointsUtils.getEndpoint(
        'providers',
      )}/${dto.providerId}`,
    };
    return new AvailabilityResponse(props);
  }
}
