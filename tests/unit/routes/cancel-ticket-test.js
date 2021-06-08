import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | cancel-ticket', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:cancel-ticket');
    assert.ok(route);
  });
});
