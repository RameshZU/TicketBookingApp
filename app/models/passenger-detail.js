import Model,{attr,belongsTo,hasMany} from '@ember-data/model';

export default class PassengerDetailModel extends Model {
@belongsTo('user-detail') user_id;
@attr passenger_name;
@attr('Number') age;
@attr journey_date;
@attr gender;
@belongsTo('flight-detail') flight_id;
@attr ticket_type;
@attr('Number') offer_price;
@attr('Number') ticket_price;
@attr ('Number') payment_amount;
}
