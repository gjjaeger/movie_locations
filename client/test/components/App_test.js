import { renderComponent, expect } from '../test_helper';
import App from '../../src/components/App';

describe('App', () => {
  let component;

  beforeEach(() => {
    const state = {
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
              },
              {
                address: 'Palace of Fine Arts',
                lat: '37.80291855',
                lng: '-122.448402864353',
                _movie: '59cb48ab0885a160059e5c50',
                _id: '59cb48ab0885a160059e5c5e'
              },
              {
                address: 'Bernal Heights Park',
                lat: '37.74343975',
                lng: '-122.413470504348',
                _movie: '59cb48ab0885a160059e5c50',
                _id: '59cb48ab0885a160059e5c66'
              },
              {
                address: '679 Madrid St',
                lat: '37.7216254',
                lng: '-122.4328201',
                _movie: '59cb48ab0885a160059e5c50',
                _id: '59cb48ab0885a160059e5c7c'
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
              },
              {
                address: 'City Hall',
                lat: '5.9652594',
                lng: '-75.1017103',
                _movie: '59cb48ab0885a160059e5c48',
                _id: '59cb48ab0885a160059e5c7b'
              }
            ],
            __v: 4
          }
        }
      }
    };
    component = renderComponent(App, null, state);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });
});
