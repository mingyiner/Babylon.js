import * as React from "react";
import { PaneComponent, IPaneComponentProps } from "../paneComponent";
import { TextLineComponent } from "../../../sharedUiComponents/lines/textLineComponent";
import { LineContainerComponent } from "../../../sharedUiComponents/lines/lineContainerComponent";

import { Nullable } from "babylonjs/types";
import { EngineInstrumentation } from "babylonjs/Instrumentation/engineInstrumentation";
import { SceneInstrumentation } from "babylonjs/Instrumentation/sceneInstrumentation";
import { Engine } from "babylonjs/Engines/engine";

import { ValueLineComponent } from "../../../sharedUiComponents/lines/valueLineComponent";
import { BooleanLineComponent } from "../../../sharedUiComponents/lines/booleanLineComponent";
import { PerformanceViewerComponent } from "./performanceViewer/performanceViewerComponent";
import {getTrans} from '../../../translationLng';
export class StatisticsTabComponent extends PaneComponent {
    private _sceneInstrumentation: Nullable<SceneInstrumentation>;
    private _engineInstrumentation: Nullable<EngineInstrumentation>;
    private _timerIntervalId: number;

    constructor(props: IPaneComponentProps) {
        super(props);

        const scene = this.props.scene;

        if (!scene) {
            return;
        }

        this._sceneInstrumentation = new SceneInstrumentation(scene);
        this._sceneInstrumentation.captureActiveMeshesEvaluationTime = true;
        this._sceneInstrumentation.captureRenderTargetsRenderTime = true;
        this._sceneInstrumentation.captureFrameTime = true;
        this._sceneInstrumentation.captureRenderTime = true;
        this._sceneInstrumentation.captureInterFrameTime = true;
        this._sceneInstrumentation.captureParticlesRenderTime = true;
        this._sceneInstrumentation.captureSpritesRenderTime = true;
        this._sceneInstrumentation.capturePhysicsTime = true;
        this._sceneInstrumentation.captureAnimationsTime = true;

        this._engineInstrumentation = new EngineInstrumentation(scene.getEngine());
        this._engineInstrumentation.captureGPUFrameTime = true;

        this._timerIntervalId = window.setInterval(() => this.forceUpdate(), 500);
    }

    componentWillUnmount() {
        if (this._sceneInstrumentation) {
            this._sceneInstrumentation.dispose();
            this._sceneInstrumentation = null;
        }

        if (this._engineInstrumentation) {
            this._engineInstrumentation.dispose();
            this._engineInstrumentation = null;
        }

        window.clearInterval(this._timerIntervalId);
    }

