import * as React from "react";

import { TransformNode } from "babylonjs/Meshes/transformNode";
import { Observable } from "babylonjs/Misc/observable";

import { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import { LineContainerComponent } from "../../../../../sharedUiComponents/lines/lineContainerComponent";
import { CheckBoxLineComponent } from "../../../../../sharedUiComponents/lines/checkBoxLineComponent";
import { Vector3LineComponent } from "../../../../../sharedUiComponents/lines/vector3LineComponent";
import { TextLineComponent } from "../../../../../sharedUiComponents/lines/textLineComponent";
import { QuaternionLineComponent } from "../../../lines/quaternionLineComponent";
import { LockObject } from "../../../../../sharedUiComponents/tabs/propertyGrids/lockObject";
import { GlobalState } from '../../../../globalState';
import { CustomPropertyGridComponent } from '../customPropertyGridComponent';
import { ButtonLineComponent } from '../../../../../sharedUiComponents/lines/buttonLineComponent';
import { TextInputLineComponent } from '../../../../../sharedUiComponents/lines/textInputLineComponent';
import { AnimationGridComponent } from '../animations/animationPropertyGridComponent';
import { CommonPropertyGridComponent } from '../commonPropertyGridComponent';
import { VariantsPropertyGridComponent } from '../variantsPropertyGridComponent';
import { Mesh } from 'babylonjs/Meshes/mesh';
import {getTrans} from '../../../../../translationLng';
interface ITransformNodePropertyGridComponentProps {
    globalState: GlobalState;
    transformNode: TransformNode;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}

export class TransformNodePropertyGridComponent extends React.Component<ITransformNodePropertyGridComponentProps> {
    constructor(props: ITransformNodePropertyGridComponentProps) {
        super(props);
    }

    render() {
        const transformNode = this.props.transformNode;

        return (
            <div className="pane">
                <CustomPropertyGridComponent globalState={this.props.globalState} target={transformNode}
                    lockObject={this.props.lockObject}
                    onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                <LineContainerComponent title={getTrans('GENERAL')} selection={this.props.globalState}>
                    <TextLineComponent label="ID" value={transformNode.id} />
                    <TextInputLineComponent lockObject={this.props.lockObject} label={getTrans('Name')} target={transformNode} propertyName="name" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <TextLineComponent label={getTrans('UniqueID')} value={transformNode.uniqueId.toString()} />
                    <TextLineComponent label={getTrans('Class')} value={transformNode.getClassName()} />
                    <CheckBoxLineComponent label={getTrans('Isenabled')} isSelected={() => transformNode.isEnabled()} onSelect={(value) => transformNode.setEnabled(value)} />
                    {
                        transformNode.parent &&
                        <TextLineComponent label={getTrans('Parent')} value={transformNode.parent.name} onLink={() => this.props.globalState.onSelectionChangedObservable.notifyObservers(transformNode.parent)} />
                    }
                    <ButtonLineComponent label={getTrans('Dispose')} onClick={() => {
                        transformNode.dispose();
                        this.props.globalState.onSelectionChangedObservable.notifyObservers(null);
                    }} />
                </LineContainerComponent>
                <CommonPropertyGridComponent host={transformNode} lockObject={this.props.lockObject} globalState={this.props.globalState} />
                <VariantsPropertyGridComponent host={transformNode as Mesh} lockObject={this.props.lockObject} globalState={this.props.globalState} />
                <LineContainerComponent title={getTrans('TRANSFORMATIONS')} selection={this.props.globalState}>
                    <Vector3LineComponent label={getTrans('Position')} target={transformNode} propertyName="position" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    {
                        !transformNode.rotationQuaternion &&
                        <Vector3LineComponent label={getTrans('Rotation')} useEuler={this.props.globalState.onlyUseEulers} target={transformNode} propertyName="rotation" step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        transformNode.rotationQuaternion &&
                        <QuaternionLineComponent label={getTrans('Rotation')} useEuler={this.props.globalState.onlyUseEulers} target={transformNode} propertyName="rotationQuaternion" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    <Vector3LineComponent label={getTrans('Scaling')} target={transformNode} propertyName="scaling" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
                <AnimationGridComponent globalState={this.props.globalState} animatable={transformNode} scene={transformNode.getScene()} lockObject={this.props.lockObject} />
            </div>
        );
    }
}