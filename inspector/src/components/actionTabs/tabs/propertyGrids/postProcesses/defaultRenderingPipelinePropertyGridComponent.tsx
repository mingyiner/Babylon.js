import * as React from "react";

import { Observable } from "babylonjs/Misc/observable";
import { DefaultRenderingPipeline } from "babylonjs/PostProcesses/RenderPipeline/Pipelines/defaultRenderingPipeline";

import { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import { LockObject } from "../../../../../sharedUiComponents/tabs/propertyGrids/lockObject";
import { CommonRenderingPipelinePropertyGridComponent } from './commonRenderingPipelinePropertyGridComponent';
import { SliderLineComponent } from '../../../../../sharedUiComponents/lines/sliderLineComponent';
import { LineContainerComponent } from '../../../../../sharedUiComponents/lines/lineContainerComponent';
import { CheckBoxLineComponent } from '../../../../../sharedUiComponents/lines/checkBoxLineComponent';
import { OptionsLineComponent } from '../../../../../sharedUiComponents/lines/optionsLineComponent';
import { ImageProcessingConfiguration } from 'babylonjs/Materials/imageProcessingConfiguration';
import { Color3LineComponent } from '../../../../../sharedUiComponents/lines/color3LineComponent';
import { GlobalState } from '../../../../globalState';
import { ButtonLineComponent } from '../../../../../sharedUiComponents/lines/buttonLineComponent';
import { Vector2LineComponent } from "../../../../../sharedUiComponents/lines/vector2LineComponent";
import {getTrans} from '../../../../../translationLng';
interface IDefaultRenderingPipelinePropertyGridComponentProps {
    globalState: GlobalState;
    renderPipeline: DefaultRenderingPipeline,
    lockObject: LockObject,
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>
}

export class DefaultRenderingPipelinePropertyGridComponent extends React.Component<IDefaultRenderingPipelinePropertyGridComponentProps> {
    constructor(props: IDefaultRenderingPipelinePropertyGridComponentProps) {
        super(props);
    }

    render() {
        const renderPipeline = this.props.renderPipeline;

        const camera = renderPipeline.scene.activeCamera!;

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
                <CommonRenderingPipelinePropertyGridComponent globalState={this.props.globalState} lockObject={this.props.lockObject} renderPipeline={renderPipeline} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                <LineContainerComponent title={getTrans('BLOOM')} selection={this.props.globalState}>
                    <CheckBoxLineComponent label={getTrans('Enabled')} target={renderPipeline}
                        onValueChanged={() => this.forceUpdate()}
                        propertyName="bloomEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    {
                        renderPipeline.bloomEnabled &&
                        <div>
                            <SliderLineComponent label={getTrans('Threshold')} minimum={0} maximum={1} step={0.05} target={renderPipeline} propertyName="bloomThreshold" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent label={getTrans('Weight')} minimum={0} maximum={1} step={0.05} target={renderPipeline} propertyName="bloomWeight" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent label={getTrans('Kernel')} minimum={0} maximum={128} step={1} target={renderPipeline} propertyName="bloomKernel" onPropertyChangedObservable={this.props.onPropertyChangedObservable} decimalCount={0} />
                            <SliderLineComponent label={getTrans('Scale')} minimum={0} maximum={1} step={0.25} target={renderPipeline} propertyName="bloomScale" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        </div>
                    }
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('CHROMATICABERRATION')} selection={this.props.globalState}>
                    <CheckBoxLineComponent label={getTrans('Enabled')} target={renderPipeline}
                        onValueChanged={() => this.forceUpdate()}
                        propertyName="chromaticAberrationEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    {
                        renderPipeline.chromaticAberrationEnabled &&
                        <div>
                            <SliderLineComponent label={getTrans('aberrationAmount')} minimum={0} maximum={128} step={0.1} target={renderPipeline.chromaticAberration} propertyName="aberrationAmount" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent label={getTrans('Radialintensity')} minimum={0} maximum={1} step={0.01} target={renderPipeline.chromaticAberration} propertyName="radialIntensity" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <Vector2LineComponent label={getTrans('Center')} target={renderPipeline.chromaticAberration} propertyName="centerPosition" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <Vector2LineComponent label={getTrans('Direction')} target={renderPipeline.chromaticAberration} propertyName="direction" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        </div>
                    }
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('DEPTHOFFIELD')} selection={this.props.globalState}>
                    <CheckBoxLineComponent label={getTrans('Enabled')} target={renderPipeline}
                        onValueChanged={() => this.forceUpdate()}
                        propertyName="depthOfFieldEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    {
                        renderPipeline.depthOfFieldEnabled &&
                        <div>
                            <SliderLineComponent label={getTrans('Focallength')} minimum={0} maximum={camera.maxZ} step={0.1} target={renderPipeline.depthOfField} propertyName="focalLength" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent label={getTrans('fStop')} minimum={0} maximum={32} step={0.1} target={renderPipeline.depthOfField} propertyName="fStop" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent label={getTrans('Distance')} minimum={0} maximum={camera.maxZ} step={0.1} target={renderPipeline.depthOfField} propertyName="focusDistance" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent label={getTrans('Lenssize')} minimum={0} maximum={1000} step={1} target={renderPipeline.depthOfField} propertyName="lensSize" onPropertyChangedObservable={this.props.onPropertyChangedObservable} decimalCount={0} />
                        </div>
                    }
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('FXAA')} selection={this.props.globalState}>
                    <CheckBoxLineComponent label={getTrans('Enabled')} target={renderPipeline} propertyName="fxaaEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('GLOWLAYER')} selection={this.props.globalState}>
                    <CheckBoxLineComponent label={getTrans('Enabled')} target={renderPipeline} propertyName="glowLayerEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    {
                        renderPipeline.glowLayerEnabled &&
                        <div>
                            <SliderLineComponent label={getTrans('BlurKernelSize')} minimum={1} maximum={128} step={1} decimalCount={0} target={renderPipeline.glowLayer} propertyName="blurKernelSize" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent label={getTrans('Intensity')} minimum={0} maximum={10} step={0.1} target={renderPipeline.glowLayer} propertyName="intensity" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        </div>
                    }
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('GRAIN')} selection={this.props.globalState}>
                    <CheckBoxLineComponent label={getTrans('Enabled')} target={renderPipeline}
                        onValueChanged={() => this.forceUpdate()}
                        propertyName="grainEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    {
                        renderPipeline.grainEnabled &&
                        <div>
                            <CheckBoxLineComponent label={getTrans('Animated')} target={renderPipeline.grain} propertyName="animated" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent label={getTrans('Intensity')} minimum={0} maximum={50} step={0.1} target={renderPipeline.grain} propertyName="intensity" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        </div>
                    }
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('IMAGEPROCESSING')} selection={this.props.globalState}>
                    <CheckBoxLineComponent label={getTrans('Enabled')} target={renderPipeline}
                        onValueChanged={() => this.forceUpdate()}
                        propertyName="imageProcessingEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    {
                        renderPipeline.imageProcessing &&
                        <div>                                                        
                            <ButtonLineComponent label="Convert clear color to linear" onClick={() => renderPipeline.scene.clearColor = renderPipeline.scene.clearColor.toLinearSpace()} />
                            <ButtonLineComponent label="Convert clear color to gamma" onClick={() => renderPipeline.scene.clearColor = renderPipeline.scene.clearColor.toGammaSpace()} />
                            <SliderLineComponent minimum={0} maximum={4} step={0.1} label={getTrans('Contrast')} target={renderPipeline.imageProcessing} propertyName="contrast" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent minimum={0} maximum={4} step={0.1} label={getTrans('Exposure')} target={renderPipeline.imageProcessing} propertyName="exposure" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <CheckBoxLineComponent label={getTrans('Tonemapping')} target={renderPipeline.imageProcessing} propertyName="toneMappingEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <OptionsLineComponent label={getTrans('Tonemappingtype')} options={toneMappingOptions} target={renderPipeline.imageProcessing} propertyName="toneMappingType" onPropertyChangedObservable={this.props.onPropertyChangedObservable} onSelect={(value) => this.setState({ mode: value })} />
                            <CheckBoxLineComponent label={getTrans('Vignette')} target={renderPipeline.imageProcessing} propertyName="vignetteEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent minimum={0} maximum={4} step={0.1} label={getTrans('Vignetteweight')} target={renderPipeline.imageProcessing} propertyName="vignetteWeight" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent minimum={0} maximum={1} step={0.1} label={getTrans('Vignettestretch')} target={renderPipeline.imageProcessing} propertyName="vignetteStretch" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent minimum={0} maximum={Math.PI} step={0.1} label={getTrans('VignetteFOV')} target={renderPipeline.imageProcessing} propertyName="vignetteCameraFov" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent minimum={0} maximum={1} step={0.1} label={getTrans('VignettecenterX')} target={renderPipeline.imageProcessing} propertyName="vignetteCentreX" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent minimum={0} maximum={1} step={0.1} label={getTrans('VignettecenterY')} target={renderPipeline.imageProcessing} propertyName="vignetteCentreY" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <Color3LineComponent label={getTrans('Vignettecolor')} target={renderPipeline.imageProcessing} propertyName="vignetteColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <OptionsLineComponent label={getTrans('Vignetteblendmode')} options={vignetteModeOptions} target={renderPipeline.imageProcessing} propertyName="vignetteBlendMode" onPropertyChangedObservable={this.props.onPropertyChangedObservable} onSelect={(value) => this.setState({ mode: value })} />
                        </div>
                    }
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('SHARPEN')} selection={this.props.globalState}>
                    <CheckBoxLineComponent label={getTrans('Enabled')} target={renderPipeline}
                        onValueChanged={() => this.forceUpdate()}
                        propertyName="sharpenEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    {
                        renderPipeline.sharpenEnabled &&
                        <div>
                            <SliderLineComponent label={getTrans('Coloramount')} minimum={0} maximum={1} step={0.05} target={renderPipeline.sharpen} propertyName="colorAmount" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent label={getTrans('Edgeamount')} minimum={0} maximum={5} step={0.05} target={renderPipeline.sharpen} propertyName="edgeAmount" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        </div>
                    }
                </LineContainerComponent>
            </div>
        );
    }
}