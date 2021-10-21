import * as React from "react";

import { Nullable } from "babylonjs/types";
import { Observable } from "babylonjs/Misc/observable";
import { Tools } from "babylonjs/Misc/tools";
import { Vector3 } from "babylonjs/Maths/math.vector";
import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
import { CubeTexture } from "babylonjs/Materials/Textures/cubeTexture";
import { ImageProcessingConfiguration } from "babylonjs/Materials/imageProcessingConfiguration";
import { Scene } from "babylonjs/scene";

import { PropertyChangedEvent } from "../../../propertyChangedEvent";
import { LineContainerComponent } from "../../../../sharedUiComponents/lines/lineContainerComponent";
import { RadioButtonLineComponent } from "../../../../sharedUiComponents/lines/radioLineComponent";
import { Color3LineComponent } from "../../../../sharedUiComponents/lines/color3LineComponent";
import { CheckBoxLineComponent } from "../../../../sharedUiComponents/lines/checkBoxLineComponent";
import { FogPropertyGridComponent } from "./fogPropertyGridComponent";
import { FileButtonLineComponent } from "../../../../sharedUiComponents/lines/fileButtonLineComponent";
import { TextureLinkLineComponent } from "../../lines/textureLinkLineComponent";
import { Vector3LineComponent } from "../../../../sharedUiComponents/lines/vector3LineComponent";
import { FloatLineComponent } from "../../../../sharedUiComponents/lines/floatLineComponent";
import { SliderLineComponent } from "../../../../sharedUiComponents/lines/sliderLineComponent";
import { OptionsLineComponent } from "../../../../sharedUiComponents/lines/optionsLineComponent";
import { LockObject } from "../../../../sharedUiComponents/tabs/propertyGrids/lockObject";
import { GlobalState } from '../../../globalState';
import { ButtonLineComponent } from '../../../../sharedUiComponents/lines/buttonLineComponent';
import { AnimationGridComponent } from './animations/animationPropertyGridComponent';
import {getTrans} from '../../../../translationLng';
interface IScenePropertyGridComponentProps {
    globalState: GlobalState;
    scene: Scene;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onSelectionChangedObservable?: Observable<any>;
}

export class ScenePropertyGridComponent extends React.Component<IScenePropertyGridComponentProps> {
    private _storedEnvironmentTexture: Nullable<BaseTexture>;
    private _renderingModeGroupObservable = new Observable<RadioButtonLineComponent>();

    constructor(props: IScenePropertyGridComponentProps) {
        super(props);
    }

    setRenderingModes(point: boolean, wireframe: boolean) {
        const scene = this.props.scene;
        scene.forcePointsCloud = point;
        scene.forceWireframe = wireframe;
    }

    switchIBL() {
        const scene = this.props.scene;

        if (scene.environmentTexture) {
            this._storedEnvironmentTexture = scene.environmentTexture;
            scene.environmentTexture = null;
        } else {
            scene.environmentTexture = this._storedEnvironmentTexture;
            this._storedEnvironmentTexture = null;
        }
    }

    updateEnvironmentTexture(file: File) {
        let isFileDDS = file.name.toLowerCase().indexOf(".dds") > 0;
        let isFileEnv = file.name.toLowerCase().indexOf(".env") > 0;
        if (!isFileDDS && !isFileEnv) {
            console.error("Unable to update environment texture. Please select a dds or env file.");
            return;
        }

        const scene = this.props.scene;
        Tools.ReadFile(file, (data) => {
            var blob = new Blob([data], { type: "octet/stream" });
            var url = URL.createObjectURL(blob);
            if (isFileDDS) {
                scene.environmentTexture = CubeTexture.CreateFromPrefilteredData(url, scene, ".dds");
            }
            else {
                scene.environmentTexture = new CubeTexture(url, scene,
                    undefined, undefined, undefined,
                    () => {
                    },
                    (message) => {
                        if (message) {
                            console.error(message);
                        }
                    },
                    undefined, undefined,
                    ".env");
            }
        }, undefined, true);
    }

    updateGravity(newValue: Vector3) {
        const scene = this.props.scene;
        const physicsEngine = scene.getPhysicsEngine()!;

        physicsEngine.setGravity(newValue);
    }

    updateTimeStep(newValue: number) {
        const scene = this.props.scene;
        const physicsEngine = scene.getPhysicsEngine()!;

        physicsEngine.setTimeStep(newValue);
    }

    normalizeScene() {
        const scene = this.props.scene;

        scene.meshes.forEach((mesh) => {
            mesh.normalizeToUnitCube(true);
            mesh.computeWorldMatrix(true);
        });
    }

