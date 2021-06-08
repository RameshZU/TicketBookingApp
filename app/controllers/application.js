import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
    //get the cookie from the browser
    getCookie(cookieKeyName){
            var cookieName = cookieKeyName + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var cookieArray = decodedCookie.split('; ');
            console.log(cookieArray);
            for(let i = 0; i < cookieArray.length; i++) {
              var singleCookie = cookieArray[i];
              console.log("outer while"+singleCookie);
              if (singleCookie.indexOf(cookieName) == 0) {
                return singleCookie.substring(cookieName.length, singleCookie.length);
              }
            }
            return "";
          }
    //get the cookie and check it's stored or not
    get checkCookie() {
      console.log("hello");
        var userCookie=this.getCookie("phone_number");
        var stateCookie=this.getCookie("cookiestate");
        if (userCookie != "" && stateCookie!="" ) {
         let data= this.store.queryRecord('user-detail',{ "phone_number":userCookie,"cookiestate":stateCookie}).then((result) =>{
           console.log(); result.get('id')
         });
        } else {
          this.transitionToRoute('index');
        }
      }      
    
}

