import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ProfilePageController extends Controller {
    @tracked passengerEmpty;
   
    //get the userData from the ember store
    get getUserData(){
        let userData=this.store.peekAll('user-detail');
        return userData;
    }

    
    //get the total ticket amount price
    get getTotalAmount(){
        let totalAmount=0;
        if(this.model.length!=0){
            this.model.forEach((passengerData)=>{
                totalAmount+=Number(passengerData.payment_amount);
               })
        }
       return totalAmount; 
    }

    //check the passenger record is empty or not
    get isPassengerAvailable(){
        console.log(this.model.length);
        if(this.model.length==0){
            return true;
        }
        else{
            return false;
        }
    }
}
