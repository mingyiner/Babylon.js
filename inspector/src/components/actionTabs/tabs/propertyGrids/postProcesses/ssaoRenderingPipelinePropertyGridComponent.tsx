import * as React from "react";

import { Observable } from "babylonjs/Misc/observable";

import { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import { LockObject } from "../../../../../sharedUiComponents/tabs/propertyGrids/lockObject";
import { CommonRenderingPipelinePropertyGridComponent } from './commonRenderingPipelinePropertyGridComponent';
import { SliderLineComponent } from '../../../../../sharedUiComponents/lines/sliderLineComponent';
import { LineContainerComponent } from '../../../../../sharedUiComponents/lines/lineContainerComponent';
import { SSAORenderingPipeline } from 'babylonjs/PostProcesses/RenderPipeline/Pipelines/ssaoRenderingPipeline';
import { GlobalState } from '../../../../globalState';
import {getTrans} from '../../../../../translationLng';
interface ISSAORenderingPipelinePropertyGridComponentProps {
    globalState: GlobalState;
    renderPipeline: SSAORenderingPipeline,
    lockObject: LockObject,
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>
}

export class SSAORenderingPipelinePropertyGridComponent extends React.Component<ISSAORenderingPipelinePropertyGridComponentProps> {
    constructor(props: ISSAORenderingPipelinePropertyGridComponentProps) {
        super(props);
    }

    render() {
        const renderPipeline = this.props.renderPipeline;

        return (
            <div className="pane">
                <CommonRenderingPipelinePropertyGridComponent globalState={this.props.globalState} lockObject={this.props.lockObject} renderPipeline={renderPipeline} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                <LineContainerComponent title={getTrans('SSAO')} selection={this.props.globalState}>
                    <SliderLineComponent label={getTrans('Strength')} minimum={0} maximum={2} step={0.05} target={renderPipeline} propertyName="totalStrength" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label={getTrans('Base')} minimum={0} maximum={1} step={0.05} target={renderPipeline} propertyName="base" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label={getTrans('Radius_')} minimum={0.0001} maximum={0.001} step={0.0001} target={renderPipeline} propertyName="radius" onPropertyChangedObservable={this.props.onPropertyChangedObservable} decimalCount={4} />
                    <SliderLineComponent label={getTrans('Area')} minimum={0.0001} maximum={0.01} step={0.0001} target={renderPipeline} propertyName="area" onPropertyChangedObservable={this.props.onPropertyChangedObservable} decimalCount={4} />
                    <SliderLineComponent label={getTrans('Falloff')} minimum={0} maximum={0.00001} step={0.000001} target={renderPipeline} propertyName="fallOff" onPropertyChangedObservable={this.props.onPropertyChangedObservable} decimalCount={6} />
                </LineContainerComponent>
            </div>
        );
    }
}