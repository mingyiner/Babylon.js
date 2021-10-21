import * as React from "react";

import { ArcRotateCamera } from "babylonjs/Cameras/arcRotateCamera";
import { Observable } from "babylonjs/Misc/observable";

import { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import { CommonCameraPropertyGridComponent } from "./commonCameraPropertyGridComponent";
import { LineContainerComponent } from "../../../../../sharedUiComponents/lines/lineContainerComponent";
import { CheckBoxLineComponent } from "../../../../../sharedUiComponents/lines/checkBoxLineComponent";
import { FloatLineComponent } from "../../../../../sharedUiComponents/lines/floatLineComponent";
import { SliderLineComponent } from "../../../../../sharedUiComponents/lines/sliderLineComponent";
import { Vector3LineComponent } from "../../../../../sharedUiComponents/lines/vector3LineComponent";
import { LockObject } from "../../../../../sharedUiComponents/tabs/propertyGrids/lockObject";
import { GlobalState } from '../../../../globalState';
import { getTrans } from "../../../../../translationLng";
interface IArcRotateCameraPropertyGridComponentProps {
    globalState: GlobalState;
    camera: ArcRotateCamera;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}

export class ArcRotateCameraPropertyGridComponent extends React.Component<IArcRotateCameraPropertyGridComponentProps> {
    constructor(props: IArcRotateCameraPropertyGridComponentProps) {
        super(props);
    }

    render() {
        const camera = this.props.camera;

        return (
            <div className="pane">
                <CommonCameraPropertyGridComponent globalState={this.props.globalState} lockObject={this.props.lockObject} camera={camera} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                <LineContainerComponent title={getTrans('TRANSFORMS')} selection={this.props.globalState}>
                    <Vector3LineComponent label={getTrans('Target')} target={camera} propertyName="target" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label={getTrans('Alpha')} useEuler={this.props.globalState.onlyUseEulers} target={camera} propertyName="alpha" minimum={camera.lowerAlphaLimit || 0} maximum={camera.upperAlphaLimit || 2 * Math.PI} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label={getTrans('Beta')} useEuler={this.props.globalState.onlyUseEulers} target={camera} propertyName="beta" minimum={camera.lowerAlphaLimit || 0} maximum={camera.upperBetaLimit || 2 * Math.PI} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Radius_')} target={camera} propertyName="radius" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('CONTROLS')} closed={true} selection={this.props.globalState}>
                    <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('AngularsensitivityX')} target={camera} propertyName="angularSensibilityX" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('AngularsensitivityY')} target={camera} propertyName="angularSensibilityY" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Panningsensitivity')} target={camera} propertyName="panningSensibility" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Pinchdeltapercentage')} target={camera} propertyName="pinchDeltaPercentage" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Wheeldeltapercentage')} target={camera} propertyName="wheelDeltaPercentage" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Speed')} target={camera} propertyName="speed" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('COLLISIONS')} closed={true} selection={this.props.globalState}>
                    <CheckBoxLineComponent label={getTrans('Checkcollisions')} target={camera} propertyName="checkCollisions" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <Vector3LineComponent label={getTrans('Collisionradius')} target={camera} propertyName="collisionRadius" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('LIMITS')} closed={true} selection={this.props.globalState}>
                    <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Loweralphalimit')} target={camera} propertyName="lowerAlphaLimit" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Upperalphalimit')} target={camera} propertyName="upperAlphaLimit" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Lowerbetalimit')} target={camera} propertyName="lowerBetaLimit" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Upperbetalimit')} target={camera} propertyName="upperBetaLimit" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Lowerradiuslimit')} target={camera} propertyName="lowerRadiusLimit" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Upperradiuslimit')} target={camera} propertyName="upperRadiusLimit" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('BEHAVIORS')} closed={true} selection={this.props.globalState}>
                    <CheckBoxLineComponent label={getTrans('Autorotation')} target={camera} propertyName="useAutoRotationBehavior" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('Bouncing')} target={camera} propertyName="useBouncingBehavior" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('Framing')} target={camera} propertyName="useFramingBehavior" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
            </div>
        );
    }
}