import Component from '@glimmer/component';
import { action } from '@ember/object';
export default class SelectTagInputComponent extends Component {

  //user select the type and price is autofilled in the store and add the selectd gender
  @action
  selectTicketType(element){
    let price=["4999","1988","3599"];
    if (
      element.target.value == 'Business' ||
      element.target.value == 'Economy' ||
      element.target.value == 'Premium'
    ) {
      this.args.modelObj.ticket_type = element.target.value;
      for(let i=0;i<price.length;i++){
        if(this.args.data[i]==element.target.value){
          element.target.nextElementSibling.value=price[i];
          this.args.modelObj.ticket_price=price[i];
        }
      }
    }
    else if( element.target.value == 'Male' ||
    element.target.value == 'Female' ||
    element.target.value == 'Others'){
      this.args.modelObj.gender = element.target.value;
    }
    else{
      this.args.modelObj.day = element.target.value;
    }
  }
}
