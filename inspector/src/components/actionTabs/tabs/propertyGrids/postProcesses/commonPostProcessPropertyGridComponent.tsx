import * as React from "react";

import { Observable } from "babylonjs/Misc/observable";

import { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import { CheckBoxLineComponent } from "../../../../../sharedUiComponents/lines/checkBoxLineComponent";
import { LineContainerComponent } from "../../../../../sharedUiComponents/lines/lineContainerComponent";
import { TextLineComponent } from "../../../../../sharedUiComponents/lines/textLineComponent";
import { LockObject } from "../../../../../sharedUiComponents/tabs/propertyGrids/lockObject";
import { PostProcess } from 'babylonjs/PostProcesses/postProcess';
import { Color3LineComponent } from '../../../../../sharedUiComponents/lines/color3LineComponent';
import { SliderLineComponent } from '../../../../../sharedUiComponents/lines/sliderLineComponent';
import { GlobalState } from '../../../../globalState';
import { ButtonLineComponent } from '../../../../../sharedUiComponents/lines/buttonLineComponent';
import { TextInputLineComponent } from '../../../../../sharedUiComponents/lines/textInputLineComponent';
import {getTrans} from '../../../../../translationLng';
interface ICommonPostProcessPropertyGridComponentProps {
    globalState: GlobalState;
    postProcess: PostProcess;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}

export class CommonPostProcessPropertyGridComponent extends React.Component<ICommonPostProcessPropertyGridComponentProps> {
    constructor(props: ICommonPostProcessPropertyGridComponentProps) {
        super(props);
    }

    render() {
        const postProcess = this.props.postProcess;

        return (
            <div>
                <LineContainerComponent title={getTrans('GENERAL')}selection={this.props.globalState}>
                    <TextLineComponent label={getTrans('Class')} value={postProcess.getClassName()} />
                    <TextInputLineComponent lockObject={this.props.lockObject} label={getTrans('Name')} target={postProcess} propertyName="name" onPropertyChangedObservable={this.props.onPropertyChangedObservable}/>
                    {
                        postProcess.width &&
                        <TextLineComponent label={getTrans('Width')} value={postProcess.width.toString()} />
                    }
                    {
                        postProcess.height &&
                        <TextLineComponent label={getTrans('Height')} value={postProcess.height.toString()} />
                    }
                    <CheckBoxLineComponent label={getTrans('Autoclear')} target={postProcess} propertyName="autoClear" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    {
                        postProcess.clearColor &&
                        <Color3LineComponent label={getTrans('Clearcolor')} target={postProcess} propertyName="clearColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    <CheckBoxLineComponent label={getTrans('Pixelperfect')} target={postProcess} propertyName="enablePixelPerfectMode" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('Fullscreenviewport')} target={postProcess} propertyName="forceFullscreenViewport" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label={getTrans('Samples')} target={postProcess} propertyName="samples" minimum={1} maximum={8} step={1} decimalCount={0} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <ButtonLineComponent label={getTrans('Dispose')} onClick={() => {
                        postProcess.dispose();
                        this.props.globalState.onSelectionChangedObservable.notifyObservers(null);
                    }} />                      
                </LineContainerComponent>
            </div>
        );
    }
}