import * as React from "react";

import { Observable } from "babylonjs/Misc/observable";
import { GlobalState } from '../../../../globalState';
import { PropertyChangedEvent } from '../../../../propertyChangedEvent';
import { SliderLineComponent } from '../../../../../sharedUiComponents/lines/sliderLineComponent';
import { FloatLineComponent } from '../../../../../sharedUiComponents/lines/floatLineComponent';
import { LockObject } from '../../../../../sharedUiComponents/tabs/propertyGrids/lockObject';
import { HemisphericParticleEmitter } from 'babylonjs/Particles/EmitterTypes/hemisphericParticleEmitter';
import {getTrans} from '../../../../../translationLng';
interface IHemisphericEmitterGridComponentProps {
    globalState: GlobalState;
    emitter: HemisphericParticleEmitter,
    lockObject: LockObject,    
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>
}

export class HemisphericEmitterGridComponent extends React.Component<IHemisphericEmitterGridComponentProps> {
    constructor(props: IHemisphericEmitterGridComponentProps) {
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