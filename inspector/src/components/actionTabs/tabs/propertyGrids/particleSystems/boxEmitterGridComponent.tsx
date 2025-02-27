import * as React from "react";

import { Observable } from "babylonjs/Misc/observable";
import { GlobalState } from '../../../../globalState';
import { PropertyChangedEvent } from '../../../../propertyChangedEvent';
import { BoxParticleEmitter } from 'babylonjs/Particles/EmitterTypes/boxParticleEmitter';
import { Vector3LineComponent } from '../../../../../sharedUiComponents/lines/vector3LineComponent';
import {getTrans} from '../../../../../translationLng';
interface IBoxEmitterGridComponentProps {
    globalState: GlobalState;
    emitter: BoxParticleEmitter,
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>
}

export class BoxEmitterGridComponent extends React.Component<IBoxEmitterGridComponentProps> {
    constructor(props: IBoxEmitterGridComponentProps) {
        super(props);

    }

    render() {
        let emitter = this.props.emitter;
        return (
            <>
                <Vector3LineComponent label={getTrans('Direction1')} target={emitter} propertyName="direction1"
                        onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                <Vector3LineComponent label={getTrans('Direction2')} target={emitter} propertyName="direction2"
                        onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                <Vector3LineComponent label={getTrans('Minemitbox')} target={emitter} propertyName="minEmitBox"
                        onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                <Vector3LineComponent label={getTrans('Maxemitbox')} target={emitter} propertyName="maxEmitBox"
                        onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
            </>
        );
    }
}