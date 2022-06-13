export class ControllerEndpointsUtils {
  public static getEndpoint(endpointName: string) {
    const endpoints = {
      addresses: 'address',
      animals: 'animals',
      providers: 'provider',
      provider: 'provider',
      recipients: 'recipient',
      recipient: 'recipient',
      recommendations: 'recommendation',
    };

    if (!endpoints[endpointName])
      throw new Error('Controller endpoint not found');
    return endpoints[endpointName];
  }
}
