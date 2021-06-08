import Route from '@ember/routing/route';

export default class AboutFlightRoute extends Route {
    model(params){
        const{flight_id}=params;
        return this.store.peekRecord('flight-detail',flight_id);
    }
}
