import * as React from "react";
import { Scene } from "babylonjs/scene";
import { LineContainerComponent } from "../../../../sharedUiComponents/lines/lineContainerComponent";
import { CheckBoxLineComponent } from "../../../../sharedUiComponents/lines/checkBoxLineComponent";
import { GlobalState } from "../../../globalState";
import { FloatLineComponent } from "../../../../sharedUiComponents/lines/floatLineComponent";
import { OptionsLineComponent } from "../../../../sharedUiComponents/lines/optionsLineComponent";
import { MessageLineComponent } from "../../../../sharedUiComponents/lines/messageLineComponent";
import { faCheck, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { TextLineComponent } from "../../../../sharedUiComponents/lines/textLineComponent";
import { GLTFLoaderCoordinateSystemMode, GLTFLoaderAnimationStartMode } from "babylonjs-loaders/glTF/index";
import { Nullable } from "babylonjs/types";
import { Observer } from "babylonjs/Misc/observable";
import { IGLTFValidationResults } from "babylonjs-gltf2interface";
import {getTrans} from '../../../../translationLng';
interface IGLTFComponentProps {
    scene: Scene;
    globalState: GlobalState;
}

export class GLTFComponent extends React.Component<IGLTFComponentProps> {
    private _onValidationResultsUpdatedObserver: Nullable<Observer<Nullable<IGLTFValidationResults>>> = null;

    openValidationDetails() {
        const validationResults = this.props.globalState.validationResults;
        const win = window.open("", "_blank");
        if (win) {
            // TODO: format this better and use generator registry (https://github.com/KhronosGroup/glTF-Generator-Registry)
            win.document.title = "glTF Validation Results";
            win.document.body.innerText = JSON.stringify(validationResults, null, 2);
            win.document.body.style.whiteSpace = "pre";
            win.document.body.style.fontFamily = `monospace`;
            win.document.body.style.fontSize = `14px`;
            win.focus();
        }
    }

    prepareText(singularForm: string, count: number) {
        if (count) {
            return `${count} ${singularForm}s`;
        }

        return `${singularForm}`;
    }

    componentDidMount() {
        if (this.props.globalState) {
            this._onValidationResultsUpdatedObserver = this.props.globalState.onValidationResultsUpdatedObservable.add(() => {
                this.forceUpdate();
            });
        }
    }

    componentWillUnmount() {
        if (this.props.globalState) {
            if (this._onValidationResultsUpdatedObserver) {
                this.props.globalState.onValidationResultsUpdatedObservable.remove(this._onValidationResultsUpdatedObserver);
            }
        }
    }

    renderValidation() {
        const validationResults = this.props.globalState.validationResults;
        if (!validationResults) {
            return null;
        }

        const issues = validationResults.issues;

        return (
            <LineContainerComponent title={getTrans('GLTFVALIDATION')} closed={!issues.numErrors && !issues.numWarnings} selection={this.props.globalState}>
                {issues.numErrors !== 0 && <MessageLineComponent text="Your file has some validation issues" icon={faTimesCircle} color="Red" />}
                {issues.numErrors === 0 && <MessageLineComponent text="Your file is a valid glTF file" icon={faCheck} color="Green" />}
                <TextLineComponent label={getTrans('Errors')} value={issues.numErrors.toString()} />
                <TextLineComponent label={getTrans('Warnings')} value={issues.numWarnings.toString()} />
                <TextLineComponent label={getTrans('Infos')} value={issues.numInfos.toString()} />
                <TextLineComponent label={getTrans('Hints')} value={issues.numHints.toString()} />
                <TextLineComponent label={getTrans('Moredetails')} value="Click here" onLink={() => this.openValidationDetails()} />
            </LineContainerComponent>
        );
    }

    render() {
        const extensionStates = this.props.globalState.glTFLoaderExtensionDefaults;
        const loaderState = this.props.globalState.glTFLoaderDefaults;

        var animationStartMode =
            (typeof GLTFLoaderAnimationStartMode !== "undefined"
                ? [
                      { label: getTrans('None'), value: GLTFLoaderAnimationStartMode.NONE },
                      { label: getTrans('First'), value: GLTFLoaderAnimationStartMode.FIRST },
                      { label: getTrans('ALL'), value: GLTFLoaderAnimationStartMode.ALL },
                  ]
                : [
                    { label: getTrans('None'), value: 0 },
                    { label: getTrans('First'), value: 1 },
                    { label: getTrans('ALL'), value: 2 },
                ]);

        var coordinateSystemMode =
            typeof GLTFLoaderCoordinateSystemMode !== "undefined"
                ? [
                      { label: getTrans('Auto'), value: GLTFLoaderCoordinateSystemMode.AUTO },
                      { label: getTrans('Righthanded'), value: GLTFLoaderCoordinateSystemMode.FORCE_RIGHT_HANDED },
                  ]
                : [
                    { label: getTrans('Auto'), value: 0 },
                    { label: getTrans('Righthanded'), value: 1 },
                ];

        return (
            <div>
                <LineContainerComponent title={getTrans('GLTFLOADER')} closed={true} selection={this.props.globalState}>
                    <OptionsLineComponent label={getTrans('Animationstartmode')} options={animationStartMode} target={loaderState} propertyName="animationStartMode" />
                    <CheckBoxLineComponent label={getTrans('Captureperformancecounters')} target={loaderState} propertyName="capturePerformanceCounters" />
                    <CheckBoxLineComponent label={getTrans('Compilematerials')} target={loaderState} propertyName="compileMaterials" />
                    <CheckBoxLineComponent label={getTrans('Compileshadowgenerators')} target={loaderState} propertyName="compileShadowGenerators" />
                    <OptionsLineComponent label={getTrans('Coordinatesystem')}options={coordinateSystemMode} target={loaderState} propertyName="coordinateSystemMode" />
                    <CheckBoxLineComponent label={getTrans('Enablelogging')} target={loaderState} propertyName="loggingEnabled" />
                    <CheckBoxLineComponent label={getTrans('Transparencyasoverage')} target={loaderState} propertyName="transparencyAsCoverage" />
                    <CheckBoxLineComponent label={getTrans('Useclipplane')} target={loaderState} propertyName="useClipPlane" />
                    <CheckBoxLineComponent label={getTrans('Validate')} target={loaderState} propertyName="validate" />
                    <MessageLineComponent text={getTrans('reloadyourfiletoseethesechanges')} />
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('GLTFEXTENSIONS')} closed={true} selection={this.props.globalState}>
                    <CheckBoxLineComponent label={getTrans('EXTlightsimagebased')} isSelected={() => extensionStates["EXT_lights_image_based"].enabled} onSelect={(value) => (extensionStates["EXT_lights_image_based"].enabled = value)} />
                    <CheckBoxLineComponent label={getTrans('EXTmeshgpuinstancing')} isSelected={() => extensionStates["EXT_mesh_gpu_instancing"].enabled} onSelect={(value) => (extensionStates["EXT_mesh_gpu_instancing"].enabled = value)} />
                    <CheckBoxLineComponent label={getTrans('EXTtexturewebp')}isSelected={() => extensionStates["EXT_texture_webp"].enabled} onSelect={(value) => (extensionStates["EXT_texture_webp"].enabled = value)} />
                    <CheckBoxLineComponent label={getTrans('KHR_draco_mesh_compression')} isSelected={() => extensionStates["KHR_draco_mesh_compression"].enabled} onSelect={(value) => (extensionStates["KHR_draco_mesh_compression"].enabled = value)} />
                    <CheckBoxLineComponent label={getTrans('KHR_materials_pbrSpecularGloss')} isSelected={() => extensionStates["KHR_materials_pbrSpecularGlossiness"].enabled} onSelect={(value) => (extensionStates["KHR_materials_pbrSpecularGlossiness"].enabled = value)} />
                    <CheckBoxLineComponent label={getTrans('KHR_materials_clearcoat')} isSelected={() => extensionStates["KHR_materials_clearcoat"].enabled} onSelect={(value) => (extensionStates["KHR_materials_clearcoat"].enabled = value)} />
                    <CheckBoxLineComponent label={getTrans('KHR_materials_ior')} isSelected={() => extensionStates["KHR_materials_ior"].enabled} onSelect={(value) => (extensionStates["KHR_materials_ior"].enabled = value)} />
                    <CheckBoxLineComponent label={getTrans('KHR_materials_sheen')}isSelected={() => extensionStates["KHR_materials_sheen"].enabled} onSelect={(value) => (extensionStates["KHR_materials_sheen"].enabled = value)} />
                    <CheckBoxLineComponent label={getTrans('KHR_materials_specular')} isSelected={() => extensionStates["KHR_materials_specular"].enabled} onSelect={(value) => (extensionStates["KHR_materials_specular"].enabled = value)} />
                    <CheckBoxLineComponent label={getTrans('KHR_materials_unlit')} isSelected={() => extensionStates["KHR_materials_unlit"].enabled} onSelect={(value) => (extensionStates["KHR_materials_unlit"].enabled = value)} />
                    <CheckBoxLineComponent label={getTrans('KHR_materials_variants')} isSelected={() => extensionStates["KHR_materials_variants"].enabled} onSelect={(value) => (extensionStates["KHR_materials_variants"].enabled = value)} />
                    <CheckBoxLineComponent label={getTrans('KHR_materials_transmission')} isSelected={() => extensionStates["KHR_materials_transmission"].enabled} onSelect={(value) => (extensionStates["KHR_materials_transmission"].enabled = value)} />
                    <CheckBoxLineComponent label={getTrans('KHR_materials_translucency')} isSelected={() => extensionStates["KHR_materials_translucency"].enabled} onSelect={(value) => (extensionStates["KHR_materials_translucency"].enabled = value)} />
                    <CheckBoxLineComponent label={getTrans('KHR_materials_volume')} isSelected={() => extensionStates["KHR_materials_volume"].enabled} onSelect={(value) => (extensionStates["KHR_materials_volume"].enabled = value)} />
                    <CheckBoxLineComponent label={getTrans('KHR_mesh_quantization')} isSelected={() => extensionStates["KHR_mesh_quantization"].enabled} onSelect={(value) => (extensionStates["KHR_mesh_quantization"].enabled = value)} />
                    <CheckBoxLineComponent label={getTrans('KHR_lights_punctual')} isSelected={() => extensionStates["KHR_lights_punctual"].enabled} onSelect={(value) => (extensionStates["KHR_lights_punctual"].enabled = value)} />
                    <CheckBoxLineComponent label={getTrans('KHR_texture_basisu')} isSelected={() => extensionStates["KHR_texture_basisu"].enabled} onSelect={(value) => (extensionStates["KHR_texture_basisu"].enabled = value)} />
                    <CheckBoxLineComponent label={getTrans('KHR_texture_transform')} isSelected={() => extensionStates["KHR_texture_transform"].enabled} onSelect={(value) => (extensionStates["KHR_texture_transform"].enabled = value)} />
                    <CheckBoxLineComponent label={getTrans('KHR_xmp_json_ld')} isSelected={() => extensionStates["KHR_xmp_json_ld"].enabled} onSelect={(value) => (extensionStates["KHR_xmp_json_ld"].enabled = value)} />
                    <CheckBoxLineComponent label={getTrans('MSFT_lod')}isSelected={() => extensionStates["MSFT_lod"].enabled} onSelect={(value) => (extensionStates["MSFT_lod"].enabled = value)} />
                    <FloatLineComponent label={getTrans('MaximumLODs')} target={extensionStates["MSFT_lod"]} propertyName="maxLODsToLoad" additionalClass="gltf-extension-property" isInteger={true} />
                    <CheckBoxLineComponent label={getTrans('MSFT_minecraftMesh')} isSelected={() => extensionStates["MSFT_minecraftMesh"].enabled} onSelect={(value) => (extensionStates["MSFT_minecraftMesh"].enabled = value)} />
                    <CheckBoxLineComponent label={getTrans('MSFT_sRGBFactors')}isSelected={() => extensionStates["MSFT_sRGBFactors"].enabled} onSelect={(value) => (extensionStates["MSFT_sRGBFactors"].enabled = value)} />
                    <CheckBoxLineComponent label={getTrans('MSFT_audio_emitter')} isSelected={() => extensionStates["MSFT_audio_emitter"].enabled} onSelect={(value) => (extensionStates["MSFT_audio_emitter"].enabled = value)} />
                    <MessageLineComponent text={getTrans('reloadyourfiletoseethesechanges')} />
                </LineContainerComponent>
                {this.props.globalState.validationResults && this.renderValidation()}
            </div>
        );
    }
}
