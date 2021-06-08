import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
export default class LoginPageController extends Controller {
    @tracked numberCheck;
    @tracked verifyUserState;
    @service store;
    @tracked inputType="password";
    //show the password when user click the eye icon
    @action
    changeInputType(ele) {
        const type = this.inputType === 'password' ? 'text' : 'password';
        this.inputType=type;
      }

      @computed('inputType')
      get isInputTypePassword(){
        return this.inputType == "password" ? true : false ;
      }
    
    //if user input and verify user is validation is success add the cookie and retreive the data from the DB  
    @action
    verifyUserForLogin(){
        if(this.userPhoneNumber!=undefined && !(this.checkNumber()) && this.pwd!=undefined && !(this.verifyUserState) && this.userPhoneNumber.length>9){
            let data=this.store.queryRecord('user-detail',{  "phone_number":this.userPhoneNumber,"password":this.pwd}).then((result)=>{
                if(result.get('id')!=null){
                  //this.addHasManyBelognsToData(result.get('id'));
                  document.cookie="id=1; path=/; max-age=" + 30*24*60*60;
                  document.cookie="cookiestate=true; path=/; max-age=" + 30*24*60*60;
                  document.cookie="phone_number="+this.userPhoneNumber+"; path=/; max-age=" + 30*24*60*60;
                  this.transitionToRoute('index');
                  this.userPhoneNumber="";
                  this.pwd="";
                }
            })
            
        }
    }

    //verify the user in the DB
    @action
   verifyUser(){
        if(this.userPhoneNumber != undefined  && !(this.checkNumber()) && this.userPhoneNumber.length>9){
          this.numberCheck=false;
          const data=fetch("http://localhost:8080/ticketApp/checkUser?phone_number="+this.userPhoneNumber).then(response => response.json())
          .then(result => { 
           if(result.checkuser.state==="true"){
           this.verifyUserState=false;
           }
           else{
            this.verifyUserState=true;
          }
         })
        }
       }

    //validate user login input
    @action
    validateInput(){
      if(this.userPhoneNumber==undefined || this.checkNumber()  || this.userPhoneNumber.length<9){
         this.numberCheck=true;
      }
      else{
          this.numberCheck=false;
      }
      this.verifyUserForLogin();
    }
    
    //check the input is number
    checkNumber(){
        return isNaN(this.userPhoneNumber)
    }
}
