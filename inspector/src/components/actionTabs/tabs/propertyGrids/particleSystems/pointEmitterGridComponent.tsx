import * as React from "react";

import { Observable } from "babylonjs/Misc/observable";
import { GlobalState } from '../../../../globalState';
import { PropertyChangedEvent } from '../../../../propertyChangedEvent';
import { LockObject } from '../../../../../sharedUiComponents/tabs/propertyGrids/lockObject';
import { PointParticleEmitter } from 'babylonjs/Particles/EmitterTypes/pointParticleEmitter';
import { Vector3LineComponent } from '../../../../../sharedUiComponents/lines/vector3LineComponent';
import {getTrans} from '../../../../../translationLng';
interface IPointEmitterGridComponentProps {
    globalState: GlobalState;
    emitter: PointParticleEmitter,
    lockObject: LockObject,
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>
}

export class PointEmitterGridComponent extends React.Component<IPointEmitterGridComponentProps> {
    constructor(props: IPointEmitterGridComponentProps) {
        super(props);

    }

    render() {
        let emitter = this.props.emitter;
        return (
            <>                   
                <Vector3LineComponent  label={getTrans('Direction1')} target={emitter} propertyName="direction1"
                    onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                <Vector3LineComponent  label={getTrans('Direction2')} target={emitter} propertyName="direction2"
                    onPropertyChangedObservable={this.props.onPropertyChangedObservable} />                 
            </>
        );
    }
}