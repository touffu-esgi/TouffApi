export class ControllerEndpointsUtils {
  public static getEndpoint(endpointName: string) {
    const endpoints = {
      addresses: 'address',
      animals: 'animals',
      providers: 'provider',
      recipients: 'recipient',
      recommendations: 'recommendation',
    };

    if (!endpoints[endpointName])
      throw new Error('Controller endpoint not found');
    return endpoints[endpointName];
  }
}
