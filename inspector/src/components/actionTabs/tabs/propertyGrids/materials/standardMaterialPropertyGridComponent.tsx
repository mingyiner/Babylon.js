import * as React from "react";

import { Observable } from "babylonjs/Misc/observable";
import { StandardMaterial } from "babylonjs/Materials/standardMaterial";

import { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import { LineContainerComponent } from "../../../../../sharedUiComponents/lines/lineContainerComponent";
import { Color3LineComponent } from "../../../../../sharedUiComponents/lines/color3LineComponent";
import { SliderLineComponent } from "../../../../../sharedUiComponents/lines/sliderLineComponent";
import { CommonMaterialPropertyGridComponent } from "./commonMaterialPropertyGridComponent";
import { TextureLinkLineComponent } from "../../../lines/textureLinkLineComponent";
import { LockObject } from "../../../../../sharedUiComponents/tabs/propertyGrids/lockObject";
import { GlobalState } from '../../../../globalState';
import { CheckBoxLineComponent } from '../../../../../sharedUiComponents/lines/checkBoxLineComponent';
import {getTrans} from '../../../../../translationLng';
interface IStandardMaterialPropertyGridComponentProps {
    globalState: GlobalState;
    material: StandardMaterial;
    lockObject: LockObject;
    onSelectionChangedObservable?: Observable<any>;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}

export class StandardMaterialPropertyGridComponent extends React.Component<IStandardMaterialPropertyGridComponentProps> {
    private _onDebugSelectionChangeObservable = new Observable<TextureLinkLineComponent>();

    constructor(props: IStandardMaterialPropertyGridComponentProps) {
        super(props);
    }

    renderTextures() {
        const material = this.props.material;

        const onDebugSelectionChangeObservable = this._onDebugSelectionChangeObservable;

        return (
            <LineContainerComponent title={getTrans('Textures')} selection={this.props.globalState}>
                <TextureLinkLineComponent label={getTrans('addDiffuse')} texture={material.diffuseTexture} propertyName="diffuseTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label={getTrans('addSpecular')} texture={material.specularTexture} propertyName="specularTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label={getTrans('addReflection')} texture={material.reflectionTexture} propertyName="reflectionTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label={getTrans('addRefraction')} texture={material.refractionTexture} propertyName="refractionTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label={getTrans('emissive')} texture={material.emissiveTexture} propertyName="emissiveTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label={getTrans('Bump')} texture={material.bumpTexture} propertyName="bumpTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label={getTrans('Opacity')} texture={material.opacityTexture} propertyName="opacityTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label={getTrans('Ambient_')} texture={material.ambientTexture} propertyName="ambientTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label={getTrans('Lightmap_')} texture={material.lightmapTexture} propertyName="lightmapTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label={getTrans('Detailmap')} texture={material.detailMap.texture} material={material} onTextureCreated={(texture) => material.detailMap.texture = texture} onTextureRemoved={() => material.detailMap.texture = null} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <CheckBoxLineComponent label={getTrans('Uselightmapasshadowmap')} target={material} propertyName="useLightmapAsShadowmap" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                <CheckBoxLineComponent label={getTrans('Usedetailmap')} target={material.detailMap} propertyName="isEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
            </LineContainerComponent>
        );
    }

    render() {
        const material = this.props.material;

        return (
            <div className="pane">
                <CommonMaterialPropertyGridComponent globalState={this.props.globalState} lockObject={this.props.lockObject} material={material} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                {this.renderTextures()}
                <LineContainerComponent title={getTrans('LIGHTINGCOLORS')} selection={this.props.globalState}>
                    <Color3LineComponent label={getTrans('Diffuse')} target={material} propertyName="diffuseColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <Color3LineComponent label={getTrans('Specular')} target={material} propertyName="specularColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label={getTrans('Specularpower')} target={material} propertyName="specularPower" minimum={0} maximum={128} step={0.1} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <Color3LineComponent label={getTrans('Emissive_')} target={material} propertyName="emissiveColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <Color3LineComponent label={getTrans('AmbientColor')} target={material} propertyName="ambientColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('Usespecularoveralpha')} target={material} propertyName="useSpecularOverAlpha" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('LEVELS')} closed={true} selection={this.props.globalState}>
                    {
                        material.diffuseTexture &&
                        <SliderLineComponent label={getTrans('Diffuselevel')} target={material.diffuseTexture} propertyName="level" minimum={0} maximum={2} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        material.specularTexture &&
                        <SliderLineComponent label={getTrans('Specularlevel')} target={material.specularTexture} propertyName="level" minimum={0} maximum={2} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        material.reflectionTexture &&
                        <SliderLineComponent label={getTrans('Reflectionlevel')} target={material.reflectionTexture} propertyName="level" minimum={0} maximum={2} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        material.refractionTexture &&
                        <SliderLineComponent label={getTrans('Refractionlevel')} target={material.refractionTexture} propertyName="level" minimum={0} maximum={2} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        material.emissiveTexture &&
                        <SliderLineComponent label={getTrans('Emissivelevel')} target={material.emissiveTexture} propertyName="level" minimum={0} maximum={2} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        material.bumpTexture &&
                        <SliderLineComponent label={getTrans('Bumplevel')} target={material.bumpTexture} propertyName="level" minimum={0} maximum={2} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        material.opacityTexture &&
                        <SliderLineComponent label={getTrans('Opacitylevel')} target={material.opacityTexture} propertyName="level" minimum={0} maximum={2} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        material.ambientTexture &&
                        <SliderLineComponent label={getTrans('Ambientlevel')} target={material.ambientTexture} propertyName="level" minimum={0} maximum={2} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        material.lightmapTexture &&
                        <SliderLineComponent label={getTrans('Lightmaplevel')} target={material.lightmapTexture} propertyName="level" minimum={0} maximum={2} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        material.detailMap.isEnabled && <>
                        <SliderLineComponent label={getTrans('Detailmapdiffuse')} target={material.detailMap} propertyName="diffuseBlendLevel" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        <SliderLineComponent label={getTrans('Detailmapbump')} target={material.detailMap} propertyName="bumpLevel" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    </> }
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('NORMALMAP_')} closed={true} selection={this.props.globalState}>
                    <CheckBoxLineComponent label={getTrans('InvertXaxis_')} target={material} propertyName="invertNormalMapX" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('InvertYaxis_')} target={material} propertyName="invertNormalMapY" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
            </div>
        );
    }
}