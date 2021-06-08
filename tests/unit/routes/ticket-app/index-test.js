import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | ticketApp/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:ticket-app/index');
    assert.ok(route);
  });
});
