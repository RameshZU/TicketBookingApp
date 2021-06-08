import Route from '@ember/routing/route';

export default class TicketBookingPageRoute extends Route {
    model(params){
        const{flight_id}=params;
        let flightDetails=this.store.peekRecord('flight-detail',Number(flight_id));
        return flightDetails;
    }

    setupController(controller,model) {
        super.setupController(controller,model);
        this.controllerFor('ticket-booking-page').addThePassenger();
    }

    deactivate(){
        let passeengerData=this.store.peekAll('passenger-detail');
        passeengerData.forEach((passenger)=>{
           if(passenger.get('hasDirtyAttributes')){
               passenger.deleteRecord();
           }
        })
    }
}
