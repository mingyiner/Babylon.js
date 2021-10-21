import * as React from "react";

import { Observable } from "babylonjs/Misc/observable";
import { GlobalState } from '../../../../globalState';
import { PropertyChangedEvent } from '../../../../propertyChangedEvent';
import { ConeParticleEmitter } from 'babylonjs/Particles/EmitterTypes/coneParticleEmitter';
import { SliderLineComponent } from '../../../../../sharedUiComponents/lines/sliderLineComponent';
import { CheckBoxLineComponent } from '../../../../../sharedUiComponents/lines/checkBoxLineComponent';
import {getTrans} from '../../../../../translationLng';
interface IConeEmitterGridComponentProps {
    globalState: GlobalState;
    emitter: ConeParticleEmitter,
    onSelectionChangedObservable?: Observable<any>,
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>
}

export class ConeEmitterGridComponent extends React.Component<IConeEmitterGridComponentProps> {
    constructor(props: IConeEmitterGridComponentProps) {
        super(props);

    }

    render() {
        let emitter = this.props.emitter;
        return (
            <>
                <SliderLineComponent label={getTrans('Radiusrange')} target={emitter} propertyName="radiusRange" minimum={0} maximum={1} step={0.01} 
                    onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                <SliderLineComponent label={getTrans('Heightrange')} target={emitter} propertyName="heightRange" minimum={0} maximum={1} step={0.01} 
                    onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                <CheckBoxLineComponent label={getTrans('Emitfromspawnpointonly')} target={emitter} propertyName="emitFromSpawnPointOnly" 
                    onPropertyChangedObservable={this.props.onPropertyChangedObservable} />                    
                <SliderLineComponent label={getTrans('Directionrandomizer')} target={emitter} propertyName="directionRandomizer" minimum={0} maximum={1} step={0.01} 
                    onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
            </>
        );
    }
}