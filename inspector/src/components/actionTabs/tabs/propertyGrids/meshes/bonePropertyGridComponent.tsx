import * as React from "react";

import { Observable } from "babylonjs/Misc/observable";

import { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import { LineContainerComponent } from "../../../../../sharedUiComponents/lines/lineContainerComponent";
import { TextLineComponent } from "../../../../../sharedUiComponents/lines/textLineComponent";
import { LockObject } from "../../../../../sharedUiComponents/tabs/propertyGrids/lockObject";
import { GlobalState } from '../../../../globalState';
import { Bone } from 'babylonjs/Bones/bone';
import { Vector3LineComponent } from '../../../../../sharedUiComponents/lines/vector3LineComponent';
import { QuaternionLineComponent } from '../../../lines/quaternionLineComponent';
import {getTrans} from '../../../../../translationLng';
interface IBonePropertyGridComponentProps {
    globalState: GlobalState;
    bone: Bone,
    lockObject: LockObject,
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>
}

export class BonePropertyGridComponent extends React.Component<IBonePropertyGridComponentProps> {
    constructor(props: IBonePropertyGridComponentProps) {
        super(props);
    }

    onTransformNodeLink() {
        if (!this.props.globalState.onSelectionChangedObservable) {
            return;
        }

        const node = this.props.bone.getTransformNode()!;
        this.props.globalState.onSelectionChangedObservable.notifyObservers(node);
    }    

    render() {
        const bone = this.props.bone;

        return (
            <div className="pane">
                <LineContainerComponent title={getTrans('GENERAL')} selection={this.props.globalState}>
                    <TextLineComponent label={getTrans('Name')} value={bone.name} />
                    <TextLineComponent label={getTrans('Index')} value={bone.getIndex().toString()} />
                    <TextLineComponent label={getTrans('UniqueID')} value={bone.uniqueId.toString()} />
                    {
                        bone.getParent() &&
                        <TextLineComponent label={getTrans('Parent')}value={bone.getParent()!.name} onLink={() => this.props.globalState.onSelectionChangedObservable.notifyObservers(bone.getParent())}/>
                    }                    
                    {
                        bone.getTransformNode() &&
                        <TextLineComponent label={getTrans('Linkednode')} value={bone.getTransformNode()!.name} onLink={() => this.onTransformNodeLink()}/>
                    }
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('TRANSFORMATIONS')} selection={this.props.globalState}>
                    <Vector3LineComponent label={getTrans('Position')} target={bone} propertyName="position" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    {
                        !bone.rotationQuaternion &&
                        <Vector3LineComponent label={getTrans('Rotation')} useEuler={this.props.globalState.onlyUseEulers} target={bone} propertyName="rotation" step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        bone.rotationQuaternion &&
                        <QuaternionLineComponent label={getTrans('Rotation')} useEuler={this.props.globalState.onlyUseEulers} target={bone} propertyName="rotationQuaternion" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    <Vector3LineComponent label={getTrans('Scaling')} target={bone} propertyName="scaling" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>                
            </div>
        );
    }
}