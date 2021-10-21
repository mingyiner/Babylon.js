import * as React from "react";

import { Observable } from "babylonjs/Misc/observable";
import { PBRMaterial } from "babylonjs/Materials/PBR/pbrMaterial";
import { Constants } from "babylonjs/Engines/constants";

import { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import { LineContainerComponent } from "../../../../../sharedUiComponents/lines/lineContainerComponent";
import { Color3LineComponent } from "../../../../../sharedUiComponents/lines/color3LineComponent";
import { CheckBoxLineComponent } from "../../../../../sharedUiComponents/lines/checkBoxLineComponent";
import { SliderLineComponent } from "../../../../../sharedUiComponents/lines/sliderLineComponent";
import { OptionsLineComponent } from "../../../../../sharedUiComponents/lines/optionsLineComponent";
import { CommonMaterialPropertyGridComponent } from "./commonMaterialPropertyGridComponent";
import { TextureLinkLineComponent } from "../../../lines/textureLinkLineComponent";
import { LockObject } from "../../../../../sharedUiComponents/tabs/propertyGrids/lockObject";
import { GlobalState } from '../../../../globalState';
import { Vector2LineComponent } from "../../../../../sharedUiComponents/lines/vector2LineComponent";
import { getTrans } from "../../../../../translationLng";
interface IPBRMaterialPropertyGridComponentProps {
    globalState: GlobalState;
    material: PBRMaterial;
    lockObject: LockObject;
    onSelectionChangedObservable?: Observable<any>;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}

export class PBRMaterialPropertyGridComponent extends React.Component<IPBRMaterialPropertyGridComponentProps> {
    private _onDebugSelectionChangeObservable = new Observable<TextureLinkLineComponent>();
    constructor(props: IPBRMaterialPropertyGridComponentProps) {
        super(props);
    }

    switchAmbientMode(state: boolean) {
        this.props.material.debugMode = state ? 21 : 0;
    }

    renderTextures(onDebugSelectionChangeObservable: Observable<TextureLinkLineComponent>) {
        const material = this.props.material;

        return (
            <LineContainerComponent title={getTrans('CHANNELS')} selection={this.props.globalState}>
                <TextureLinkLineComponent label={getTrans('addAlbedo')} texture={material.albedoTexture} propertyName="albedoTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label={getTrans('addMetallicRoughness')} texture={material.metallicTexture} propertyName="metallicTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label={getTrans('addReflection')} texture={material.reflectionTexture} propertyName="reflectionTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label={getTrans('addRefraction')} texture={material.refractionTexture} propertyName="refractionTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label={getTrans('addReflectivity')} texture={material.reflectivityTexture} propertyName="reflectivityTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label={getTrans('addMicrosurface')} texture={material.microSurfaceTexture} propertyName="microSurfaceTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label={getTrans('Bump')} texture={material.bumpTexture} propertyName="bumpTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label={getTrans('emissive_')} texture={material.emissiveTexture} propertyName="emissiveTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label={getTrans('Opacity')} texture={material.opacityTexture} propertyName="opacityTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent customDebugAction={(state) => this.switchAmbientMode(state)} label={getTrans('Ambient_')} texture={material.ambientTexture} propertyName="ambientTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label={getTrans('Lightmap')} texture={material.lightmapTexture} propertyName="lightmapTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label={getTrans('Detailmap')} texture={material.detailMap.texture} material={material} onTextureCreated={(texture) => material.detailMap.texture = texture} onTextureRemoved={() => material.detailMap.texture = null} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <CheckBoxLineComponent label={getTrans('Uselightmapasshadowmap')} target={material} propertyName="useLightmapAsShadowmap" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                <CheckBoxLineComponent label={getTrans('Usedetailmap')} target={material.detailMap} propertyName="isEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
            </LineContainerComponent>
        );
    }

    render() {
        const material = this.props.material;

        const debugMode = [
            { label: getTrans('None'), value: 0 },
            // Geometry
            { label: getTrans('Normalizedposition'), value: 1 },
            { label: getTrans('Normals'), value: 2 },
            { label: getTrans('Tangents'), value: 3 },
            { label: getTrans('Bitangents'), value: 4 },
            { label: getTrans('BumpNormals'), value: 5 },
            { label: getTrans('UV1'), value: 6 },
            { label: getTrans('UV2'), value: 7 },
            { label: getTrans('ClearCoatNormals'), value: 8 },
            { label: getTrans('ClearCoatTangents'), value: 9 },
            { label: getTrans('ClearCoatBitangents'), value: 10 },
            { label: getTrans('AnisotropicNormals'), value: 11 },
            { label: getTrans('AnisotropicTangents'), value: 12 },
            { label: getTrans('AnisotropicBitangents'), value: 13 },
            // Maps
            { label: getTrans('AlbdeoMap'), value: 20 },
            { label: getTrans('AmbientMap'), value: 21 },
            { label: getTrans('OpacityMap'), value: 22 },
            { label: getTrans('EmissiveMap'), value: 23 },
            { label: getTrans('LightMap'), value: 24 },
            { label: getTrans('MetallicMap'), value: 25 },
            { label: getTrans('ReflectivityMap'), value: 26 },
            { label: getTrans('ClearCoatMap'), value: 27 },
            { label: getTrans('ClearCoatTintMap'), value: 28 },
            { label: getTrans('SheenMap'), value: 29 },
            { label: getTrans('AnisotropicMap'), value: 30 },
            { label: getTrans('ThicknessMap'), value: 31 },
            // Env
            { label: getTrans('EnvRefraction'), value: 40 },
            { label: getTrans('EnvReflection'), value: 41 },
            { label: getTrans('EnvClearCoat'), value: 42 },
            // Lighting
            { label: getTrans('DirectDiffuse'), value: 50 },
            { label: getTrans('DirectSpecular'), value: 51 },
            { label: getTrans('DirectClearCoat'), value: 52 },
            { label: getTrans('DirectSheen'), value: 53 },
            { label: getTrans('EnvIrradiance'), value: 54 },
            // Lighting Params
            { label: getTrans('SurfaceAlbedo'), value: 60 },
            { label: getTrans('Reflectance0'), value: 61 },
            { label: getTrans('Metallic_'), value: 62 },
            { label: getTrans('MetallicF0'), value: 71 },
            { label: getTrans('Roughness_'), value: 63 },
            { label: getTrans('AlphaG'), value: 64 },
            { label: getTrans('NdotV'), value: 65 },
            { label: getTrans('ClearCoatColor'), value: 66 },
            { label: getTrans('ClearCoatRoughness'), value: 67 },
            { label: getTrans('ClearCoatNdotV'), value: 68 },
            { label: getTrans('Transmittance'), value: 69 },
            { label: getTrans('RefractionTransmittance'), value: 70 },
            // Misc
            { label: getTrans('SEO'), value: 80 },
            { label: getTrans('EHO'), value: 81 },
            { label: getTrans('EnergyFactor'), value: 82 },
            { label: getTrans('SpecularReflectance'), value: 83 },
            { label: getTrans('ClearCoatReflectance'), value: 84 },
            { label: getTrans('SheenReflectance'), value: 85 },
            { label: getTrans('LuminanceOverAlpha'), value: 86 },
            { label: getTrans('Alpha'), value: 87 },
        ];

        var realTimeFilteringQualityOptions = [
            { label: getTrans('Low'), value: Constants.TEXTURE_FILTERING_QUALITY_LOW },
            { label: getTrans('Medium'), value: Constants.TEXTURE_FILTERING_QUALITY_MEDIUM },
            { label: getTrans('High'), value: Constants.TEXTURE_FILTERING_QUALITY_HIGH }
        ];

        (material.sheen as any)._useRoughness = (material.sheen as any)._useRoughness ?? material.sheen.roughness !== null;
        material.sheen.roughness = material.sheen.roughness ?? (material.sheen as any)._saveRoughness ?? 0;

        if (!(material.sheen as any)._useRoughness) {
            (material.sheen as any)._saveRoughness = material.sheen.roughness;
            material.sheen.roughness = null;
        }

        return (
            <div className="pane">
                <CommonMaterialPropertyGridComponent globalState={this.props.globalState} lockObject={this.props.lockObject} material={material} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                {this.renderTextures(this._onDebugSelectionChangeObservable)}
                <LineContainerComponent title={getTrans('LIGHTINGCOLORS')} selection={this.props.globalState}>
                    <Color3LineComponent label={getTrans('Albedo')} target={material} propertyName="albedoColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} isLinear={true}/>
                    <Color3LineComponent label={getTrans('Reflectivity')} target={material} propertyName="reflectivityColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} isLinear={true} />
                    <SliderLineComponent label={getTrans('Microsurface')} target={material} propertyName="microSurface" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <Color3LineComponent label={getTrans('Emissive_')} target={material} propertyName="emissiveColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} isLinear={true} />
                    <Color3LineComponent label={getTrans('Ambient_')} target={material} propertyName="ambientColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} isLinear={true} />
                    <CheckBoxLineComponent label={getTrans('Usephysicallightfalloff')} target={material} propertyName="usePhysicalLightFalloff" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('METALLICWORKFLOW')} selection={this.props.globalState}>
                    <SliderLineComponent label={getTrans('Metallic_')} target={material} propertyName="metallic" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label={getTrans('Roughness_')} target={material} propertyName="roughness" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label={getTrans('IndexofRefraction')} target={material} propertyName="indexOfRefraction" minimum={1} maximum={3} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label={getTrans('F0Factor')} target={material} propertyName="metallicF0Factor" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <Color3LineComponent label={getTrans('ReflectanceColor')} target={material} propertyName="metallicReflectanceColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} isLinear={true} />
                    <CheckBoxLineComponent label={getTrans('UseonlymetallicfromMetallicReflectancetexture')} target={material} propertyName="useOnlyMetallicFromMetallicReflectanceTexture" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <TextureLinkLineComponent label={getTrans('addMetallicReflectanceTexture')} texture={material.metallicReflectanceTexture} onTextureCreated={(texture) => material.metallicReflectanceTexture = texture} onTextureRemoved={() => material.metallicReflectanceTexture = null} material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={this._onDebugSelectionChangeObservable} />
                    <TextureLinkLineComponent label={getTrans('addReflectanceTexture')} texture={material.reflectanceTexture} onTextureCreated={(texture) => material.reflectanceTexture = texture} onTextureRemoved={() => material.reflectanceTexture = null} material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={this._onDebugSelectionChangeObservable} />
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('CLEARCOAT')} selection={this.props.globalState}>
                    <CheckBoxLineComponent label={getTrans('Enabled')} target={material.clearCoat} propertyName="isEnabled"
                        onValueChanged={() => this.forceUpdate()}
                        onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    {
                        material.clearCoat.isEnabled &&
                        <div className="fragment">
                            <SliderLineComponent label={getTrans('Intensity')} target={material.clearCoat} propertyName="intensity" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent label={getTrans('Roughness_')} target={material.clearCoat} propertyName="roughness" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent label={getTrans('IOR')} target={material.clearCoat} propertyName="indexOfRefraction" minimum={1.0} maximum={3} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <CheckBoxLineComponent label={getTrans('RemapF0')} target={material.clearCoat} propertyName="remapF0OnInterfaceChange" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <TextureLinkLineComponent label={getTrans('AddClearcoat')} texture={material.clearCoat.texture} onTextureCreated={(texture) => material.clearCoat.texture = texture} onTextureRemoved={() => material.clearCoat.texture = null} material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={this._onDebugSelectionChangeObservable} />
                            <TextureLinkLineComponent label={getTrans('AddRoughnesst')} texture={material.clearCoat.textureRoughness} onTextureCreated={(texture) => material.clearCoat.textureRoughness = texture} onTextureRemoved={() => material.clearCoat.textureRoughness = null} material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={this._onDebugSelectionChangeObservable} />
                            <TextureLinkLineComponent label={getTrans('AddBumpt')} texture={material.clearCoat.bumpTexture} onTextureCreated={(texture) => material.clearCoat.bumpTexture = texture} onTextureRemoved={() => material.clearCoat.bumpTexture = null} material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={this._onDebugSelectionChangeObservable} />
                            {
                                material.clearCoat.bumpTexture &&
                                <SliderLineComponent label={getTrans('Bumpstrength')} target={material.clearCoat.bumpTexture} propertyName="level" minimum={0} maximum={2} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            }
                            <CheckBoxLineComponent label={getTrans('Useroughnessfrommaintexture')} target={material.clearCoat} propertyName="useRoughnessFromMainTexture" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <CheckBoxLineComponent label={getTrans('Tint')} target={material.clearCoat} propertyName="isTintEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            {
                                material.clearCoat.isEnabled && material.clearCoat.isTintEnabled &&
                                <Color3LineComponent label={getTrans('TintColor')} target={material.clearCoat} propertyName="tintColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} isLinear={true} />
                            }
                            {
                                material.clearCoat.isEnabled && material.clearCoat.isTintEnabled &&
                                <SliderLineComponent label={getTrans('AtDistance')} target={material.clearCoat} propertyName="tintColorAtDistance" minimum={0} maximum={20} step={0.1} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            }
                            {
                                material.clearCoat.isEnabled && material.clearCoat.isTintEnabled &&
                                <SliderLineComponent label={getTrans('TintThickness')} target={material.clearCoat} propertyName="tintThickness" minimum={0} maximum={20} step={0.1} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            }
                            {
                                material.clearCoat.isEnabled && material.clearCoat.isTintEnabled &&
                                <TextureLinkLineComponent label={getTrans('addTinttexture')} texture={material.clearCoat.tintTexture} onTextureCreated={(texture) => material.clearCoat.tintTexture = texture} onTextureRemoved={() => material.clearCoat.tintTexture = null} material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={this._onDebugSelectionChangeObservable} />
                            }
                        </div>
                    }
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('ANISOTROPIC')} selection={this.props.globalState}>
                    <CheckBoxLineComponent label={getTrans('Enabled')} target={material.anisotropy} propertyName="isEnabled"
                        onValueChanged={() => this.forceUpdate()}
                        onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    {
                        material.anisotropy.isEnabled &&
                        <div className="fragment">
                            <SliderLineComponent label={getTrans('Intensity')} target={material.anisotropy} propertyName="intensity" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <Vector2LineComponent label={getTrans('Direction')} target={material.anisotropy} propertyName="direction" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <TextureLinkLineComponent label={getTrans('Anisotropic')} texture={material.anisotropy.texture} onTextureCreated={(texture) => material.anisotropy.texture = texture} onTextureRemoved={() => material.anisotropy.texture = null} material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={this._onDebugSelectionChangeObservable} />
                        </div>
                    }
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('SHEEN')} selection={this.props.globalState}>
                    <CheckBoxLineComponent label={getTrans('Enabled')} target={material.sheen} propertyName="isEnabled"
                        onValueChanged={() => this.forceUpdate()}
                        onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    {
                        material.sheen.isEnabled &&
                        <div className="fragment">
                            <CheckBoxLineComponent label={getTrans('LinktoAlbedo')} target={material.sheen} propertyName="linkSheenWithAlbedo" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent label={getTrans('Intensity')} target={material.sheen} propertyName="intensity" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <Color3LineComponent label={getTrans('Color')} target={material.sheen} propertyName="color" onPropertyChangedObservable={this.props.onPropertyChangedObservable} isLinear={true} />
                            <TextureLinkLineComponent label={getTrans('addSheent')} texture={material.sheen.texture} onTextureCreated={(texture) => material.sheen.texture = texture} onTextureRemoved={() => material.sheen.texture = null} material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={this._onDebugSelectionChangeObservable} />
                            <TextureLinkLineComponent label={getTrans('addRoughness')} texture={material.sheen.textureRoughness} onTextureCreated={(texture) => material.sheen.textureRoughness = texture} onTextureRemoved={() => material.sheen.textureRoughness = null} material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={this._onDebugSelectionChangeObservable} />
                            <CheckBoxLineComponent label={getTrans('Useroughness')} target={material.sheen} propertyName="_useRoughness" />
                            { (material.sheen as any)._useRoughness &&
                                <SliderLineComponent label={getTrans('Roughness_')} target={material.sheen} propertyName="roughness" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            }
                            <CheckBoxLineComponent label={getTrans('Useroughnessfrommaintexture')} target={material.sheen} propertyName="useRoughnessFromMainTexture" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <CheckBoxLineComponent label={getTrans('Albedoscaling')} target={material.sheen} propertyName="albedoScaling" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        </div>
                    }
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('SUBSURFACE')} selection={this.props.globalState}>
                    <TextureLinkLineComponent label={getTrans('AddThickTexture')} texture={material.subSurface.thicknessTexture} onTextureCreated={(texture) => material.subSurface.thicknessTexture = texture} onTextureRemoved={() => material.subSurface.thicknessTexture = null} material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={this._onDebugSelectionChangeObservable} />
                    <SliderLineComponent label={getTrans('MinThickness')} target={material.subSurface} propertyName="minimumThickness" minimum={0} maximum={10} step={0.1} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label={getTrans('MaxThickness')} target={material.subSurface} propertyName="maximumThickness" minimum={0} maximum={10} step={0.1} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('MaskFromThickness')} target={material.subSurface} propertyName="useMaskFromThicknessTexture"
                        onValueChanged={() => this.forceUpdate()}
                        onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('glTFStyleTextures')} target={material.subSurface} propertyName="useGltfStyleTextures"
                        onValueChanged={() => this.forceUpdate()}
                        onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('UseThicknessasDepth')} target={material.subSurface} propertyName="useThicknessAsDepth"
                        onValueChanged={() => this.forceUpdate()}
                        onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <Color3LineComponent label={getTrans('TintColor')} target={material.subSurface} propertyName="tintColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} isLinear={true} />

                    <CheckBoxLineComponent label={getTrans('ScatteringEnabled')} target={material.subSurface} propertyName="isScatteringEnabled"
                        onValueChanged={() => this.forceUpdate()}
                        onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    { (material.subSurface as any).isScatteringEnabled && material.getScene().prePassRenderer && material.getScene().subSurfaceConfiguration &&
                        <div className="fragment">
                            <SliderLineComponent label={getTrans('Metersperunit')} target={ material.getScene().subSurfaceConfiguration! } propertyName="metersPerUnit" minimum={0.01} maximum={2} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        </div>
                    }
                    <CheckBoxLineComponent label={getTrans('RefractionEnabled')} target={material.subSurface} propertyName="isRefractionEnabled"
                        onValueChanged={() => this.forceUpdate()}
                        onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    {
                        material.subSurface.isRefractionEnabled &&
                        <div className="fragment">
                            <SliderLineComponent label={getTrans('Intensity')} target={material.subSurface} propertyName="refractionIntensity" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <TextureLinkLineComponent label={getTrans('addRefraction')} texture={material.subSurface.refractionTexture} onTextureCreated={(texture) => material.subSurface.refractionTexture = texture} onTextureRemoved={() => material.subSurface.refractionTexture = null} material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={this._onDebugSelectionChangeObservable} />
                            <SliderLineComponent label={getTrans('VolumeIndexofRefraction')} target={material.subSurface} propertyName="volumeIndexOfRefraction" minimum={1} maximum={3} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent label={getTrans('TintatDistance')} target={material.subSurface} propertyName="tintColorAtDistance" minimum={0} maximum={10} step={0.1} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <CheckBoxLineComponent label={getTrans('Linkrefractionwithtransparency')} target={material.subSurface} propertyName="linkRefractionWithTransparency" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <CheckBoxLineComponent label={getTrans('Usealbedototintsurfacetransparency')} target={material.subSurface} propertyName="useAlbedoToTintRefraction" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        </div>
                    }

                    <CheckBoxLineComponent label={getTrans('TranslucencyEnabled')} target={material.subSurface} propertyName="isTranslucencyEnabled"
                        onValueChanged={() => this.forceUpdate()}
                        onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    {
                        material.subSurface.isTranslucencyEnabled &&
                        <div className="fragment">
                            <SliderLineComponent label={getTrans('Intensity')} target={material.subSurface} propertyName="translucencyIntensity" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <Color3LineComponent label={getTrans('DiffusionDistance')} target={material.subSurface} propertyName="diffusionDistance" onPropertyChangedObservable={this.props.onPropertyChangedObservable} isLinear={true} />
                            <CheckBoxLineComponent label={getTrans('Usealbedototintsurfacetranslucency')} target={material.subSurface} propertyName="useAlbedoToTintTranslucency" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        </div>
                    }
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('LEVELS')} closed={true} selection={this.props.globalState}>
                    <SliderLineComponent label={getTrans('Environment')} target={material} propertyName="environmentIntensity" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label={getTrans('Specular')} target={material} propertyName="specularIntensity" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label={getTrans('Emissive_')} target={material} propertyName="emissiveIntensity" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label={getTrans('Direct')} target={material} propertyName="directIntensity" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    {
                        material.bumpTexture &&
                        <SliderLineComponent label={getTrans('Bumpstrength')} target={material.bumpTexture} propertyName="level" minimum={0} maximum={2} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        material.ambientTexture &&
                        <SliderLineComponent label={getTrans('Ambientstrength')} target={material} propertyName="ambientTextureStrength" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        material.reflectionTexture &&
                        <SliderLineComponent label={getTrans('Reflectionstrength')} target={material.reflectionTexture} propertyName="level" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        material.clearCoat.texture &&
                        <SliderLineComponent label={getTrans('Clearcoat')} target={material.clearCoat.texture} propertyName="level" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        material.clearCoat.bumpTexture &&
                        <SliderLineComponent label={getTrans('Clearcoatbump')} target={material.clearCoat.bumpTexture} propertyName="level" minimum={0} maximum={2} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        material.clearCoat.tintTexture && false && /* level is not used for the clear coat tint texture */
                        <SliderLineComponent label={getTrans('Clearcoattint')} target={material.clearCoat.tintTexture} propertyName="level" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        material.anisotropy.texture &&
                        <SliderLineComponent label={getTrans('Anisotropic')} target={material.anisotropy.texture} propertyName="level" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        material.sheen.texture &&
                        <SliderLineComponent label={getTrans('Sheen')} target={material.sheen.texture} propertyName="level" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        material.subSurface.thicknessTexture &&
                        <SliderLineComponent label={getTrans('Thickness')} target={material.subSurface.thicknessTexture} propertyName="level" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        material.subSurface.refractionTexture &&
                        <SliderLineComponent label={getTrans('Refraction')} target={material.subSurface.refractionTexture} propertyName="level" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        material.detailMap.isEnabled && <>
                        <SliderLineComponent label={getTrans('Detailmapdiffuse')} target={material.detailMap} propertyName="diffuseBlendLevel" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        <SliderLineComponent label={getTrans('Detailmapbump')} target={material.detailMap} propertyName="bumpLevel" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        <SliderLineComponent label={getTrans('Detailmaproughness')} target={material.detailMap} propertyName="roughnessBlendLevel" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    </> }
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('RENDERING')} closed={true} selection={this.props.globalState}>
                    <CheckBoxLineComponent label={getTrans('Alphafromalbedo')} target={material} propertyName="useAlphaFromAlbedoTexture" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('Ambientingrayscale')} target={material} propertyName="useAmbientInGrayScale" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('Radianceoveralpha')} target={material} propertyName="useRadianceOverAlpha" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('Microsurfacefromrefmapalpha')} target={material} propertyName="useMicroSurfaceFromReflectivityMapAlpha" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('Specularoveralpha')} target={material} propertyName="useSpecularOverAlpha" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('Specularantialiasing')} target={material} propertyName="enableSpecularAntiAliasing" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('RealtimeFiltering')} target={material} propertyName="realTimeFiltering" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <OptionsLineComponent allowNullValue={true} label={getTrans('RealtimeFilteringquality')} options={realTimeFilteringQualityOptions} target={material} propertyName="realTimeFilteringQuality" onPropertyChangedObservable={this.props.onPropertyChangedObservable}  />
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('NORMALMAP_')} closed={true} selection={this.props.globalState}>
                    <CheckBoxLineComponent label={getTrans('InvertXaxis_')} target={material} propertyName="invertNormalMapX" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('InvertYaxis_')} target={material} propertyName="invertNormalMapY" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('ADVANCED')} closed={true} selection={this.props.globalState}>
                    <CheckBoxLineComponent label={getTrans('EnergyConservation')} target={material.brdf} propertyName="useEnergyConservation"
                        onValueChanged={() => this.forceUpdate()}
                        onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('SphericalHarmonics')} target={material.brdf} propertyName="useSphericalHarmonics"
                        onValueChanged={() => this.forceUpdate()}
                        onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('Radianceocclusion')} target={material} propertyName="useRadianceOcclusion" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('Horizonocclusion')} target={material} propertyName="useHorizonOcclusion" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('Unlit')} target={material} propertyName="unlit" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('DEBUG')} closed={true} selection={this.props.globalState}>
                    <OptionsLineComponent label={getTrans('Debugmode')} options={debugMode} target={material} propertyName="debugMode" />
                    <SliderLineComponent label={getTrans('Splitposition')} target={material} propertyName="debugLimit" minimum={-1} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label={getTrans('Outputfactor')} target={material} propertyName="debugFactor" minimum={0} maximum={5} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
            </div>
        );
    }
}