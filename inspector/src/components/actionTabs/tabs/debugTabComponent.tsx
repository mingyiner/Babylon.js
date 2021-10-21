import * as React from "react";
import { PaneComponent, IPaneComponentProps } from "../paneComponent";
import { LineContainerComponent } from "../../../sharedUiComponents/lines/lineContainerComponent";
import { CheckBoxLineComponent } from "../../../sharedUiComponents/lines/checkBoxLineComponent";
import { RenderGridPropertyGridComponent } from "./propertyGrids/renderGridPropertyGridComponent";

import { PhysicsViewer } from "babylonjs/Debug/physicsViewer";
import { StandardMaterial } from "babylonjs/Materials/standardMaterial";
import { Mesh } from 'babylonjs/Meshes/mesh';
import {getTrans} from '../../../translationLng';
export class DebugTabComponent extends PaneComponent {
    private _physicsViewersEnabled = false;

    constructor(props: IPaneComponentProps) {
        super(props);

        const scene = this.props.scene;

        if (!scene) {
            return;
        }

        if (!scene.reservedDataStore) {
            scene.reservedDataStore = {};
        }

        this._physicsViewersEnabled = scene.reservedDataStore.physicsViewer != null;
    }

    switchPhysicsViewers() {
        this._physicsViewersEnabled = !this._physicsViewersEnabled;
        const scene = this.props.scene;

        if (this._physicsViewersEnabled) {
            const physicsViewer = new PhysicsViewer(scene);
            scene.reservedDataStore.physicsViewer = physicsViewer;

            for (var mesh of scene.meshes) {
                if (mesh.physicsImpostor) {
                    let debugMesh = physicsViewer.showImpostor(mesh.physicsImpostor, mesh as Mesh);

                    if (debugMesh) {
                        debugMesh.reservedDataStore = { hidden: true };
                        debugMesh.material!.reservedDataStore = { hidden: true };
                    }
                }
            }
        } else {
            scene.reservedDataStore.physicsViewer.dispose();
            scene.reservedDataStore.physicsViewer = null;
        }
    }

