import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { computed } from '@ember/object';
export default class TicketBookingPageController extends Controller {
   @tracked newRecordObj=A([]);
   @service store;
   //add the passenger when add passenger button click
   @action
   addThePassenger(){
    var newRecord= this.store.createRecord('passenger-detail'); 
    this.newRecordObj.addObject(newRecord);
    this.addUserAndFlightData(newRecord);
   }
   
     addUserAndFlightData(newRecord){
        newRecord.id=this.newRecordObj.length; 
        newRecord.flight_data=this.model;
        newRecord.flight_id=Number(this.model.id);
        newRecord.ticket_type="Business"
        newRecord.ticket_price="4999";
        newRecord.gender="Male";
       let user=this.store.peekAll('user-detail');
       user.forEach((userData)=>{
        newRecord.user_id=Number(userData.id);
       });
   }

   //check the all passenger record
   recordValidation(recordObject){
    if(recordObject.passenger_name!=undefined && recordObject.passenger_name.length>3 && recordObject.age!=undefined && recordObject.age>3 && /^[A-Za-z]+$/.test(recordObject.passenger_name)){
            return true;
        }
    else{
        return false;
     }
   }

   //price validation
   offerPriceValidation(passenger){
    if(passenger.age<=10){
        passenger.offer_price=(passenger.ticket_price*30/100);
        passenger.payment_amount=(passenger.ticket_price- passenger.offer_price);
    }
    else if(passenger.age>=60){
        passenger.offer_price=(passenger.ticket_price*15/100);
        passenger.payment_amount=(passenger.ticket_price-passenger.offer_price);
    }
    else{
        passenger.offer_price=0;
        passenger.payment_amount=passenger.ticket_price;
    }
   }

   //save all the record after check the user validation
   @action
   saveAllRecord(){
       let allCheck=0;
        this.newRecordObj.forEach((passengerRecord)=>{
            if(this.recordValidation(passengerRecord) && passengerRecord.journey_date!=undefined){
               allCheck+=1;
               this.offerPriceValidation(passengerRecord);
            }  
            else{
                alert("*Passenger Name only alphabets and length should  above 3 \n*Passenger age should above 3 and within 90\n *Please give the date")
            }
        });
        if(allCheck==this.newRecordObj.length){
            this.newRecordObj.forEach((recordObject,i)=>{
                setTimeout(function(){recordObject.save()},i*1000);
            })
            if(this.newRecordObj.length==this.store.peekAll('passenger-detail').length){
                this.transitionToRoute('index');
            }
            else{

                this.transitionToRoute('/ticket-booking-page/'+this.model.id);
            }
        }

   }
   
   //ticket required select data arrays 
   get ticketDetails(){
       let selectTagOption={
           ticketType:['Business','Economy','Premium'],
           price:["4999","1988","3599"],
           gender:["Male","Female","Others"],
       }
       return selectTagOption;
   }

   //if user data is not in the ember store we won't give the chance for book the ticket
   get avaiableForBooking(){
    let userData = this.store.peekAll('user-detail');
    console.log(userData);
      if (userData.length == 0) {
        this.transitionToRoute('index');
    } 
    else {
        this.transitionToRoute('/ticket-booking-page/:'+this.model.id);
      } 
   }
}
