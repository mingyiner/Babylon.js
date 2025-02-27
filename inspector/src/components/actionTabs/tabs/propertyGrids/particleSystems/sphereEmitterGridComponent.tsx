import * as React from "react";

import { Observable } from "babylonjs/Misc/observable";
import { GlobalState } from '../../../../globalState';
import { PropertyChangedEvent } from '../../../../propertyChangedEvent';
import { LockObject } from '../../../../../sharedUiComponents/tabs/propertyGrids/lockObject';
import { SphereParticleEmitter } from 'babylonjs/Particles/EmitterTypes/sphereParticleEmitter';
import { FloatLineComponent } from '../../../../../sharedUiComponents/lines/floatLineComponent';
import { SliderLineComponent } from '../../../../../sharedUiComponents/lines/sliderLineComponent';
import {getTrans} from '../../../../../translationLng';
interface ISphereEmitterGridComponentProps {
    globalState: GlobalState;
    emitter: SphereParticleEmitter,
    lockObject: LockObject,
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>
}

export class SphereEmitterGridComponent extends React.Component<ISphereEmitterGridComponentProps> {
    constructor(props: ISphereEmitterGridComponentProps) {
        super(props);

    }

    render() {
        let emitter = this.props.emitter;
        return (
            <>                   
                <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Radius_')} target={emitter} propertyName="radius" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                <SliderLineComponent label={getTrans('Radiusrange')} target={emitter} propertyName="radiusRange" minimum={0} maximum={1} step={0.01} 
                    onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                <SliderLineComponent label={getTrans('Directionrandomizer')} target={emitter} propertyName="directionRandomizer" minimum={0} maximum={1} step={0.01} 
                    onPropertyChangedObservable={this.props.onPropertyChangedObservable} />               
            </>
        );
    }
}