    render() {
        const scene = this.props.scene;

        if (!scene) {
            return null;
        }

        return (
            <div className="pane">
                <LineContainerComponent title={getTrans('HELPERS')} selection={this.props.globalState}>
                    <RenderGridPropertyGridComponent globalState={this.props.globalState} scene={scene} />
                    <CheckBoxLineComponent label={getTrans('Physics')} isSelected={() => this._physicsViewersEnabled} onSelect={() => this.switchPhysicsViewers()} />
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('CORETEXTURECHANNELS')} selection={this.props.globalState}>
                    <CheckBoxLineComponent label={getTrans('Diffuse')} isSelected={() => StandardMaterial.DiffuseTextureEnabled} onSelect={() => StandardMaterial.DiffuseTextureEnabled = !StandardMaterial.DiffuseTextureEnabled} />
                    <CheckBoxLineComponent label={getTrans('Ambient_')} isSelected={() => StandardMaterial.AmbientTextureEnabled} onSelect={() => StandardMaterial.AmbientTextureEnabled = !StandardMaterial.AmbientTextureEnabled} />
                    <CheckBoxLineComponent label={getTrans('Specular')} isSelected={() => StandardMaterial.SpecularTextureEnabled} onSelect={() => StandardMaterial.SpecularTextureEnabled = !StandardMaterial.SpecularTextureEnabled} />
                    <CheckBoxLineComponent label={getTrans('Emissive_')} isSelected={() => StandardMaterial.EmissiveTextureEnabled} onSelect={() => StandardMaterial.EmissiveTextureEnabled = !StandardMaterial.EmissiveTextureEnabled} />
                    <CheckBoxLineComponent label={getTrans('Bump')} isSelected={() => StandardMaterial.BumpTextureEnabled} onSelect={() => StandardMaterial.BumpTextureEnabled = !StandardMaterial.BumpTextureEnabled} />
                    <CheckBoxLineComponent label={getTrans('Opacity')} isSelected={() => StandardMaterial.OpacityTextureEnabled} onSelect={() => StandardMaterial.OpacityTextureEnabled = !StandardMaterial.OpacityTextureEnabled} />
                    <CheckBoxLineComponent label={getTrans('Reflection')} isSelected={() => StandardMaterial.ReflectionTextureEnabled} onSelect={() => StandardMaterial.ReflectionTextureEnabled = !StandardMaterial.ReflectionTextureEnabled} />
                    <CheckBoxLineComponent label={getTrans('Refraction')} isSelected={() => StandardMaterial.RefractionTextureEnabled} onSelect={() => StandardMaterial.RefractionTextureEnabled = !StandardMaterial.RefractionTextureEnabled} />
                    <CheckBoxLineComponent label={getTrans('ColorGrading')} isSelected={() => StandardMaterial.ColorGradingTextureEnabled} onSelect={() => StandardMaterial.ColorGradingTextureEnabled = !StandardMaterial.ColorGradingTextureEnabled} />
                    <CheckBoxLineComponent label={getTrans('Lightmap')} isSelected={() => StandardMaterial.LightmapTextureEnabled} onSelect={() => StandardMaterial.LightmapTextureEnabled = !StandardMaterial.LightmapTextureEnabled} />
                    <CheckBoxLineComponent label={getTrans('Fresnel')} isSelected={() => StandardMaterial.FresnelEnabled} onSelect={() => StandardMaterial.FresnelEnabled = !StandardMaterial.FresnelEnabled} />
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('FEATURES')} selection={this.props.globalState}>
                    <CheckBoxLineComponent label={getTrans('Animations')} isSelected={() => scene.animationsEnabled} onSelect={() => scene.animationsEnabled = !scene.animationsEnabled} />
                    <CheckBoxLineComponent label={getTrans('Physics')} isSelected={() => scene.physicsEnabled} onSelect={() => scene.physicsEnabled = !scene.physicsEnabled} />
                    <CheckBoxLineComponent label={getTrans('Collisions')} isSelected={() => scene.collisionsEnabled} onSelect={() => scene.collisionsEnabled = !scene.collisionsEnabled} />
                    <CheckBoxLineComponent label={getTrans('Fog')}isSelected={() => scene.fogEnabled} onSelect={() => scene.fogEnabled = !scene.fogEnabled} />
                    <CheckBoxLineComponent label={getTrans('Lensflares')} isSelected={() => scene.lensFlaresEnabled} onSelect={() => scene.lensFlaresEnabled = !scene.lensFlaresEnabled} />
                    <CheckBoxLineComponent label={getTrans('Lights')} isSelected={() => scene.lightsEnabled} onSelect={() => scene.lightsEnabled = !scene.lightsEnabled} />
                    <CheckBoxLineComponent label={getTrans('Particles')} isSelected={() => scene.particlesEnabled} onSelect={() => scene.particlesEnabled = !scene.particlesEnabled} />
                    <CheckBoxLineComponent label={getTrans('Post_processes')} isSelected={() => scene.postProcessesEnabled} onSelect={() => scene.postProcessesEnabled = !scene.postProcessesEnabled} />
                    <CheckBoxLineComponent label={getTrans('Probes')} isSelected={() => scene.probesEnabled} onSelect={() => scene.probesEnabled = !scene.probesEnabled} />
                    <CheckBoxLineComponent label={getTrans('Textures')} isSelected={() => scene.texturesEnabled} onSelect={() => scene.texturesEnabled = !scene.texturesEnabled} />
                    <CheckBoxLineComponent label={getTrans('Proceduraltextures')} isSelected={() => scene.proceduralTexturesEnabled} onSelect={() => scene.proceduralTexturesEnabled = !scene.proceduralTexturesEnabled} />
                    <CheckBoxLineComponent label={getTrans('Rendertargets')} isSelected={() => scene.renderTargetsEnabled} onSelect={() => scene.renderTargetsEnabled = !scene.renderTargetsEnabled} />
                    <CheckBoxLineComponent label={getTrans('Shadows')} isSelected={() => scene.shadowsEnabled} onSelect={() => scene.shadowsEnabled = !scene.shadowsEnabled} />
                    <CheckBoxLineComponent label={getTrans('Skeletons')} isSelected={() => scene.skeletonsEnabled} onSelect={() => scene.skeletonsEnabled = !scene.skeletonsEnabled} />
                    <CheckBoxLineComponent label={getTrans('Sprites')} isSelected={() => scene.spritesEnabled} onSelect={() => scene.spritesEnabled = !scene.spritesEnabled} />
                </LineContainerComponent>
            </div>
        );
    }
}
