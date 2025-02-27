import * as React from "react";

import { Observable } from "babylonjs/Misc/observable";
import { GlobalState } from '../../../../globalState';
import { PropertyChangedEvent } from '../../../../propertyChangedEvent';
import { SliderLineComponent } from '../../../../../sharedUiComponents/lines/sliderLineComponent';
import { CylinderParticleEmitter } from 'babylonjs/Particles/EmitterTypes/cylinderParticleEmitter';
import { FloatLineComponent } from '../../../../../sharedUiComponents/lines/floatLineComponent';
import { LockObject } from '../../../../../sharedUiComponents/tabs/propertyGrids/lockObject';
import {getTrans} from '../../../../../translationLng';
interface ICylinderEmitterGridComponentProps {
    globalState: GlobalState;
    emitter: CylinderParticleEmitter,
    lockObject: LockObject,
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>
}

export class CylinderEmitterGridComponent extends React.Component<ICylinderEmitterGridComponentProps> {
    constructor(props: ICylinderEmitterGridComponentProps) {
        super(props);

    }

    render() {
        let emitter = this.props.emitter;
        return (
            <>                    
                <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Radius_')} target={emitter} propertyName="radius" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Height')} target={emitter} propertyName="height" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                <SliderLineComponent label={getTrans('Radiusrange')} target={emitter} propertyName="radiusRange" minimum={0} maximum={1} step={0.01} 
                    onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                <SliderLineComponent label={getTrans('Directionrandomizer')} target={emitter} propertyName="directionRandomizer" minimum={0} maximum={1} step={0.01} 
                    onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
            </>
        );
    }
}