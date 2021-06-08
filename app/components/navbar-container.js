import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import{ action } from '@ember/object';
export default class NavbarContainerComponent extends Component {
    @service store;
    @service router;

    //if user is login template show logout nd profile option
    get checkUserLogin(){
        let data = this.store.peekAll('user-detail').filter((ele) => {
            return ele.state == "true";
          });
          console.log(data);
          if (data.length == 0) {
            return false;
          } else {
            
            return true;
          }
    }
    
    //get the userId for fetch the user details when file loads
    get userID(){
      let data=this.store.peekAll('user-detail');
      let id;
      data.forEach(element => {
        id=element.id;
      });
      console.log(id);
      return id;
    }
    
    //logout action
    @action
    async logOut(){
        const logOutAction=await fetch("http://localhost:8080/ticketApp/logoutUser?state="+false).then(response => response.json());
        if(logOutAction.logout=="success"){
          document.cookie = "phone_number=; path=/; max-age=0";
          document.cookie = "id=; path=/; max-age=0";
          document.cookie = "cookiestate=; path=/; max-age=0";
          this.router.transitionTo('login-page');
        }
    }
}
