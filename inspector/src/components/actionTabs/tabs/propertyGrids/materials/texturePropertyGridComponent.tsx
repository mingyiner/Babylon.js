import * as React from "react";

import { Nullable } from "babylonjs/types";
import { Tools } from "babylonjs/Misc/tools";
import { Observable } from "babylonjs/Misc/observable";
import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
import { Texture } from "babylonjs/Materials/Textures/texture";
import { RenderTargetTexture } from "babylonjs/Materials/Textures/renderTargetTexture";
import { MultiRenderTarget } from "babylonjs/Materials/Textures/multiRenderTarget";
import { CubeTexture } from "babylonjs/Materials/Textures/cubeTexture";
import { Constants } from "babylonjs/Engines/constants";

import { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import { LineContainerComponent } from "../../../../../sharedUiComponents/lines/lineContainerComponent";
import { SliderLineComponent } from "../../../../../sharedUiComponents/lines/sliderLineComponent";
import { TextLineComponent } from "../../../../../sharedUiComponents/lines/textLineComponent";
import { CheckBoxLineComponent } from "../../../../../sharedUiComponents/lines/checkBoxLineComponent";
import { TextureLineComponent } from "../../../lines/textureLineComponent";
import { FloatLineComponent } from "../../../../../sharedUiComponents/lines/floatLineComponent";
import { OptionsLineComponent } from "../../../../../sharedUiComponents/lines/optionsLineComponent";
import { FileButtonLineComponent } from "../../../../../sharedUiComponents/lines/fileButtonLineComponent";
import { LockObject } from "../../../../../sharedUiComponents/tabs/propertyGrids/lockObject";
import { ValueLineComponent } from "../../../../../sharedUiComponents/lines/valueLineComponent";
import { GlobalState } from "../../../../../components/globalState";

import { AdvancedDynamicTextureInstrumentation } from "babylonjs-gui/2D/adtInstrumentation";
import { AdvancedDynamicTexture } from "babylonjs-gui/2D/advancedDynamicTexture";
import { CustomPropertyGridComponent } from '../customPropertyGridComponent';
import { ButtonLineComponent } from '../../../../../sharedUiComponents/lines/buttonLineComponent';
import { TextInputLineComponent } from '../../../../../sharedUiComponents/lines/textInputLineComponent';
import { AnimationGridComponent } from '../animations/animationPropertyGridComponent';

import { PopupComponent } from '../../../../popupComponent';
import { TextureEditorComponent } from './textures/textureEditorComponent';
import {getTrans} from '../../../../../translationLng';

interface ITexturePropertyGridComponentProps {
    texture: BaseTexture,
    lockObject: LockObject,
    globalState: GlobalState,
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>
}

interface ITexturePropertyGridComponentState {
    isTextureEditorOpen : boolean,
    textureEditing : Nullable<BaseTexture>
}

const textureFormat = [
    { label: getTrans('Alpha'), normalizable: 0, value: Constants.TEXTUREFORMAT_ALPHA },
    { label: getTrans('Luminance'), normalizable: 0, value: Constants.TEXTUREFORMAT_LUMINANCE },
    { label: getTrans('LuminanceAlpha'), normalizable: 0, value: Constants.TEXTUREFORMAT_LUMINANCE_ALPHA },
    { label: getTrans('RGB'), normalizable: 1, value: Constants.TEXTUREFORMAT_RGB },
    { label: getTrans('RGBA'), normalizable: 1, value: Constants.TEXTUREFORMAT_RGBA },
    { label: getTrans('R_red'), normalizable: 1, value: Constants.TEXTUREFORMAT_RED },
    { label: getTrans('RG_red_green'), normalizable: 1, value: Constants.TEXTUREFORMAT_RG },
    { label: getTrans('R_red_integer'), normalizable: 0, value: Constants.TEXTUREFORMAT_RED_INTEGER },
    { label: getTrans('RG_integer'), normalizable: 0, value: Constants.TEXTUREFORMAT_RG_INTEGER },
    { label: getTrans('RGBinteger'), normalizable: 0, value: Constants.TEXTUREFORMAT_RGB_INTEGER },
    { label: getTrans('RGBAinteger'), normalizable: 0, value: Constants.TEXTUREFORMAT_RGBA_INTEGER },
    { label: getTrans('BGRA'), normalizable: 1, value: Constants.TEXTUREFORMAT_BGRA },
    { label: getTrans('Depth24_Stencil8'), normalizable: 0, hideType: true, value: Constants.TEXTUREFORMAT_DEPTH24_STENCIL8 },
    { label: getTrans('Depth32_float'), normalizable: 0, hideType: true, value: Constants.TEXTUREFORMAT_DEPTH32_FLOAT },
    { label: getTrans('Depth16'), normalizable: 0, value: Constants.TEXTUREFORMAT_DEPTH16 },
    { label: getTrans('Depth24'), normalizable: 0, value: Constants.TEXTUREFORMAT_DEPTH24 },
    { label: getTrans('RGBABPTCUNorm'), normalizable: 0, compressed: true, value: Constants.TEXTUREFORMAT_COMPRESSED_RGBA_BPTC_UNORM },
    { label: getTrans('RGBBPTCUFloat'), normalizable: 0, compressed: true, value: Constants.TEXTUREFORMAT_COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT },
    { label: getTrans('RGBBPTCSFloat'), normalizable: 0, compressed: true, value: Constants.TEXTUREFORMAT_COMPRESSED_RGB_BPTC_SIGNED_FLOAT },
    { label: getTrans('RGBAS3TCDXT5'), normalizable: 0, compressed: true, value: Constants.TEXTUREFORMAT_COMPRESSED_RGBA_S3TC_DXT5 },
    { label: getTrans('RGBAS3TCDXT3'), normalizable: 0, compressed: true, value: Constants.TEXTUREFORMAT_COMPRESSED_RGBA_S3TC_DXT3 },
    { label: getTrans('RGBAS3TCDXT1'), normalizable: 0, compressed: true, value: Constants.TEXTUREFORMAT_COMPRESSED_RGBA_S3TC_DXT1 },
    { label: getTrans('RGBS3TCDXT1'), normalizable: 0, compressed: true, value: Constants.TEXTUREFORMAT_COMPRESSED_RGB_S3TC_DXT1 },
    { label: getTrans('RGBAASTC44'), normalizable: 0, compressed: true, value: Constants.TEXTUREFORMAT_COMPRESSED_RGBA_ASTC_4x4 },
];

const textureType = [
    { label: getTrans('unsigned_byte'), normalizable: 1, value: Constants.TEXTURETYPE_UNSIGNED_BYTE },
    { label: getTrans('bit32float'), normalizable: 0, value: Constants.TEXTURETYPE_FLOAT },
    { label: getTrans('bit16float'), normalizable: 0, value: Constants.TEXTURETYPE_HALF_FLOAT },
    { label: getTrans('signedbyte'), normalizable: 1, value: Constants.TEXTURETYPE_BYTE },
    { label: getTrans('signedshort'), normalizable: 0, value: Constants.TEXTURETYPE_SHORT },
    { label: getTrans('unsignedshort'), normalizable: 0, value: Constants.TEXTURETYPE_UNSIGNED_SHORT },
    { label: getTrans('signedint'), normalizable: 0, value: Constants.TEXTURETYPE_INT },
    { label: getTrans('unsignedint'), normalizable: 0, value: Constants.TEXTURETYPE_UNSIGNED_INTEGER },
    { label: getTrans('unsigned4_4_4_4short'), normalizable: 0, value: Constants.TEXTURETYPE_UNSIGNED_SHORT_4_4_4_4 },
    { label: getTrans('unsigned5_5_5_1_short'), normalizable: 0, value: Constants.TEXTURETYPE_UNSIGNED_SHORT_5_5_5_1 },
    { label: getTrans('unsigned5_6_5_short'), normalizable: 0, value: Constants.TEXTURETYPE_UNSIGNED_SHORT_5_6_5 },
    { label: getTrans('unsigned2_10_10_10_int'), normalizable: 0, value: Constants.TEXTURETYPE_UNSIGNED_INT_2_10_10_10_REV },
    { label: getTrans('unsigned24_8_int'), normalizable: 0, value: Constants.TEXTURETYPE_UNSIGNED_INT_24_8 },
    { label: getTrans('unsigned10f_11f_11f_int'), normalizable: 0, value: Constants.TEXTURETYPE_UNSIGNED_INT_10F_11F_11F_REV },
    { label: getTrans('unsigned5_9_9_9_int'), normalizable: 0, value: Constants.TEXTURETYPE_UNSIGNED_INT_5_9_9_9_REV },
    { label: getTrans('bits32withonly8_bitused_stencil'), normalizable: 0, value: Constants.TEXTURETYPE_FLOAT_32_UNSIGNED_INT_24_8_REV },
];

export class TexturePropertyGridComponent extends React.Component<ITexturePropertyGridComponentProps,ITexturePropertyGridComponentState> {

    private _adtInstrumentation: Nullable<AdvancedDynamicTextureInstrumentation>;
    private popoutWindowRef : React.RefObject<PopupComponent>;
    private textureLineRef: React.RefObject<TextureLineComponent>;

    private _textureInspectorSize = {width: 1024, height: 490};


    constructor(props: ITexturePropertyGridComponentProps) {
        super(props);

        this.state = {
            isTextureEditorOpen: false,
            textureEditing: null
        }
        const texture = this.props.texture;

        this.textureLineRef = React.createRef();
        this.popoutWindowRef = React.createRef();

        if (!texture || !(texture as any).rootContainer) {
            return;
        }

        const adt = texture as AdvancedDynamicTexture;

        this._adtInstrumentation = new AdvancedDynamicTextureInstrumentation(adt);
        this._adtInstrumentation!.captureRenderTime = true;
        this._adtInstrumentation!.captureLayoutTime = true;

        this.onOpenTextureEditor.bind(this);
        this.onCloseTextureEditor.bind(this);
        this.openTextureEditor.bind(this);
    }

    componentWillUnmount() {
        if (this._adtInstrumentation) {
            this._adtInstrumentation.dispose();
            this._adtInstrumentation = null;
        }
    }

    updateTexture(file: File) {
        const texture = this.props.texture;
        Tools.ReadFile(file, (data) => {
            var blob = new Blob([data], { type: "octet/stream" });

            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                let base64data = reader.result as string;

                if (texture.isCube) {
                    let extension: string | undefined = undefined;
                    if (file.name.toLowerCase().indexOf(".dds") > 0) {
                        extension = ".dds";
                    } else if (file.name.toLowerCase().indexOf(".env") > 0) {
                        extension = ".env";
                    }

                    (texture as CubeTexture).updateURL(base64data, extension, () => this.forceRefresh());
                } else {
                    (texture as Texture).updateURL(base64data, null, () => this.forceRefresh());
                }
            };

        }, undefined, true);
    }

    openTextureEditor() {
        if (this.state.isTextureEditorOpen) {
            this.onCloseTextureEditor(() => this.openTextureEditor());
            return;
        }
        this.setState({
            isTextureEditorOpen: true,
            textureEditing: this.props.texture
        });
    }

    onOpenTextureEditor(window: Window) {}

    onCloseTextureEditor(callback?: {() : void}) {
        this.setState({
            isTextureEditorOpen: false,
            textureEditing: null
        }, callback);
    }

    forceRefresh() {
        this.forceUpdate();
        (this.textureLineRef.current as TextureLineComponent).updatePreview();
    }

    findTextureFormat(format: number) {
        for (let i = 0; i < textureFormat.length; ++i) {
            if (textureFormat[i].value === format) {
                return textureFormat[i];
            }
        }
        return null;
    }

    findTextureType(type: number) {
        for (let i = 0; i < textureType.length; ++i) {
            if (textureType[i].value === type) {
                return textureType[i];
            }
        }
        return null;
    }

    render() {
        const texture = this.props.texture;

        var samplingMode = [
            { label: getTrans('Nearest'),value: Texture.NEAREST_NEAREST }, // 1
            { label: getTrans('Linear'), value: Texture.LINEAR_LINEAR }, // 2

            { label: getTrans('Linearlinearmip'), value: Texture.LINEAR_LINEAR_MIPLINEAR }, // 3
            { label: getTrans('Linearnearestmip'), value: Texture.LINEAR_LINEAR_MIPNEAREST }, // 11

            { label: getTrans('Neareslinearmip'), value: Texture.NEAREST_NEAREST_MIPLINEAR }, // 8
            { label: getTrans('Nearestnearestmip'), value: Texture.NEAREST_NEAREST_MIPNEAREST }, // 4

            { label: getTrans('NearestLinear'), value: Texture.NEAREST_LINEAR }, // 7
            { label: getTrans('NearestLinearlinearmip'), value: Texture.NEAREST_LINEAR_MIPLINEAR }, // 6
            { label: getTrans('NearestLinearnearestmip'), value: Texture.NEAREST_LINEAR_MIPNEAREST }, // 5

            { label: getTrans('LinearNearest'), value: Texture.LINEAR_NEAREST }, // 12
            { label: getTrans('LinearNearestlinearmip'), value: Texture.LINEAR_NEAREST_MIPLINEAR }, // 10
            { label: getTrans('LinearNearestnearestmip'), value: Texture.LINEAR_NEAREST_MIPNEAREST }, // 9
        ];

        var coordinatesMode = [
            { label: getTrans('Explicit'), value: Texture.EXPLICIT_MODE },
            { label: getTrans('Cubic'), value: Texture.CUBIC_MODE },
            { label: getTrans('Inversecubic'), value: Texture.INVCUBIC_MODE },
            { label: getTrans('Equirectangular'), value: Texture.EQUIRECTANGULAR_MODE },
            { label: getTrans('Fixedequirectangular'), value: Texture.FIXED_EQUIRECTANGULAR_MODE },
            { label: getTrans('Fixedequirectangularmirrored'), value: Texture.FIXED_EQUIRECTANGULAR_MIRRORED_MODE },
            { label: getTrans('Planar'), value: Texture.PLANAR_MODE },
            { label: getTrans('Projection'), value: Texture.PROJECTION_MODE },
            { label: getTrans('Skybox'), value: Texture.SKYBOX_MODE },
            { label: getTrans('Spherical'), value: Texture.SPHERICAL_MODE },
        ];

        const format = texture._texture?.format ?? -2; // -2 is an invalid value so that findTextureFormat will return null when texture is null/undefined. It can't be -1 because -1 means RGBA, so it is -2 :)
        const type = texture._texture?.type ?? -2; // same than above, -1 means ubyte

        const oformat = this.findTextureFormat(format === -1 ? Constants.TEXTUREFORMAT_RGBA : format);
        const otype = this.findTextureType(type === -1 ? Constants.TEXTURETYPE_UNSIGNED_BYTE : type);
        const textureClass = texture instanceof MultiRenderTarget ? "MultiRenderTarget" : texture instanceof RenderTargetTexture ? "RenderTargetTexture" : texture.getClassName();
        const count = texture instanceof MultiRenderTarget ? texture.count : -1;

        let extension = "";
        let url = (texture as Texture).url;
        let textureUrl = (!url || url.substring(0, 4) === "data" || url.substring(0, 4) === "blob") ? "" : url;

        if (textureUrl) {
            for (var index = textureUrl.length - 1; index >= 0; index--) {
                if (textureUrl[index] === ".") {
                    break;
                }
                extension = textureUrl[index] + extension;
            }
        }

        return (
            <div className="pane">
                <LineContainerComponent title={getTrans('PREVIEW')} selection={this.props.globalState}>
                    <TextureLineComponent ref={this.textureLineRef} texture={texture} width={256} height={256} globalState={this.props.globalState} />
                    <FileButtonLineComponent label={getTrans('Loadtexturefromfile_')}onClick={(file) => this.updateTexture(file)} accept=".jpg, .png, .tga, .dds, .env" />
                    <ButtonLineComponent label={getTrans('Edit')} onClick={() => this.openTextureEditor()} />
                    <TextInputLineComponent label={getTrans('URL')} value={textureUrl} lockObject={this.props.lockObject} onChange={url => {
                        (texture as Texture).updateURL(url);
                        this.forceRefresh();
                    }} />
                </LineContainerComponent>
                {this.state.isTextureEditorOpen && (
                <PopupComponent
                  id='texture-editor'
                  title='Texture Inspector'
                  size={this._textureInspectorSize}
                  onOpen={this.onOpenTextureEditor}
                  onClose={() => this.onCloseTextureEditor}
                  ref={this.popoutWindowRef}
                >
                    <TextureEditorComponent
                        texture={this.props.texture}
                        url={textureUrl}
                        window={this.popoutWindowRef}
                        onUpdate={() => this.forceRefresh()}
                    />
                </PopupComponent>)}
                <CustomPropertyGridComponent globalState={this.props.globalState} target={texture}
                    lockObject={this.props.lockObject}
                    onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                <LineContainerComponent title={getTrans('GENERAL')} selection={this.props.globalState}>
                    <TextLineComponent label={getTrans('Width')} value={texture.getSize().width.toString()} />
                    <TextLineComponent label={getTrans('Height')} value={texture.getSize().height.toString()} />
                    {
                        texture.isRenderTarget &&
                        <ButtonLineComponent label={getTrans('Scaleup')} onClick={() => {
                            let scene = texture.getScene()!;
                            texture.scale(2);
                            setTimeout(() => {
                                this.props.globalState.onSelectionChangedObservable.notifyObservers(scene.getTextureByUniqueId(texture.uniqueId));
                            });
                        }} />
                    }
                    {
                        texture.isRenderTarget &&
                        <ButtonLineComponent label={getTrans('Scaledown')} onClick={() => {
                            let scene = texture.getScene()!;
                            texture.scale(0.5);
                            setTimeout(() => {
                                this.props.globalState.onSelectionChangedObservable.notifyObservers(scene.getTextureByUniqueId(texture.uniqueId));
                            });
                        }} />
                    }
                    <TextLineComponent label={getTrans('Format')} value={oformat?.label ?? "unknown"} />
                    {
                        !oformat?.hideType && !oformat?.compressed &&
                        <TextLineComponent label={getTrans('Type')} value={otype?.label ?? "unknown"} />
                    }
                    {
                        !!oformat?.normalizable && !oformat?.compressed && !!otype?.normalizable &&
                        <TextLineComponent label={getTrans('Normalized')}value={otype.normalizable ? "Yes" : "No"} />
                    }
                    <TextLineComponent label={getTrans('Iscompressed')} value={oformat?.compressed ? "Yes" : "No"} />
                    <TextLineComponent label={getTrans('UsesRGBbuffers')} value={texture._texture?._useSRGBBuffer ? "Yes" : "No"} />
                    {
                        extension &&
                        <TextLineComponent label={getTrans('Fileformat')} value={extension} />
                    }
                    <TextLineComponent label={getTrans('UniqueID')} value={texture.uniqueId.toString()} />
                    <TextLineComponent label={getTrans('InternalUniqueID')} value={texture._texture?.uniqueId.toString()} />
                    <TextLineComponent label={getTrans('Class')} value={textureClass} />
                    {
                        count >= 0 &&
                            <TextLineComponent label={getTrans('Numberoftextures')} value={count.toString()} />
                    }
                    <TextLineComponent label={getTrans('Hasalpha')} value={texture.hasAlpha ? "Yes" : "No"} />
                    <TextLineComponent label={getTrans('Is3D')} value={texture.is3D ? "Yes" : "No"} />
                    <TextLineComponent label={getTrans('Is2Darray')} value={texture.is2DArray ? "Yes" : "No"} />
                    <TextLineComponent label={getTrans('Iscube')} value={texture.isCube ? "Yes" : "No"} />
                    <TextLineComponent label={getTrans('Isrendertarget')} value={texture.isRenderTarget ? "Yes" : "No"} />
                    {
                        (texture instanceof Texture) &&
                        <TextLineComponent label={getTrans('StoredasinvertedonY')} value={texture.invertY ? "Yes" : "No"} />
                    }
                    <TextLineComponent label={getTrans('Has mipmaps')} value={!texture.noMipmap ? "Yes" : "No"} />
                    <SliderLineComponent label={getTrans('UVset')} target={texture} propertyName="coordinatesIndex" minimum={0} maximum={3} step={1} onPropertyChangedObservable={this.props.onPropertyChangedObservable} decimalCount={0} />
                    <OptionsLineComponent label={getTrans('Mode')} options={coordinatesMode} target={texture} propertyName="coordinatesMode" onPropertyChangedObservable={this.props.onPropertyChangedObservable} onSelect={(value) => texture.coordinatesMode = value} />
                    <SliderLineComponent label={getTrans('Level')} target={texture} propertyName="level" minimum={0} maximum={2} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    {
                        texture.updateSamplingMode &&
                        <OptionsLineComponent label={getTrans('Sampling')} options={samplingMode} target={texture} noDirectUpdate={true} propertyName="samplingMode" onPropertyChangedObservable={this.props.onPropertyChangedObservable} onSelect={(value) => texture.updateSamplingMode(value)} />
                    }
                </LineContainerComponent>
                {
                    texture.getScene() &&
                    <AnimationGridComponent globalState={this.props.globalState} animatable={texture} scene={texture.getScene()!} lockObject={this.props.lockObject} />
                }
                {
                    (texture as any).rootContainer && this._adtInstrumentation &&
                    <LineContainerComponent title={getTrans('ADVANCEDTEXTUREPROPERTIES')} selection={this.props.globalState}>
                        <ValueLineComponent label={getTrans('Lastlayouttime')} value={this._adtInstrumentation!.renderTimeCounter.current} units="ms" />
                        <ValueLineComponent label={getTrans('Lastrendertime')} value={this._adtInstrumentation!.layoutTimeCounter.current} units="ms" />
                        <SliderLineComponent label={getTrans('Renderscale')} minimum={0.1} maximum={5} step={0.1} target={texture} propertyName="renderScale" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        <CheckBoxLineComponent label={getTrans('Premultiplyalpha')} target={texture} propertyName="premulAlpha" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Idealwidth')} target={texture} propertyName="idealWidth" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        <FloatLineComponent lockObject={this.props.lockObject} label= {getTrans('Idealheight')} target={texture} propertyName="idealHeight" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        <CheckBoxLineComponent label={getTrans('Usesmallestideal')} target={texture} propertyName="useSmallestIdeal" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        <CheckBoxLineComponent label={getTrans('Renderatidealsize')} target={texture} propertyName="renderAtIdealSize" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        <CheckBoxLineComponent label={getTrans('InvalidateRectoptimization')} target={texture} propertyName="useInvalidateRectOptimization" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    </LineContainerComponent>
                }
                <LineContainerComponent title={getTrans('TRANSFORM')} selection={this.props.globalState}>
                    {
                        !texture.isCube &&
                        <div>
                            <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Uoffset')} target={texture} propertyName="uOffset" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Voffset')} target={texture} propertyName="vOffset" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Uscale')} target={texture} propertyName="uScale" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Vscale')} target={texture} propertyName="vScale" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Uangle')} useEuler={this.props.globalState.onlyUseEulers} target={texture} propertyName="uAng" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Vangle')} useEuler={this.props.globalState.onlyUseEulers} target={texture} propertyName="vAng" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <FloatLineComponent lockObject={this.props.lockObject} label={getTrans('Wangle')} useEuler={this.props.globalState.onlyUseEulers} target={texture} propertyName="wAng" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <CheckBoxLineComponent label={getTrans('ClampU')} isSelected={() => texture.wrapU === Texture.CLAMP_ADDRESSMODE} onSelect={(value) => texture.wrapU = value ? Texture.CLAMP_ADDRESSMODE : Texture.WRAP_ADDRESSMODE} />
                            <CheckBoxLineComponent label={getTrans('ClampV')} isSelected={() => texture.wrapV === Texture.CLAMP_ADDRESSMODE} onSelect={(value) => texture.wrapV = value ? Texture.CLAMP_ADDRESSMODE : Texture.WRAP_ADDRESSMODE} />
                        </div>
                    }
                    {
                        texture.isCube &&
                        <div>
                            <SliderLineComponent label={getTrans('RotationY')} useEuler={this.props.globalState.onlyUseEulers} minimum={0} maximum={2 * Math.PI} step={0.1} target={texture} propertyName="rotationY" />
                        </div>
                    }
                </LineContainerComponent>
            </div>
        );
    }
}