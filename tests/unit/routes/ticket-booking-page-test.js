import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | ticket-booking-page', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:ticket-booking-page');
    assert.ok(route);
  });
});
