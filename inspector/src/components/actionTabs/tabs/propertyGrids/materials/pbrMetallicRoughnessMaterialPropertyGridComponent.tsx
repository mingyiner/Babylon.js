import * as React from "react";

import { Observable } from "babylonjs/Misc/observable";
import { PBRMetallicRoughnessMaterial } from "babylonjs/Materials/PBR/pbrMetallicRoughnessMaterial";

import { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import { LineContainerComponent } from "../../../../../sharedUiComponents/lines/lineContainerComponent";
import { Color3LineComponent } from "../../../../../sharedUiComponents/lines/color3LineComponent";
import { SliderLineComponent } from "../../../../../sharedUiComponents/lines/sliderLineComponent";
import { CommonMaterialPropertyGridComponent } from "./commonMaterialPropertyGridComponent";
import { TextureLinkLineComponent } from "../../../lines/textureLinkLineComponent";
import { LockObject } from "../../../../../sharedUiComponents/tabs/propertyGrids/lockObject";
import { GlobalState } from '../../../../globalState';
import { CheckBoxLineComponent } from '../../../../../sharedUiComponents/lines/checkBoxLineComponent';
import { getTrans } from "../../../../../translationLng";
interface IPBRMetallicRoughnessMaterialPropertyGridComponentProps {
    globalState: GlobalState,
    material: PBRMetallicRoughnessMaterial,
    lockObject: LockObject,
    onSelectionChangedObservable?: Observable<any>,
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>
}

export class PBRMetallicRoughnessMaterialPropertyGridComponent extends React.Component<IPBRMetallicRoughnessMaterialPropertyGridComponentProps> {
    private _onDebugSelectionChangeObservable = new Observable<TextureLinkLineComponent>();

    constructor(props: IPBRMetallicRoughnessMaterialPropertyGridComponentProps) {
        super(props);
    }

    renderTextures() {
        const material = this.props.material;
        const onDebugSelectionChangeObservable = this._onDebugSelectionChangeObservable;

        return (
            <LineContainerComponent title={getTrans('Textures')} selection={this.props.globalState}>
                <TextureLinkLineComponent label={getTrans('AddBaseT')} texture={material.baseTexture} propertyName="baseTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label={getTrans('addMetallicRoughness')} texture={material.metallicRoughnessTexture} propertyName="metallicRoughnessTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label={getTrans('AddNormalT')} texture={material.normalTexture} propertyName="normalTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label={getTrans('AddEnvironmentT')} texture={material.environmentTexture} propertyName="environmentTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label={getTrans('emissive')} texture={material.emissiveTexture} propertyName="emissiveTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label={getTrans('Lightmap')} texture={material.lightmapTexture} propertyName="lightmapTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
            </LineContainerComponent>
        )
    }

    render() {
        const material = this.props.material;

        return (
            <div className="pane">
                <CommonMaterialPropertyGridComponent globalState={this.props.globalState} lockObject={this.props.lockObject} material={material} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                {this.renderTextures()}
                <LineContainerComponent title={getTrans('LIGHTINGCOLORS')} selection={this.props.globalState}>
                    <Color3LineComponent label={getTrans('Base')} target={material} propertyName="baseColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} isLinear={true} />
                    <Color3LineComponent label={getTrans('Emissive_')} target={material} propertyName="emissiveColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} isLinear={true} />
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('LEVELS')} closed={true} selection={this.props.globalState}>
                    <SliderLineComponent label={getTrans('Metallic_')} target={material} propertyName="metallic" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label={getTrans('Roughness_')} target={material} propertyName="roughness" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('NORMALMAP_')} closed={true} selection={this.props.globalState}>
                    <CheckBoxLineComponent label={getTrans('InvertXaxis_')} target={material} propertyName="invertNormalMapX" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('InvertYaxis_')} target={material} propertyName="invertNormalMapY" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>

            </div>
        );
    }
}