import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { HemisphericLight } from "babylonjs/Lights/hemisphericLight";
import { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import { CommonLightPropertyGridComponent } from "./commonLightPropertyGridComponent";
import { LineContainerComponent } from "../../../../../sharedUiComponents/lines/lineContainerComponent";
import { Color3LineComponent } from "../../../../../sharedUiComponents/lines/color3LineComponent";
import { Vector3LineComponent } from "../../../../../sharedUiComponents/lines/vector3LineComponent";
import { LockObject } from "../../../../../sharedUiComponents/tabs/propertyGrids/lockObject";
import { GlobalState } from '../../../../globalState';
import {getTrans} from '../../../../../translationLng';
interface IHemisphericLightPropertyGridComponentProps {
    globalState: GlobalState,
    light: HemisphericLight,
    lockObject: LockObject,
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>
}

export class HemisphericLightPropertyGridComponent extends React.Component<IHemisphericLightPropertyGridComponentProps> {
    constructor(props: IHemisphericLightPropertyGridComponentProps) {
        super(props);
    }

    render() {
        const light = this.props.light;

        return (
            <div className="pane">
                <CommonLightPropertyGridComponent globalState={this.props.globalState} lockObject={this.props.lockObject} light={light} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                <LineContainerComponent title={getTrans('SETUP')}selection={this.props.globalState}>
                    <Color3LineComponent label={getTrans('Diffuse')} target={light} propertyName="diffuse" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <Color3LineComponent label={getTrans('Ground')} target={light} propertyName="groundColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <Vector3LineComponent label={getTrans('Direction')} target={light} propertyName="direction" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
            </div>
        );
    }
}