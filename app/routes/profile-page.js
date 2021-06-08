import Route from '@ember/routing/route';
import { A } from '@ember/array';
export default class ProfilePageRoute extends Route {
    model(params){
        const{ user_id }=params;
        let data = this.store.queryRecord('passenger-detail',{ id:Number(user_id)})
        let passengerDetailsArray=this.store.peekAll('passenger-detail');
        return passengerDetailsArray;
    }

}
