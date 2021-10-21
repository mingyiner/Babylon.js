import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { IShadowLight } from "babylonjs/Lights/shadowLight";
import { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import { LineContainerComponent } from "../../../../../sharedUiComponents/lines/lineContainerComponent";
import { CheckBoxLineComponent } from "../../../../../sharedUiComponents/lines/checkBoxLineComponent";
import { FloatLineComponent } from "../../../../../sharedUiComponents/lines/floatLineComponent";
import { LockObject } from "../../../../../sharedUiComponents/tabs/propertyGrids/lockObject";
import { GlobalState } from '../../../../globalState';
import { OptionsLineComponent } from '../../../../../sharedUiComponents/lines/optionsLineComponent';
import { ShadowGenerator } from 'babylonjs/Lights/Shadows/shadowGenerator';
import { CascadedShadowGenerator } from 'babylonjs/Lights/Shadows/cascadedShadowGenerator';
import { SliderLineComponent } from '../../../../../sharedUiComponents/lines/sliderLineComponent';
import { ButtonLineComponent } from '../../../../../sharedUiComponents/lines/buttonLineComponent';
import { DirectionalLight } from 'babylonjs/Lights/directionalLight';
import {getTrans} from '../../../../../translationLng';
interface ICommonShadowLightPropertyGridComponentProps {
    globalState: GlobalState;
    light: IShadowLight;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}

export class CommonShadowLightPropertyGridComponent extends React.Component<ICommonShadowLightPropertyGridComponentProps> {
    private _internals : { generatorType: number, mapSize: number };

    constructor(props: ICommonShadowLightPropertyGridComponentProps) {
        super(props);

        this._internals = {
            generatorType: 0,
            mapSize: 1024,
        };
    }

    createShadowGenerator() {
        const light = this.props.light;
        const scene = light.getScene();
        const internals = this._internals;
        let generator = internals.generatorType === 0 ? new ShadowGenerator(internals.mapSize, light) : new CascadedShadowGenerator(internals.mapSize, light as DirectionalLight);

        scene.meshes.forEach((m) => {
            if (m.infiniteDistance) { return; }
            generator.addShadowCaster(m);
            if (!m.isAnInstance) {
                m.receiveShadows = true;
            }
        });

        this.forceUpdate();
    }

    disposeShadowGenerator() {
        const light = this.props.light;

        light.getShadowGenerator()?.dispose();

        this.forceUpdate();
    }

    render() {
        const light = this.props.light;
        const internals = this._internals;
        const generator = light.getShadowGenerator() as (ShadowGenerator | CascadedShadowGenerator) || null;
        const csmGenerator = generator instanceof CascadedShadowGenerator;
        const camera = light.getScene().activeCamera;

        var typeGeneratorOptions = [
            { label: "Shadow Generator", value: 0 }
        ];

        if (light instanceof DirectionalLight) {
            typeGeneratorOptions.push({ label: "Cascaded Shadow Generator", value: 1 });
        }

        var mapSizeOptions = [
            { label: "2048x2048", value: 2048 },
            { label: "1024x1024", value: 1024 },
            { label: "512x512", value: 512 },
            { label: "256x256", value: 256 },
        ];

        var blurModeOptions;

        if (generator instanceof CascadedShadowGenerator) {
            blurModeOptions = [
                { label: getTrans('None'), value: ShadowGenerator.FILTER_NONE },
                { label: getTrans('PCF'), value: ShadowGenerator.FILTER_PCF },
                { label: getTrans('PCSS'), value: ShadowGenerator.FILTER_PCSS },
            ];
        } else {
            blurModeOptions = [
                { label: getTrans('None'), value: ShadowGenerator.FILTER_NONE },
                { label: getTrans('PCF'), value: ShadowGenerator.FILTER_PCF },
                { label: getTrans('PCSS'), value: ShadowGenerator.FILTER_PCSS },
                { label: getTrans('Poisson'), value: ShadowGenerator.FILTER_POISSONSAMPLING },
                { label: getTrans('Exponential'), value: ShadowGenerator.FILTER_EXPONENTIALSHADOWMAP },
                { label: getTrans('Blurredexponential'), value: ShadowGenerator.FILTER_BLUREXPONENTIALSHADOWMAP },
                { label: getTrans('Closeexponential'), value: ShadowGenerator.FILTER_CLOSEEXPONENTIALSHADOWMAP },
                { label: getTrans('Blurredcloseexponential'), value: ShadowGenerator.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP },
            ];
        }

        var filteringQualityOptions = [
            { label: getTrans('Low'), value: ShadowGenerator.QUALITY_LOW },
            { label: getTrans('Medium'), value: ShadowGenerator.QUALITY_MEDIUM },
            { label: getTrans('High'), value: ShadowGenerator.QUALITY_HIGH },
        ];

        var numCascadesOptions = [
            { label: "2", value: 2 },
            { label: "3", value: 3 },
            { label: "4", value: 4 },
        ];

        const near = camera ? camera.minZ : 0, far = camera ? camera.maxZ : 0;

        let filter = generator ? generator.filter : 0;

        return (
            <div>
                <LineContainerComponent title={getTrans('SHADOWS')} selection={this.props.globalState}>
                    <CheckBoxLineComponent label={getTrans('Shadowsenabled')}target={light} propertyName="shadowEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    { !csmGenerator && <>
                        <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Shadowsnearplane')} target={light} propertyName="shadowMinZ" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Shadowsfarplane')} target={light} propertyName="shadowMaxZ" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    </> }
                </LineContainerComponent>
                {
                    generator == null &&
                    <LineContainerComponent title={getTrans('SHADOWGENERATOR')} selection={this.props.globalState}>
                        <OptionsLineComponent label={getTrans('Type')} options={typeGeneratorOptions} target={internals} propertyName="generatorType" />
                        <OptionsLineComponent label={getTrans('Mapsize')} options={mapSizeOptions} target={internals} propertyName="mapSize" />
                        <ButtonLineComponent label={getTrans('Creategenerator')} onClick={() => this.createShadowGenerator()} />
                    </LineContainerComponent>
                }
                {
                    generator !== null &&
                    <LineContainerComponent title={getTrans('SHADOWGENERATOR')} selection={this.props.globalState}>
                        <ButtonLineComponent label={getTrans('Disposegenerator')} onClick={() => this.disposeShadowGenerator()} />
                        { csmGenerator && <>
                            <OptionsLineComponent label={getTrans('Numcascades')} options={numCascadesOptions} target={generator} propertyName="numCascades" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <CheckBoxLineComponent label={getTrans('Debugmode')} target={generator} propertyName="debug" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <CheckBoxLineComponent label={getTrans('Stabilizecascades')} target={generator} propertyName="stabilizeCascades" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent label={getTrans('Lambda')} minimum={0} maximum={1.0} step={0.01} target={generator} propertyName="lambda" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent label={getTrans('Cascadeblend')} minimum={0} maximum={1.0} step={0.01} target={generator} propertyName="cascadeBlendPercentage" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <CheckBoxLineComponent label={getTrans('Depthclamp')} target={generator} propertyName="depthClamp" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <CheckBoxLineComponent label={getTrans('AutoCalcdepthbounds')} target={generator} propertyName="autoCalcDepthBounds" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent label={getTrans('ShadowMaxZ')} minimum={near} maximum={far} step={0.5} target={generator} propertyName="shadowMaxZ" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        </> }
                        <FloatLineComponent lockObject={this.props.lockObject} digits={4} step="0.0001" label={getTrans('Bias')} target={generator} propertyName="bias" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Normalbias')} target={generator} propertyName="normalBias" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        <SliderLineComponent label={getTrans('Darkness')} target={generator} minimum={0} maximum={1} step={0.01} propertyName="darkness" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        <CheckBoxLineComponent label={getTrans('Allowtransparentshadows')} target={generator} propertyName="transparencyShadow" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        <OptionsLineComponent label={getTrans('Filter')} options={blurModeOptions}
                            onSelect={() => {
                                this.forceUpdate();
                            }}
                            target={generator} propertyName="filter" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        {
                            (filter === ShadowGenerator.FILTER_PCF || filter === ShadowGenerator.FILTER_PCSS) &&
                            <OptionsLineComponent label={getTrans('Filteringquality')} options={filteringQualityOptions}
                                onSelect={() => {
                                    this.forceUpdate();
                                }}
                                target={generator} propertyName="filteringQuality" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        }
                        {
                            (filter === ShadowGenerator.FILTER_PCSS) &&
                            <SliderLineComponent label={getTrans('Penumbraratio')} minimum={0} maximum={0.5} step={0.001} target={generator} propertyName="contactHardeningLightSizeUVRatio" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        }
                        {
                            !csmGenerator && (filter === ShadowGenerator.FILTER_BLUREXPONENTIALSHADOWMAP || filter === ShadowGenerator.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP) &&
                            <CheckBoxLineComponent label={getTrans('Usekernelblur')} target={generator} propertyName="useKernelBlur"
                                onValueChanged={() => this.forceUpdate()}
                                onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        }
                        {
                            (generator instanceof ShadowGenerator) && (filter === ShadowGenerator.FILTER_BLUREXPONENTIALSHADOWMAP || filter === ShadowGenerator.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP) &&
                            !generator.useKernelBlur &&
                            <SliderLineComponent label={getTrans('Blurboxoffset')} target={generator} propertyName="blurBoxOffset" minimum={1} maximum={64} step={1} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />}
                        {
                            (generator instanceof ShadowGenerator) && (filter === ShadowGenerator.FILTER_BLUREXPONENTIALSHADOWMAP || filter === ShadowGenerator.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP) &&
                            generator.useKernelBlur &&
                            <SliderLineComponent label={getTrans('Blurkernel')} target={generator} propertyName="blurKernel" minimum={1} maximum={64} step={1} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        }
                        {
                            (generator instanceof ShadowGenerator) && (filter === ShadowGenerator.FILTER_BLUREXPONENTIALSHADOWMAP || filter === ShadowGenerator.FILTER_EXPONENTIALSHADOWMAP) &&
                            <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Depthscale')} target={generator} propertyName="depthScale" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        }
                        {
                            (generator instanceof ShadowGenerator) && (filter === ShadowGenerator.FILTER_BLUREXPONENTIALSHADOWMAP || filter === ShadowGenerator.FILTER_EXPONENTIALSHADOWMAP) &&
                            <SliderLineComponent label={getTrans('Blurscale')} target={generator} propertyName="blurScale" minimum={1} maximum={4} step={1} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        }
                        {
                            csmGenerator && (filter === ShadowGenerator.FILTER_PCSS) &&
                            <SliderLineComponent label={getTrans('Penumbradarkness')} minimum={0} maximum={1.0} step={0.01} target={generator} propertyName="penumbraDarkness" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        }
                    </LineContainerComponent>
                }
            </div>
        );
    }
}