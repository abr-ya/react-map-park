import React from 'react';
import { MapBrowserEvent } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import { MapContext } from '../../map';
import { IMapContext } from '../../map-types';
import { TVectorLayerProps, TVectorLayerComponentProps } from './vector-types';

const getStyle = (color: string) => (
  new Style({
    image: new Circle({
      radius: 6,
      fill: new Fill({color}),
      stroke: new Stroke({
        color: [0, 0, 0], width: 2,
      }),
    }),
  })
);

class VectorLayerComponent extends React.PureComponent<TVectorLayerComponentProps> {
  layer: VectorLayer;

  source: VectorSource;

  componentDidMount() {
    const point1 = new Feature({ geometry: new Point([4420563.861800642, 5981630.349013899]) });
    const point2 = new Feature({ geometry: new Point([4420645.076143195, 5981223.0829725675]) });
    const point3 = new Feature({ geometry: new Point([4420764.508999893, 5980843.286488277]) });

    const style1 = getStyle('blue');
    const features = [point1, point2, point3];
    features.map((point) => point.setStyle(style1));

    this.source = new VectorSource({
      features,
    });

    this.layer = new VectorLayer({
      source: this.source,
    });

    this.props.map.addLayer(this.layer);
    // this.props.map.on('singleclick', this.onMapClick); // новый маркер
  }
  /*
  componentWillUnmount() {
    this.props.map.removeLayer(this.layer);
  }

  componentDidUpdate(prevProps: TVectorLayerComponentProps) {
    if (prevProps.features != this.props.features) {
      this.source.clear();
      if (this.props.features) {
        this.source.addFeatures(this.props.features);
      }
    }
  }
  */

  onMapClick = (event: MapBrowserEvent) => {
    console.log(event.coordinate);
    const featureToAdd = new Feature({
      geometry: new Point(event.coordinate),
    });
    const style = new Style({
      image: new Circle({
        radius: 6,
        fill: new Fill({color: 'red'}),
        stroke: new Stroke({
          color: [0, 0, 0], width: 2,
        }),
      }),
    });
    featureToAdd.setStyle(style);
    // this.source.clear();
    this.source.addFeatures([featureToAdd]);
  };

  render() {
    return null;
  }
}

const VectorLayerWithContext = (props: TVectorLayerProps) => {
  console.log(props);
  return (
    <MapContext.Consumer>
      {(mapContext: IMapContext | void) => {
        if (mapContext) {
          console.log(mapContext);
          return <VectorLayerComponent {...props} map={mapContext.map} />;
        }
      }}
    </MapContext.Consumer>
  );
};

export default VectorLayerWithContext;
