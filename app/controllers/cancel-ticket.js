import Controller from '@ember/controller';
import { action } from '@ember/object';
export default class CancelTicketController extends Controller {
    //exit the cancellation window
    @action
    exitTicketCancellation(){
     this.transitionToRoute('/profile-page/'+this.model.user_id);
    }
    //cancel the tickets and delete the record in th DB
    @action
    cancelTheTicket(){
        this.model.deleteRecord();
        if(this.model.get('isDeleted')){
            this.model.save();
            this.transitionToRoute('index');
        }
        else{
            
        }
    }
}
