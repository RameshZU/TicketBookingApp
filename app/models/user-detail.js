import Model,{ attr,hasMany } from '@ember-data/model';

export default class UserDetailModel extends Model {
    @attr user_name;
    @hasMany('passenger-details') passenger_data;
    @attr phone_number;
    @attr password;
    @attr state; 
}
