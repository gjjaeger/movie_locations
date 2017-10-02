import { renderComponent, expect } from '../test_helper';
import MovieTile from '../../src/components/MovieTile';

describe('MovieTile', () => {
  let component;

  beforeEach(() => {
    const state = {
      general: {
        markerObjects: {
          '59cb48ab0885a160059e5c51': {
            key: '59cb48ab0885a160059e5c51',
            props: {
              position: { lat: 37.8233541, lng: -122.370153102287 }
            }
          },
          '59cb48ab0885a160059e5c5d': {
            key: '59cb48ab0885a160059e5c5d',
            props: {
              position: { lat: 37.7882307, lng: -122.4537871 }
            }
          },
          '59cb48ab0885a160059e5c4b': {
            key: '59cb48ab0885a160059e5c4b',
            props: {
              position: { lat: 37.7948572, lng: -122.394900907517 }
            }
          },
          '59cb48ab0885a160059e5c5b': {
            key: '59cb48ab0885a160059e5c5b',
            props: {
              position: { lat: 37.79000325, lng: -122.399925612004 }
            }
          },
          '59cb48ab0885a160059e5c71': {
            key: '59cb48ab0885a160059e5c71',
            props: {
              position: { lat: 37.7643796, lng: -122.437885069835 }
            }
          }
        }
      },
      movies: {
        list: {
          '59cb48ab0885a160059e5c50': {
            _id: '59cb48ab0885a160059e5c50',
            title: 'Americana',
            locations: [
              {
                address: 'Treasure Island',
                lat: '37.8233541',
                lng: '-122.370153102287',
                _movie: '59cb48ab0885a160059e5c50',
                _id: '59cb48ab0885a160059e5c51'
              },
              {
                address: '33 Spruce St',
                lat: '37.7882307',
                lng: '-122.4537871',
                _movie: '59cb48ab0885a160059e5c50',
                _id: '59cb48ab0885a160059e5c5d'
              }
            ],
            __v: 5
          },
          '59cb48ab0885a160059e5c48': {
            _id: '59cb48ab0885a160059e5c48',
            title: '180',
            locations: [
              {
                address: 'Justin Herman Plaza',
                lat: '37.7948572',
                lng: '-122.394900907517',
                _movie: '59cb48ab0885a160059e5c48',
                _id: '59cb48ab0885a160059e5c4b'
              },
              {
                address: '555 Market St.',
                lat: '37.79000325',
                lng: '-122.399925612004',
                _movie: '59cb48ab0885a160059e5c48',
                _id: '59cb48ab0885a160059e5c5b'
              },
              {
                address: 'Randall Museum',
                lat: '37.7643796',
                lng: '-122.437885069835',
                _movie: '59cb48ab0885a160059e5c48',
                _id: '59cb48ab0885a160059e5c71'
              }
            ],
            __v: 4
          }
        }
      }
    };
    const movie = {
      movie: {
        _id: '59cb48ab0885a160059e5c50',
        title: 'Americana',
        locations: [
          '59cb48ab0885a160059e5c51',
          '59cb48ab0885a160059e5c5d',
          '59cb48ab0885a160059e5c5e',
          '59cb48ab0885a160059e5c66',
          '59cb48ab0885a160059e5c7c'
        ],
        __v: 5
      }
    };

    component = renderComponent(MovieTile, movie, state);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });

  describe('hover over movie', () => {
    beforeEach(() => {
      component.simulate('mouseEnter');
    });

    it('changes background-color', () => {
      expect(component.to.have.css('background-color', '#cce5a6'));
    });
  });
});
