import * as React from "react";

import { Observable } from "babylonjs/Misc/observable";
import { GlobalState } from '../../../../globalState';
import { PropertyChangedEvent } from '../../../../propertyChangedEvent';
import { LockObject } from '../../../../../sharedUiComponents/tabs/propertyGrids/lockObject';
import { Vector3LineComponent } from '../../../../../sharedUiComponents/lines/vector3LineComponent';
import { MeshParticleEmitter } from 'babylonjs/Particles/EmitterTypes/meshParticleEmitter';
import { CheckBoxLineComponent } from '../../../../../sharedUiComponents/lines/checkBoxLineComponent';
import { MeshPickerComponent } from '../../../lines/meshPickerComponent';
import { Scene } from 'babylonjs/scene';
import {getTrans} from '../../../../../translationLng';
interface IMeshEmitterGridComponentProps {
    globalState: GlobalState;
    emitter: MeshParticleEmitter,
    scene: Scene,
    lockObject: LockObject,
    onSelectionChangedObservable?: Observable<any>,
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>
}

export class MeshEmitterGridComponent extends React.Component<IMeshEmitterGridComponentProps> {
    constructor(props: IMeshEmitterGridComponentProps) {
        super(props);

    }

    render() {
        let emitter = this.props.emitter;    

        return (
            <>        
                <MeshPickerComponent globalState={this.props.globalState} label={getTrans('Source')}scene={this.props.scene} 
                    onPropertyChangedObservable={this.props.onPropertyChangedObservable}
                    target={this.props.emitter} property="mesh"/>       
                {
                    !emitter.useMeshNormalsForDirection &&
                    <Vector3LineComponent label={getTrans('Direction1')} target={emitter} propertyName="direction1"
                        onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                }
                {
                    !emitter.useMeshNormalsForDirection &&
                    <Vector3LineComponent label={getTrans('Direction2')} target={emitter} propertyName="direction2"
                        onPropertyChangedObservable={this.props.onPropertyChangedObservable} />      
                }
                <CheckBoxLineComponent label={getTrans('Usenormalsfordirection')} target={emitter} propertyName="useMeshNormalsForDirection" 
                    onPropertyChangedObservable={this.props.onPropertyChangedObservable} />                                    
            </>
        );
    }
}