    render() {
        const scene = this.props.scene;

        if (!scene || !this._sceneInstrumentation || !this._engineInstrumentation) {
            return null;
        }

        const engine = scene.getEngine();
        const sceneInstrumentation = this._sceneInstrumentation;
        const engineInstrumentation = this._engineInstrumentation;
        const caps = engine.getCaps();

        return (
            <div className="pane">
                <TextLineComponent label={getTrans('Version')} value={Engine.Version} color="rgb(113, 159, 255)" />
                <ValueLineComponent label={getTrans('FPS')} value={engine.getFps()} fractionDigits={0} />
                <PerformanceViewerComponent scene={scene} />
                <LineContainerComponent title={getTrans('COUNT')}>
                    <TextLineComponent label={getTrans('Totalmeshes')} value={scene.meshes.length.toString()} />
                    <TextLineComponent label={getTrans('Activemeshes')} value={scene.getActiveMeshes().length.toString()} />
                    <TextLineComponent label={getTrans('Activeindices')} value={scene.getActiveIndices().toString()} />
                    <TextLineComponent label={getTrans('Activefaces')} value={(scene.getActiveIndices() / 3).toString()} />
                    <TextLineComponent label={getTrans('Activebone')} value={scene.getActiveBones().toString()} />
                    <TextLineComponent label={getTrans('Activeparticles')} value={scene.getActiveParticles().toString()} />
                    <TextLineComponent label={getTrans('Drawcalls')} value={sceneInstrumentation.drawCallsCounter.current.toString()} />
                    <TextLineComponent label={getTrans('Totallights')} value={scene.lights.length.toString()} />
                    <TextLineComponent label={getTrans('Totalvertices')} value={scene.getTotalVertices().toString()} />
                    <TextLineComponent label={getTrans('Totalmaterials')} value={scene.materials.length.toString()} />
                    <TextLineComponent label={getTrans('Totaltextures')} value={scene.textures.length.toString()} />
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('FRAMESTEPSDURATION')}>
                    <ValueLineComponent label={getTrans('AbsoluteFPS')} value={1000.0 / this._sceneInstrumentation!.frameTimeCounter.lastSecAverage} fractionDigits={0} />
                    <ValueLineComponent label={getTrans('Meshesselection')} value={sceneInstrumentation.activeMeshesEvaluationTimeCounter.lastSecAverage} units="ms" />
                    <ValueLineComponent label={getTrans('Rendertargets')} value={sceneInstrumentation.renderTargetsRenderTimeCounter.lastSecAverage} units="ms" />
                    <ValueLineComponent label={getTrans('Particles')} value={sceneInstrumentation.particlesRenderTimeCounter.lastSecAverage} units="ms" />
                    <ValueLineComponent label={getTrans('Sprites')} value={sceneInstrumentation.spritesRenderTimeCounter.lastSecAverage} units="ms" />
                    <ValueLineComponent label={getTrans('Animations')} value={sceneInstrumentation.animationsTimeCounter.lastSecAverage} units="ms" />
                    <ValueLineComponent label={getTrans('Physics')} value={sceneInstrumentation.physicsTimeCounter.lastSecAverage} units="ms" />
                    <ValueLineComponent label={getTrans('Render')} value={sceneInstrumentation.renderTimeCounter.lastSecAverage} units="ms" />
                    <ValueLineComponent label={getTrans('Frametotal')} value={sceneInstrumentation.frameTimeCounter.lastSecAverage} units="ms" />
                    <ValueLineComponent label={getTrans('Interframe')} value={sceneInstrumentation.interFrameTimeCounter.lastSecAverage} units="ms" />
                    <ValueLineComponent label={getTrans('GPUFrametime')} value={engineInstrumentation.gpuFrameTimeCounter.lastSecAverage * 0.000001} units="ms" />
                    <ValueLineComponent label={getTrans('GPUFrametimeaverage')} value={engineInstrumentation.gpuFrameTimeCounter.average * 0.000001} units="ms" />
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('SYSTEMINFO')}>
                    <TextLineComponent label={getTrans('Resolution')} value={engine.getRenderWidth() + "x" + engine.getRenderHeight()} />
                    <TextLineComponent label={getTrans('Hardwarescalinglevel')} value={engine.getHardwareScalingLevel().toString()} />
                    <TextLineComponent label={getTrans('Engine')} value={engine.description} />
                    <BooleanLineComponent label={getTrans('Stdderivatives')} value={caps.standardDerivatives} />
                    <BooleanLineComponent label={getTrans('Compressedtextures')} value={caps.s3tc !== undefined} />
                    <BooleanLineComponent label={getTrans('Hardwareinstances')} value={caps.instancedArrays} />
                    <BooleanLineComponent label={getTrans('Texturefloat')} value={caps.textureFloat} />
                    <BooleanLineComponent label={getTrans('Texturehalf_loat')} value={caps.textureHalfFloat} />
                    <BooleanLineComponent label={getTrans('Rendertotexturefloat')} value={caps.textureFloatRender} />
                    <BooleanLineComponent label={getTrans('Rendertotexturehalffloat')} value={caps.textureHalfFloatRender} />
                    <BooleanLineComponent label={getTrans('bitsindices32')} value={caps.uintIndices} />
                    <BooleanLineComponent label={getTrans('Fragmentdepth')} value={caps.fragmentDepthSupported} />
                    <BooleanLineComponent label={getTrans('Highprecisionhaders')} value={caps.highPrecisionShaderSupported} />
                    <BooleanLineComponent label={getTrans('Drawbuffers')} value={caps.drawBuffersExtension} />
                    <BooleanLineComponent label={getTrans('Vertexarrayobject')} value={caps.vertexArrayObject} />
                    <BooleanLineComponent label={getTrans('Timerquery')} value={caps.timerQuery !== undefined} />
                    <BooleanLineComponent label={getTrans('Stencil')} value={engine.isStencilEnable} />
                    <BooleanLineComponent label={getTrans('Parallelshadercompilation')} value={caps.parallelShaderCompile != null} />
                    <ValueLineComponent label={getTrans('Maxtexturesunits')} value={caps.maxTexturesImageUnits} fractionDigits={0} />
                    <ValueLineComponent label={getTrans('Maxtexturessize')} value={caps.maxTextureSize} fractionDigits={0} />
                    <ValueLineComponent label={getTrans('Maxanisotropy')} value={caps.maxAnisotropy} fractionDigits={0} />
                    <TextLineComponent label={getTrans('Driver')} value={engine.getGlInfo().renderer} />
                </LineContainerComponent>
            </div>
        );
    }
}
