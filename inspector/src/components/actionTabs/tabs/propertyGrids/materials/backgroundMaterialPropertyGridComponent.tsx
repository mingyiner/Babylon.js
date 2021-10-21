import * as React from "react";

import { Observable } from "babylonjs/Misc/observable";
import { BackgroundMaterial } from "babylonjs/Materials/Background/backgroundMaterial";

import { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import { LineContainerComponent } from "../../../../../sharedUiComponents/lines/lineContainerComponent";
import { Color3LineComponent } from "../../../../../sharedUiComponents/lines/color3LineComponent";
import { CheckBoxLineComponent } from "../../../../../sharedUiComponents/lines/checkBoxLineComponent";
import { SliderLineComponent } from "../../../../../sharedUiComponents/lines/sliderLineComponent";
import { CommonMaterialPropertyGridComponent } from "./commonMaterialPropertyGridComponent";
import { TextureLinkLineComponent } from "../../../lines/textureLinkLineComponent";
import { LockObject } from "../../../../../sharedUiComponents/tabs/propertyGrids/lockObject";
import { GlobalState } from '../../../../globalState';
import {getTrans} from '../../../../../translationLng';
interface IBackgroundMaterialPropertyGridComponentProps {
    globalState: GlobalState,
    material: BackgroundMaterial;
    lockObject: LockObject;
    onSelectionChangedObservable?: Observable<any>;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}

export class BackgroundMaterialPropertyGridComponent extends React.Component<IBackgroundMaterialPropertyGridComponentProps> {
    private _onDebugSelectionChangeObservable = new Observable<TextureLinkLineComponent>();

    constructor(props: IBackgroundMaterialPropertyGridComponentProps) {
        super(props);
    }

    renderTextures() {
        const material = this.props.material;

        const onDebugSelectionChangeObservable = this._onDebugSelectionChangeObservable;

        return (
            <LineContainerComponent title={getTrans('Textures')} selection={this.props.globalState}>
                <TextureLinkLineComponent label={getTrans('Diffuse')} texture={material.diffuseTexture} material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label={getTrans('Reflection')} texture={material.reflectionTexture} material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                {
                    material.reflectionTexture &&
                    <SliderLineComponent label={getTrans('Reflectionblur')} target={material} propertyName="reflectionBlur" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                }
            </LineContainerComponent>
        );
    }

    render() {
        const material = this.props.material;

        return (
            <div className="pane">
                <CommonMaterialPropertyGridComponent globalState={this.props.globalState} lockObject={this.props.lockObject} material={material} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                <LineContainerComponent title={getTrans('LIGHTINGCOLORS')} selection={this.props.globalState}>
                    <Color3LineComponent label={getTrans('Primary')} target={material} propertyName="primaryColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label={getTrans('Shadowlevel')} target={material} propertyName="primaryColorShadowLevel" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label={getTrans('Highlightlevel')} target={material} propertyName="primaryColorHighlightLevel" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
                {this.renderTextures()}
                <LineContainerComponent title={getTrans('RENDERING')} closed={true} selection={this.props.globalState}>
                    <CheckBoxLineComponent label={getTrans('Enablenoise')} target={material} propertyName="enableNoise" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('Opacityfresnel')} target={material} propertyName="opacityFresnel" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('Reflectionfresnel')} target={material} propertyName="reflectionFresnel" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label={getTrans('Reflectionamount')} target={material} propertyName="reflectionAmount" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
            </div>
        );
    }
}