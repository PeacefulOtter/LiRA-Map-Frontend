

import { Polyline } from 'react-leaflet'

import { DEFAULT_COLOR, DEFAULT_OPACITY, DEFAULT_WIDTH } from '../../../assets/properties';
import { Renderer } from '../../../models/renderers';


const Line: Renderer = ( { dataPath, properties, onClick } ) => {
    
    return <Polyline 
        positions={dataPath.path}
        key={`${Math.random()}-line`}
        pathOptions={{
            color: properties.color || DEFAULT_COLOR,
            weight: properties.width || DEFAULT_WIDTH,
            opacity: properties.opacity || DEFAULT_OPACITY
        }} 
        eventHandlers={{'click': onClick(0)}} >
            
        </Polyline>
}


export default Line;