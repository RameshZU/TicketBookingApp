import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
    model(){
        let flightDetailsObject=this.store.findAll('flight-detail');
        return flightDetailsObject;
      }
}
