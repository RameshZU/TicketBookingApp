import Model,{ attr } from '@ember-data/model';

export default class FlightDetailModel extends Model {           
@attr flight_name;
@attr from_city;
@attr to_city;
@attr time;
@attr day_schedule;
@attr seat_availability;
@attr image;
}
