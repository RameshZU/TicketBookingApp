import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  model(){
    let flightDetailsObject=this.store.findAll('flight-detail');
    return flightDetailsObject;
  }
  
  setupController(controller) {
    super.setupController(controller);
    this.controllerFor('application').get('checkCookie');
  }
}
