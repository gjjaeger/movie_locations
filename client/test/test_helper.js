import _$ from 'jquery';
import 'jsdom-global/register';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from '../src/reducers';

global.document = jsdom.jsdom(
  '<!doctype html><html><head><script src="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAUCiTUszeY7oXzJ7x_RLaF69FbjNWV4Dg&libraries=places"></head></script><body></body></html>'
);
global.window = global.document.defaultView;
global.navigator = global.window.navigator;
const $ = _$(window);

chaiJquery(chai, chai.util, $);

function renderComponent(ComponentClass, props = {}, state = {}) {
  const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
  const storeWithMiddleware = createStoreWithMiddleware(reducers, state);
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={storeWithMiddleware}>
      <ComponentClass {...props} />
    </Provider>
  );

  return $(ReactDOM.findDOMNode(componentInstance));
}

$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};

export { renderComponent, expect };
