import * as React from "react";

import { Observable } from "babylonjs/Misc/observable";

import { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import { LineContainerComponent } from "../../../../../sharedUiComponents/lines/lineContainerComponent";
import { TextLineComponent } from "../../../../../sharedUiComponents/lines/textLineComponent";
import { LockObject } from "../../../../../sharedUiComponents/tabs/propertyGrids/lockObject";
import { PostProcessRenderPipeline } from 'babylonjs/PostProcesses/RenderPipeline/postProcessRenderPipeline';
import { GlobalState } from '../../../../globalState';
import { SliderLineComponent } from '../../../../../sharedUiComponents/lines/sliderLineComponent';
import {getTrans} from '../../../../../translationLng';
interface ICommonRenderingPipelinePropertyGridComponentProps {
    globalState: GlobalState;
    renderPipeline: PostProcessRenderPipeline;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}

export class CommonRenderingPipelinePropertyGridComponent extends React.Component<ICommonRenderingPipelinePropertyGridComponentProps> {
    constructor(props: ICommonRenderingPipelinePropertyGridComponentProps) {
        super(props);
    }

    render() {
        const renderPipeline = this.props.renderPipeline;
        const renderPipelineAsAny = renderPipeline as any;

        return (
            <div>
                <LineContainerComponent title={getTrans('GENERAL')} selection={this.props.globalState}>
                    <TextLineComponent label={getTrans('Name')} value={renderPipeline.name} />
                    <TextLineComponent label={getTrans('Class')} value={renderPipeline.getClassName()} />
                    {
                        renderPipelineAsAny.samples !== undefined &&
                        <SliderLineComponent label={getTrans('Samples')} minimum={1} maximum={8} step={1} decimalCount={0} target={renderPipeline} propertyName="samples" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                </LineContainerComponent>
            </div>
        );
    }
}