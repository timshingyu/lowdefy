import State from '../src/State';

test('set', () => {
  const context = {
    showValidationErrors: false,
    state: {},
  };
  const state = new State(context);
  state.set('a', 1);
  expect(context.state).toEqual({ a: 1 });
});

test('resetState and clear showValidationErrors flag', () => {
  const context = {
    showValidationErrors: false,
    state: {},
  };
  const state = new State(context);
  state.freezeState();
  expect(context.state).toEqual({});
  state.set('a', 1);
  context.showValidationErrors = true;
  expect(context.state).toEqual({ a: 1 });
  expect(context.showValidationErrors).toEqual(true);
  state.resetState();
  expect(context.state).toEqual({});
  expect(context.showValidationErrors).toEqual(false);
});

test('freezeState to only set when initialized is false and resetState restores frozenState', () => {
  const context = {
    showValidationErrors: false,
    state: {},
  };
  const state = new State(context);
  state.set('a', 1);
  expect(state.initialized).toEqual(false);
  state.freezeState();
  expect(context.state).toEqual({ a: 1 });
  expect(state.initialized).toEqual(true);
  state.set('a', 3);
  state.set('b', 1);
  state.freezeState();
  expect(context.state).toEqual({ a: 3, b: 1 });
  state.resetState();
  expect(context.state).toEqual({ a: 1 });
  expect(state.initialized).toEqual(true);
});

test('set on array', () => {
  const context = {
    showValidationErrors: false,
    state: {},
  };
  const state = new State(context);
  context.state = { a: [1, 2] };
  state.set('a.2', 3);
  expect(context.state).toEqual({ a: [1, 2, 3] });
});

test('set on array with nested arrays', () => {
  const context = {
    showValidationErrors: false,
    state: {},
  };
  const state = new State(context);
  context.state = { a: [1, 2] };
  state.set('a.2.2.a.2.c', 3);
  expect(context.state).toEqual({
    a: [1, 2, [undefined, undefined, { a: [undefined, undefined, { c: 3 }] }]],
  });
});

test('del', () => {
  const context = {
    showValidationErrors: false,
    state: {},
  };
  const state = new State(context);
  context.state = { a: 1 };
  state.del('a');
  expect(context.state).toEqual({});
});

test('swapItems', () => {
  const context = {
    showValidationErrors: false,
    state: {},
  };
  const state = new State(context);
  context.state = { arr: [0, 1, 2, 3, 4, 5] };
  state.swapItems('arr', 3, 4);
  expect(context.state).toEqual({ arr: [0, 1, 2, 4, 3, 5] });
});

test('removeItem', () => {
  const context = {
    showValidationErrors: false,
    state: {},
  };
  const state = new State(context);
  context.state = { arr: [0, 1, 2, 3, 4, 5] };
  state.removeItem('arr', 3);
  expect(context.state).toEqual({ arr: [0, 1, 2, 4, 5] });
});

test('not an array', () => {
  const context = {
    showValidationErrors: false,
    state: {},
  };
  const state = new State(context);
  context.state = { arr: 'x' };
  state.removeItem('arr', 3);
  expect(context.state).toEqual({ arr: 'x' });
  state.swapItems('arr', 3, 4);
  expect(context.state).toEqual({ arr: 'x' });
});

test('out of array bounds', () => {
  const context = {
    showValidationErrors: false,
    state: {},
  };
  const state = new State(context);
  context.state = { arr: [0, 1, 2, 3, 4, 5] };
  state.removeItem('arr', 6);
  expect(context.state).toEqual({ arr: [0, 1, 2, 3, 4, 5] });
  state.removeItem('arr', -1);
  expect(context.state).toEqual({ arr: [0, 1, 2, 3, 4, 5] });
  state.swapItems('arr', 6, 5);
  expect(context.state).toEqual({ arr: [0, 1, 2, 3, 4, 5] });
  state.swapItems('arr', -1, 0);
  expect(context.state).toEqual({ arr: [0, 1, 2, 3, 4, 5] });
});

test('combinations', () => {
  const context = {
    showValidationErrors: false,
    state: {},
  };
  const state = new State(context);
  context.state = { arr: [0, 1, 2, 3, 4, 5], b: 'b' };
  state.removeItem('arr', 3);
  expect(context.state).toEqual({ arr: [0, 1, 2, 4, 5], b: 'b' });
  state.set('b', 'c');
  expect(context.state).toEqual({ arr: [0, 1, 2, 4, 5], b: 'c' });
  state.swapItems('arr', 2, 3);
  expect(context.state).toEqual({ arr: [0, 1, 4, 2, 5], b: 'c' });
  state.del('b');
  expect(context.state).toEqual({ arr: [0, 1, 4, 2, 5] });
  state.set('a', 'v');
  expect(context.state).toEqual({ arr: [0, 1, 4, 2, 5], a: 'v' });
});
