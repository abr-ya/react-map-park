/* eslint-disable no-underscore-dangle */
import React from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { transform } from 'ol/proj';
import VectorLayer from './layers/vector/vector';
import { TMapProps, IMapContext, TMapState } from './map-types';
import 'ol/ol.css';
import './map.css';

export const MapContext = React.createContext<IMapContext | void>(undefined);

class MapComponent extends React.PureComponent<TMapProps, TMapState> {
  private mapDivRef: React.RefObject<HTMLDivElement>;

  constructor(props: TMapProps) {
    super(props);
    this.mapDivRef = React.createRef<HTMLDivElement>();
    this.state = {};
  }

  componentDidMount() {
    if (!this.mapDivRef.current) {
      return;
    }

    const mapLayer = new TileLayer({
      source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      }),
    });

    const map = new Map({
      target: this.mapDivRef.current,
      layers: [mapLayer],
      view: new View({
        center: transform([39.71, 47.24], 'EPSG:4326', 'EPSG:3857'),
        zoom: 16,
      }),
    });

    // common switch function
    const itemClickHandler = (feature: any, el?: any) => {
      console.log(feature.values_.geometry.flatCoordinates);

      map.getView().animate(
        {center: feature.values_.geometry.flatCoordinates},
        {zoom: 17},
      );
    };

    // dot clicks
    map.addEventListener('click', (e: any) => {
      map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
        console.log(feature, layer);
        // const navEl = nav.children.namedItem(feature.values_.city);
        itemClickHandler(feature);
      });
    });

    const mapContext: IMapContext = { map };
    this.setState({
      mapContext,
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="map" ref={this.mapDivRef}>
          {this.state.mapContext && (
            <MapContext.Provider value={this.state.mapContext}>
              <VectorLayer />
            </MapContext.Provider>
          )}
        </div>
      </div>
    );
  }
}

export default MapComponent;
