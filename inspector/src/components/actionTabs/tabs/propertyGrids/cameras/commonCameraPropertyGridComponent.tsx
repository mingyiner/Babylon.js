import * as React from "react";
import { Camera } from "babylonjs/Cameras/camera";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import { SliderLineComponent } from "../../../../../sharedUiComponents/lines/sliderLineComponent";
import { LineContainerComponent } from "../../../../../sharedUiComponents/lines/lineContainerComponent";
import { FloatLineComponent } from "../../../../../sharedUiComponents/lines/floatLineComponent";
import { TextLineComponent } from "../../../../../sharedUiComponents/lines/textLineComponent";
import { OptionsLineComponent } from "../../../../../sharedUiComponents/lines/optionsLineComponent";
import { LockObject } from "../../../../../sharedUiComponents/tabs/propertyGrids/lockObject";
import { GlobalState } from '../../../../globalState';
import { CustomPropertyGridComponent } from '../customPropertyGridComponent';
import { ButtonLineComponent } from '../../../../../sharedUiComponents/lines/buttonLineComponent';
import { TextInputLineComponent } from '../../../../../sharedUiComponents/lines/textInputLineComponent';
import { AnimationGridComponent } from '../animations/animationPropertyGridComponent';
import { HexLineComponent } from '../../../../../sharedUiComponents/lines/hexLineComponent';
import {getTrans} from '../../../../../translationLng';
interface ICommonCameraPropertyGridComponentProps {
    globalState: GlobalState;
    camera: Camera;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}

export class CommonCameraPropertyGridComponent extends React.Component<ICommonCameraPropertyGridComponentProps, { mode: number }> {
    constructor(props: ICommonCameraPropertyGridComponentProps) {
        super(props);

        this.state = { mode: this.props.camera.mode };
    }

    render() {
        const camera = this.props.camera;

        var modeOptions = [
            { label: getTrans('Perspective'), value: Camera.PERSPECTIVE_CAMERA },
            { label: getTrans("Orthographic"), value: Camera.ORTHOGRAPHIC_CAMERA }
        ];

        return (
            <div>
                <CustomPropertyGridComponent globalState={this.props.globalState} target={camera}
                    lockObject={this.props.lockObject}
                    onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                <LineContainerComponent title={getTrans('GENERAL')} selection={this.props.globalState}>
                    <TextLineComponent label="ID" value={camera.id} />
                    <TextInputLineComponent lockObject={this.props.lockObject} label={getTrans('Name')} target={camera} propertyName="name" onPropertyChangedObservable={this.props.onPropertyChangedObservable}/>
                    <TextLineComponent label={getTrans('UniqueID')} value={camera.uniqueId.toString()} />
                    <TextLineComponent label={getTrans('Class')} value={camera.getClassName()} />
                    <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Nearplane')} target={camera} propertyName="minZ" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Farplane')} target={camera} propertyName="maxZ" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label={getTrans('Inertia')} target={camera} propertyName="inertia" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <HexLineComponent isInteger lockObject={this.props.lockObject} label={getTrans('Layermask')} target={camera} propertyName="layerMask" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <OptionsLineComponent label={getTrans('Mode')} options={modeOptions} target={camera} propertyName="mode" onPropertyChangedObservable={this.props.onPropertyChangedObservable} onSelect={(value) => this.setState({ mode: value })} />
                    {
                        camera.mode === Camera.PERSPECTIVE_CAMERA &&
                        <SliderLineComponent label={getTrans('Fieldofview')} target={camera} useEuler={this.props.globalState.onlyUseEulers} propertyName="fov" minimum={0.1} maximum={Math.PI} step={0.1} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        camera.mode === Camera.ORTHOGRAPHIC_CAMERA &&
                        <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Left')} target={camera} propertyName="orthoLeft" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        camera.mode === Camera.ORTHOGRAPHIC_CAMERA &&
                        <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Top')} target={camera} propertyName="orthoTop" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        camera.mode === Camera.ORTHOGRAPHIC_CAMERA &&
                        <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Right')} target={camera} propertyName="orthoRight" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        camera.mode === Camera.ORTHOGRAPHIC_CAMERA &&
                        <FloatLineComponent lockObject={this.props.lockObject} label= {getTrans('Bottom')} target={camera} propertyName="orthoBottom" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    <ButtonLineComponent label={getTrans('Dispose')} onClick={() => {
                        camera.dispose();
                        this.props.globalState.onSelectionChangedObservable.notifyObservers(null);
                    }} />                       
                </LineContainerComponent>
                <AnimationGridComponent globalState={this.props.globalState} animatable={camera} scene={camera.getScene()} lockObject={this.props.lockObject} />
            </div>
        );
    }
}