import Route from '@ember/routing/route';

export default class CancelTicketRoute extends Route {
    model(params){
        const { passenger_id }=params;
        let passengerData=this.store.queryRecord('passenger-detail',{ passengerId:Number(passenger_id)});
        return passengerData;
    }
}