    render() {
        const scene = this.props.scene;

        const physicsEngine = scene.getPhysicsEngine();
        let dummy: Nullable<{ gravity: Vector3, timeStep: number }> = null;

        if (physicsEngine) {
            dummy = {
                gravity: physicsEngine.gravity,
                timeStep: physicsEngine.getTimeStep()
            };
        }

        const imageProcessing = scene.imageProcessingConfiguration;

        var toneMappingOptions = [
            { label: getTrans('Standard'), value: ImageProcessingConfiguration.TONEMAPPING_STANDARD },
            { label: getTrans('ACES'), value: ImageProcessingConfiguration.TONEMAPPING_ACES }
        ];

        var vignetteModeOptions = [
            { label: getTrans('Multiply_'), value: ImageProcessingConfiguration.VIGNETTEMODE_MULTIPLY },
            { label: getTrans('Opaque_'), value: ImageProcessingConfiguration.VIGNETTEMODE_OPAQUE }
        ];

        return (
            <div className="pane">
                <LineContainerComponent title={getTrans('RENDERINGMODE')} selection={this.props.globalState}>
                    <RadioButtonLineComponent onSelectionChangedObservable={this._renderingModeGroupObservable} label={getTrans('Point_')} isSelected={() => scene.forcePointsCloud} onSelect={() => this.setRenderingModes(true, false)} />
                    <RadioButtonLineComponent onSelectionChangedObservable={this._renderingModeGroupObservable} label={getTrans('Wireframe_')} isSelected={() => scene.forceWireframe} onSelect={() => this.setRenderingModes(false, true)} />
                    <RadioButtonLineComponent onSelectionChangedObservable={this._renderingModeGroupObservable} label={getTrans('Solid')} isSelected={() => !scene.forcePointsCloud && !scene.forceWireframe} onSelect={() => this.setRenderingModes(false, false)} />
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('ENVIRONMENT')} selection={this.props.globalState}>
                    <Color3LineComponent label={getTrans('Clearcolor')} target={scene} propertyName="clearColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('Clearcolorenabled')} target={scene} propertyName="autoClear" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <Color3LineComponent label={getTrans('Ambientcolor')} target={scene} propertyName="ambientColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('EnvironmentTexture')} isSelected={() => scene.environmentTexture != null} onSelect={() => this.switchIBL()} />
                    {
                        scene.environmentTexture &&
                        <TextureLinkLineComponent label="Env. texture" texture={scene.environmentTexture} onSelectionChangedObservable={this.props.onSelectionChangedObservable} />
                    }
                    <FileButtonLineComponent label={getTrans('Updateenvironmenttexture')} onClick={(file) => this.updateEnvironmentTexture(file)} accept=".dds, .env" />
                    <SliderLineComponent minimum={0} maximum={2} step={0.01} label={getTrans('IBLIntensity')} target={scene} propertyName="environmentIntensity" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <FogPropertyGridComponent globalState={this.props.globalState} lockObject={this.props.lockObject} scene={scene} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
                <AnimationGridComponent globalState={this.props.globalState} animatable={scene} scene={scene} lockObject={this.props.lockObject} />
                <LineContainerComponent title={getTrans('MATERIALIMAGEPROCESSING')} selection={this.props.globalState}>
                    <SliderLineComponent minimum={0} maximum={4} step={0.1} label={getTrans('Contrast')} target={imageProcessing} propertyName="contrast" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent minimum={0} maximum={4} step={0.1} label={getTrans('Exposure')} target={imageProcessing} propertyName="exposure" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('Tonemapping')} target={imageProcessing} propertyName="toneMappingEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <OptionsLineComponent label={getTrans('Tonemappingtype')} options={toneMappingOptions} target={imageProcessing} propertyName="toneMappingType" onPropertyChangedObservable={this.props.onPropertyChangedObservable} onSelect={(value) => this.setState({ mode: value })} />
                    <CheckBoxLineComponent label={getTrans('Vignette')} target={imageProcessing} propertyName="vignetteEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent minimum={0} maximum={4} step={0.1} label={getTrans('Vignetteweight')} target={imageProcessing} propertyName="vignetteWeight" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent minimum={0} maximum={1} step={0.1} label={getTrans('Vignettestretch')} target={imageProcessing} propertyName="vignetteStretch" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent minimum={0} maximum={Math.PI} step={0.1} label={getTrans('VignetteFOV')} target={imageProcessing} propertyName="vignetteCameraFov" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent minimum={0} maximum={1} step={0.1} label={getTrans('VignettecenterX')} target={imageProcessing} propertyName="vignetteCentreX" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent minimum={0} maximum={1} step={0.1} label={getTrans('VignettecenterY')} target={imageProcessing} propertyName="vignetteCentreY" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <Color3LineComponent label={getTrans('Vignettecolor')} target={imageProcessing} propertyName="vignetteColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <OptionsLineComponent label={getTrans('Vignetteblendmode')} options={vignetteModeOptions} target={imageProcessing} propertyName="vignetteBlendMode" onPropertyChangedObservable={this.props.onPropertyChangedObservable} onSelect={(value) => this.setState({ mode: value })} />
                </LineContainerComponent>
                {
                    dummy !== null &&
                    <LineContainerComponent title={getTrans('PHYSICS')} closed={true} selection={this.props.globalState}>
                        <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Timestep')} target={dummy} propertyName="timeStep" onChange={(newValue) => this.updateTimeStep(newValue)} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        <Vector3LineComponent label={getTrans('Gravity')} target={dummy} propertyName="gravity" onChange={(newValue) => this.updateGravity(newValue)} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    </LineContainerComponent>
                }
                <LineContainerComponent title={getTrans('COLLISIONS')} closed={true} selection={this.props.globalState}>
                    <Vector3LineComponent label={getTrans('Gravity')} target={scene} propertyName="gravity" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('SHADOWS')} closed={true} selection={this.props.globalState}>
                    <ButtonLineComponent label={getTrans('Normalizescene')} onClick={() => this.normalizeScene()} />
                </LineContainerComponent>
            </div>
        );
    }
}