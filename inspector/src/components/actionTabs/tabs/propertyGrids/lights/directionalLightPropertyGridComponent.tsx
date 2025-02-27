import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { DirectionalLight } from "babylonjs/Lights/directionalLight";
import { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import { CommonLightPropertyGridComponent } from "./commonLightPropertyGridComponent";
import { LineContainerComponent } from "../../../../../sharedUiComponents/lines/lineContainerComponent";
import { Color3LineComponent } from "../../../../../sharedUiComponents/lines/color3LineComponent";
import { Vector3LineComponent } from "../../../../../sharedUiComponents/lines/vector3LineComponent";
import { CommonShadowLightPropertyGridComponent } from "./commonShadowLightPropertyGridComponent";
import { LockObject } from "../../../../../sharedUiComponents/tabs/propertyGrids/lockObject";
import { GlobalState } from "../../../../globalState";
import { CheckBoxLineComponent } from "../../../../../sharedUiComponents/lines/checkBoxLineComponent"
import { ShadowGenerator } from "babylonjs/Lights/Shadows/shadowGenerator";
import { CascadedShadowGenerator } from "babylonjs/Lights/Shadows/cascadedShadowGenerator";
import { DirectionalLightFrustumViewer } from "babylonjs/Debug/directionalLightFrustumViewer";
import {getTrans} from '../../../../../translationLng';
interface IDirectionalLightPropertyGridComponentProps {
    globalState: GlobalState,
    light: DirectionalLight,
    lockObject: LockObject,
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>
}

export class DirectionalLightPropertyGridComponent extends React.Component<IDirectionalLightPropertyGridComponentProps> {
    constructor(props: IDirectionalLightPropertyGridComponentProps) {
        super(props);
    }

    displayFrustum() {
        const light = this.props.light;
        const camera = light.getScene().activeCamera;

        let displayFrustum = (light as any)._displayFrustum = !(!!(light as any)._displayFrustum);

        if ((light as any)._displayFrustumObservable) {
            light.getScene().onAfterRenderObservable.remove((light as any)._displayFrustumObservable);
            (light as any)._displayFrustumDLH.dispose();
        }

        if (displayFrustum && camera) {
            const dlh = (light as any)._displayFrustumDLH = new DirectionalLightFrustumViewer(light, camera);
            (light as any)._displayFrustumObservable = light.getScene().onAfterRenderObservable.add(() => {
                dlh.update();
            });
        }
    }

    render() {
        const light = this.props.light;

        const generator = light.getShadowGenerator() as (ShadowGenerator | CascadedShadowGenerator) || null;

        const hideAutoCalcShadowZBounds = generator instanceof CascadedShadowGenerator;
        const displayFrustum = (light as any)._displayFrustum ?? false;;

        return (
            <div className="pane">
                <CommonLightPropertyGridComponent globalState={this.props.globalState} lockObject={this.props.lockObject} light={light} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                <LineContainerComponent title={getTrans('SETUP')} selection={this.props.globalState}>
                    <Color3LineComponent label={getTrans('Diffuse')} target={light} propertyName="diffuse" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <Color3LineComponent label={getTrans('Specular')} target={light} propertyName="specular" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <Vector3LineComponent label={getTrans('Position')} target={light} propertyName="position" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <Vector3LineComponent label={getTrans('Direction')} target={light} propertyName="direction" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    { !hideAutoCalcShadowZBounds &&
                        <CheckBoxLineComponent label={getTrans('AutoCalcShadowZBounds')} target={light} propertyName="autoCalcShadowZBounds" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                </LineContainerComponent>
                <CommonShadowLightPropertyGridComponent globalState={this.props.globalState} lockObject={this.props.lockObject} light={light} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                <LineContainerComponent title={getTrans('DEBUG')} closed={true} selection={this.props.globalState}>
                    <CheckBoxLineComponent label={getTrans('Displayfrustum')} isSelected={() => displayFrustum} onSelect={() => this.displayFrustum()} />
                </LineContainerComponent>
            </div>
        );
    }
}