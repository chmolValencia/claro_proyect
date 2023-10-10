import{ZuulController}from '../app/config';

export function ApiUrlZuul(endpoint: string): string {
  return `${ZuulController.apiUrl}/${endpoint}`;
}
