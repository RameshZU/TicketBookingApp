import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking'
export default class SignupPageController extends Controller {
 @tracked verifyUserState; 
 @tracked nameError;
 @tracked numberError;
 @tracked pwdError;
 @action

 //verify the user is already signup in the DB
 verifyUser(){
     if(this.model.phone_number != undefined && this.model.phone_number.length>9 && !(this.checkNumber()) ){
       this.numberError=false;
      const data=fetch("http://localhost:8080/ticketApp/checkUser?phone_number="+this.model.phone_number).then(response => response.json())
      .then(result => { 
       if(result.checkuser.state==="true"){
        this.verifyUserState=true;
       }
       else{
        this.verifyUserState=false;
       }
      })
     }
    }
    
    //validate signup input and add the user in the DB
    @action
    validateInput(){
      let nameCheck = /[a-zA-z]{3,25}/.test(this.model.user_name); 
       let passwordCheck = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,10}$/.test(
        this.model.password
      );
      if (
        (this.model.user_name != undefined &&
        this.model.phone_number != undefined &&
        this.model.password != undefined) &&
        (nameCheck &&
        this.model.phone_number.length > 9 &&
        passwordCheck)
      ) {
        if (!this.verifyUserState) {
         this.setId()
         this.model.phone_number=Number(this.model.phone_number)
         this.model.state=false;
         this.model.save();
          this.transitionToRoute('login-page');
        }
    }
  }
  
  //set the id in the user
  async setId(){
    let lastId=0;
    const jsonData=await fetch("http://localhost:8080/ticketApp/getId").then(response=> response.json()).then(result => {
       return result.lastid;
    });
   this.model.id=Number(jsonData)+1;
   console.log(this.model.id);
  }


  //it's validate the input if it's wrong that condition true and show the error in the ui
  @action 
  properError(){
    let nameCheck = /[a-zA-z]{3,25}/.test(this.model.user_name); 
    let passwordCheck = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/.test(
     this.model.password
   );
   if(this.model.user_name == undefined || !(nameCheck)){
     this.nameError=true;
   }
   else{
     this.nameError=false;
   }
   if(this.model.phone_number == undefined || this.model.phone_number.length<9 || this.checkNumber()){
     this.numberError=true;
   }
   else{

     this.numberError=false;
   }
   if(this.model.password == undefined || !(passwordCheck)){
     this.pwdError=true;
   }
   else{
     this.pwdError=false;
   }
   this.validateInput()
  }
  
  //ccheck the input is number type
  checkNumber(){
    return isNaN(this.model.phone_number);
   }
}
