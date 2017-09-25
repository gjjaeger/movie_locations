import { renderComponent, expect } from '../test_helper';
import MapContainer from '../../src/components/MapContainer';

describe('MapContainer', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(MapContainer);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });
});
