import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | profile-booking-page', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:profile-booking-page');
    assert.ok(route);
  });
});
