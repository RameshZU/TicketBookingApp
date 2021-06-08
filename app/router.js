import EmberRouter from '@ember/routing/router';
import config from 'ticket-booking-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login-page');
  this.route('signup-page');
  this.route('about-flight',{ path:'about-flight/:flight_id'});
  this.route('ticket-booking-page',{ path:'ticket-booking-page/:flight_id'});
  this.route('profile-page',{ path:'profile-page/:user_id'});
  this.route('cancel-ticket',{ path:'cancel-ticket/:passenger_id'});
});
