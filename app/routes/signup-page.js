import Route from '@ember/routing/route';

export default class SignupPageRoute extends Route {
    model(){
        let newUser=this.store.createRecord('user-detail');
        return newUser;
    }

    deactivate(){
        let userData=this.store.peekAll('user-detail');
        userData.forEach((user)=>{
           if(user.get('hasDirtyAttributes')){
               user.deleteRecord();
           }
        })
    }
}
