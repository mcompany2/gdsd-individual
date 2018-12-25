import { environment } from '../environments/environment';

export const config = {
  // apiUrl: 'http://loadbalancersdk-421124142.eu-central-1.elb.amazonaws.com:3000/api'
  apiUrl: environment.production ? 'https://rocky-ocean-68053.herokuapp.com/api' : 'http://localhost:3000/api'
};
