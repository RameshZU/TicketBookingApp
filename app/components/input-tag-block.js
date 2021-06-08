import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';
export default class InputTagBlockComponent extends Component {
  
  //check the seats availabilty in the user selected date
  @action
  async checkSeatAvailabilty(ele){
   let selectedDate=ele.target.value;
   let flight_id=this.args.flightData.id;
   console.log(this.args.flightData.id);
   const checkSeatAvilablityOnSelectedDay=await fetch("http://localhost:8080/ticketApp/checkSeatAvailabilty?date="+selectedDate+"&flight_id="+flight_id).then(response => response.json())
   .then(result => { 
       console.log(result);
       if(result.seatCount==0 && result.flight_available){
           alert("seats not available on this date")
       }
   });
  }
  
  @computed('data.ticket_type')
  get ticketPrice(){
   for(let i=0;i<this.args.record.ticketType.length;i++){
     if(this.args.record.ticketType[i]==this.args.data.ticket_type){
       this.args.data.ticket_price=this.args.record.price[i];
       return Number(this.args.record.price[i]);
     }
   }
  }


  //get the current date and set it the minum date in input date tag 
  get getCurrentDate(){
      var dateObj=new Date();
      var currentDate=dateObj.getDate();
      var currentMonth=dateObj.getMonth();
      var currentYear=dateObj.getFullYear();
      return this.mindateValidation(currentDate,currentMonth,currentYear)
  }
  
  //validate the minimum date
  mindateValidation(currentDate,currentMonth,currentYear){
    var minDate;
    if(Number(currentDate)<30){
      minDate=(Number(currentDate)+2);
    }
    else{
      minDate=(Number(currentDate)-28);
    }
  if(Number(currentMonth)<10){
      currentMonth='0'+(Number(currentMonth)+1);
  }
  else{
      currentMonth=Number(currentMonth)+1;
  }
  if(minDate<10){
      minDate='0'+minDate;
   }
    return currentYear+"-"+currentMonth+"-"+minDate;
  }
  
  //set the maximum date in the input date
  get setMaxDate(){
      var dateObj=new Date();
      var currentDate=dateObj.getDate();
      var currentMonth=dateObj.getMonth();
      var currentYear=dateObj.getFullYear();
      var bookingEndMonth;
      console.log(currentMonth);
      if(Number(currentMonth)<=8){
        bookingEndMonth=(Number(currentMonth)+4);
      }
      else{
        bookingEndMonth=(Number(currentMonth)-8);
      }
      if(currentDate<10){
        currentDate='0'+currentDate;
     }
     if(bookingEndMonth<=10){
        bookingEndMonth='0'+bookingEndMonth;
     }
      return currentYear+"-"+bookingEndMonth+"-"+currentDate;;
  }

  

}
