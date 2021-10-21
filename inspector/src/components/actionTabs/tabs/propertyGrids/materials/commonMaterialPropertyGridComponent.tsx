import * as React from "react";

import { Observable } from "babylonjs/Misc/observable";
import { Material } from "babylonjs/Materials/material";
import { PBRMaterial } from "babylonjs/Materials/PBR/pbrMaterial";
import { Constants } from "babylonjs/Engines/constants";
import { Engine } from "babylonjs/Engines/engine";

import { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import { CheckBoxLineComponent } from "../../../../../sharedUiComponents/lines/checkBoxLineComponent";
import { SliderLineComponent } from "../../../../../sharedUiComponents/lines/sliderLineComponent";
import { LineContainerComponent } from "../../../../../sharedUiComponents/lines/lineContainerComponent";
import { TextLineComponent } from "../../../../../sharedUiComponents/lines/textLineComponent";
import { OptionsLineComponent, Null_Value } from "../../../../../sharedUiComponents/lines/optionsLineComponent";
import { LockObject } from "../../../../../sharedUiComponents/tabs/propertyGrids/lockObject";
import { GlobalState } from '../../../../globalState';
import { CustomPropertyGridComponent } from '../customPropertyGridComponent';
import { ButtonLineComponent } from '../../../../../sharedUiComponents/lines/buttonLineComponent';
import { TextInputLineComponent } from '../../../../../sharedUiComponents/lines/textInputLineComponent';
import { AnimationGridComponent } from '../animations/animationPropertyGridComponent';
import { HexLineComponent } from "../../../../../sharedUiComponents/lines/hexLineComponent";
import { FloatLineComponent } from "../../../../../sharedUiComponents/lines/floatLineComponent";
import {getTrans} from '../../../../../translationLng';
interface ICommonMaterialPropertyGridComponentProps {
    globalState: GlobalState;
    material: Material;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}

export class CommonMaterialPropertyGridComponent extends React.Component<ICommonMaterialPropertyGridComponentProps> {
    constructor(props: ICommonMaterialPropertyGridComponentProps) {
        super(props);
    }

    render() {
        const material = this.props.material;

        material.depthFunction = material.depthFunction ?? 0;

        var orientationOptions = [
            { label: getTrans('Clockwise'), value: Material.ClockWiseSideOrientation },
            { label: getTrans('Counterclockwise'), value: Material.CounterClockWiseSideOrientation }
        ];

        var transparencyModeOptions = [
            { label: getTrans('NotDefined'), value: Null_Value },
            { label: getTrans('Opaque_'), value: PBRMaterial.PBRMATERIAL_OPAQUE },
            { label: getTrans('Alphatest'), value: PBRMaterial.PBRMATERIAL_ALPHATEST },
            { label: getTrans('Alphablend'), value: PBRMaterial.PBRMATERIAL_ALPHABLEND },
            { label: getTrans('Alphablendandtest'), value: PBRMaterial.PBRMATERIAL_ALPHATESTANDBLEND },
        ];

        var alphaModeOptions = [
            { label: getTrans('Combine'), value: Constants.ALPHA_COMBINE },
            { label: getTrans('Oneone'), value: Constants.ALPHA_ONEONE },
            { label: getTrans('Add'), value: Constants.ALPHA_ADD },
            { label: getTrans('Subtract'), value: Constants.ALPHA_SUBTRACT },
            { label: getTrans('Multiply_'), value: Constants.ALPHA_MULTIPLY },
            { label: getTrans('Maximized'), value: Constants.ALPHA_MAXIMIZED },
            { label: getTrans('Premultiplied'), value: Constants.ALPHA_PREMULTIPLIED },
        ];

        var depthfunctionOptions = [
            { label: getTrans('EngineDefault'), value: 0 },
            { label: getTrans('Never'), value: Engine.NEVER },
            { label: getTrans('Always'), value: Engine.ALWAYS },
            { label: getTrans('Equal'), value: Engine.EQUAL },
            { label: getTrans('Less'), value: Engine.LESS },
            { label: getTrans('Lessorequal'), value: Engine.LEQUAL },
            { label: getTrans('Greater'), value: Engine.GREATER },
            { label: getTrans('Greaterorequal'), value: Engine.GEQUAL },
            { label: getTrans('Notequal'), value: Engine.NOTEQUAL },
        ];

        var stencilFunctionOptions = [
            { label: getTrans('Never'), value: Constants.NEVER },
            { label: getTrans('Always'), value: Constants.ALWAYS },
            { label: getTrans('Equal'), value: Constants.EQUAL },
            { label: getTrans('Less'), value: Constants.LESS },
            { label: getTrans('Lessorequal'), value: Constants.LEQUAL },
            { label: getTrans('Greater'), value: Constants.GREATER },
            { label: getTrans('Greaterorequal'), value: Constants.GEQUAL },
            { label: getTrans('Notequal'), value: Constants.NOTEQUAL },
        ];

        var stencilOperationOptions = [
            { label: getTrans('Keep'), value: Constants.KEEP },
            { label: getTrans('Zero'), value: Constants.ZERO },
            { label: getTrans('Replace'), value: Constants.REPLACE },
            { label: getTrans('Incr'), value: Constants.INCR },
            { label: getTrans('Decr'), value: Constants.DECR },
            { label: getTrans('Invert'), value: Constants.INVERT },
            { label: getTrans('Incrwrap'), value: Constants.INCR_WRAP },
            { label: getTrans('Decrwrap'), value: Constants.DECR_WRAP },
        ];

        return (
            <div>
                <CustomPropertyGridComponent globalState={this.props.globalState} target={material}
                    lockObject={this.props.lockObject}
                    onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                <LineContainerComponent title={getTrans('GENERAL')} selection={this.props.globalState}>
                    <TextLineComponent label="ID" value={material.id} />
                    <TextInputLineComponent lockObject={this.props.lockObject} label= {getTrans('Name')} target={material} propertyName="name" onPropertyChangedObservable={this.props.onPropertyChangedObservable}/>
                    <TextLineComponent label={getTrans('UniqueID')} value={material.uniqueId.toString()} />
                    <TextLineComponent label={getTrans('Class')} value={material.getClassName()} />
                    <CheckBoxLineComponent label={getTrans('Backfaceculling')} target={material} propertyName="backFaceCulling" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <OptionsLineComponent label={getTrans('Orientation')} options={orientationOptions} target={material} propertyName="sideOrientation" onPropertyChangedObservable={this.props.onPropertyChangedObservable} onSelect={(value) => this.setState({ mode: value })} />
                    <CheckBoxLineComponent label={getTrans('Disablelighting')} target={material} propertyName="disableLighting" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('Disablecolorwrite')} target={material} propertyName="disableColorWrite" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('Disabledepthwrite')} target={material} propertyName="disableDepthWrite" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <OptionsLineComponent label={getTrans('Depthfunction')} options={depthfunctionOptions} target={material} propertyName="depthFunction" onPropertyChangedObservable={this.props.onPropertyChangedObservable} onSelect={(value) => this.setState({ depthFunction: value })} />
                    <CheckBoxLineComponent label={getTrans('Needdepthprepass')}target={material} propertyName="needDepthPrePass" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('Wireframe_')} target={material} propertyName="wireframe" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('Pointcloud')} target={material} propertyName="pointsCloud" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label={getTrans('Pointsize')} target={material} propertyName="pointSize" minimum={0} maximum={100} step={0.1} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label={getTrans('ZoffsetFactor')} target={material} propertyName="zOffset" minimum={-10} maximum={10} step={0.1} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label={getTrans('ZoffsetUnits')} target={material} propertyName="zOffsetUnits" minimum={-10} maximum={10} step={0.1} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <ButtonLineComponent label={getTrans('Dispose')} onClick={() => {
                        material.dispose();
                        this.props.globalState.onSelectionChangedObservable.notifyObservers(null);
                    }} />
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('TRANSPARENCY')} selection={this.props.globalState}>
                    <SliderLineComponent label={getTrans('Alpha')} target={material} propertyName="alpha" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    {
                        (material as any).transparencyMode !== undefined &&
                        <OptionsLineComponent allowNullValue={true} label={getTrans('Transparencymode')} options={transparencyModeOptions} target={material} propertyName="transparencyMode" onPropertyChangedObservable={this.props.onPropertyChangedObservable} onSelect={(value) => this.setState({ transparencyMode: value })} />
                    }
                    <OptionsLineComponent label={getTrans('Alphamode')} options={alphaModeOptions} target={material} propertyName="alphaMode" onPropertyChangedObservable={this.props.onPropertyChangedObservable} onSelect={(value) => this.setState({ alphaMode: value })} />
                    {
                        (material as any).diffuseTexture &&
                        <CheckBoxLineComponent label={getTrans('Diffusetexturehasalpha')} target={(material as any).diffuseTexture} propertyName="hasAlpha" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        (material as any).useAlphaFromDiffuseTexture !== undefined &&
                        <CheckBoxLineComponent label={getTrans('Usealphafromdiffusetexture')} target={material} propertyName="useAlphaFromDiffuseTexture" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        (material as any).albedoTexture &&
                        <CheckBoxLineComponent label= {getTrans('Albedotexturehasalpha')} target={(material as any).albedoTexture} propertyName="hasAlpha" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        (material as any).useAlphaFromAlbedoTexture !== undefined &&
                        <CheckBoxLineComponent label={getTrans('Usealphafromalbedotexture')} target={material} propertyName="useAlphaFromAlbedoTexture" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    <CheckBoxLineComponent label={getTrans('Separatecullingpass')} target={material} propertyName="separateCullingPass" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
                { material.stencil && <>
                    <LineContainerComponent title={getTrans('STENCIL')} selection={this.props.globalState}>
                        <CheckBoxLineComponent label={getTrans('Enabled')} target={material.stencil} propertyName="enabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        <HexLineComponent isInteger lockObject={this.props.lockObject} label={getTrans('Mask')} target={material.stencil} propertyName="mask" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        <OptionsLineComponent label={getTrans('Function')} options={stencilFunctionOptions} target={material.stencil} propertyName="func" onPropertyChangedObservable={this.props.onPropertyChangedObservable} onSelect={(value) => this.setState({ stencilFunction: value })} />
                        <FloatLineComponent isInteger lockObject={this.props.lockObject} label={getTrans('Functionreference')} target={material.stencil} propertyName="funcRef" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        <HexLineComponent isInteger lockObject={this.props.lockObject} label={getTrans('Functionmask')} target={material.stencil} propertyName="funcMask" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        <OptionsLineComponent label={getTrans('Optencilfail')} options={stencilOperationOptions} target={material.stencil} propertyName="opStencilFail" onPropertyChangedObservable={this.props.onPropertyChangedObservable} onSelect={(value) => this.setState({ opStencilFail: value })} />
                        <OptionsLineComponent label={getTrans('Opdepthfail')} options={stencilOperationOptions} target={material.stencil} propertyName="opDepthFail" onPropertyChangedObservable={this.props.onPropertyChangedObservable} onSelect={(value) => this.setState({ opDepthFail: value })} />
                        <OptionsLineComponent label={getTrans('Opstencildepthpass')} options={stencilOperationOptions} target={material.stencil} propertyName="opStencilDepthPass" onPropertyChangedObservable={this.props.onPropertyChangedObservable} onSelect={(value) => this.setState({ opStencilDepthPass: value })} />
                    </LineContainerComponent>
                </> }
                <AnimationGridComponent globalState={this.props.globalState} animatable={material} scene={material.getScene()} lockObject={this.props.lockObject} />
            </div>
        );
    }
}