import * as React from "react";

import { Observable } from "babylonjs/Misc/observable";
import { PostProcess } from "babylonjs/PostProcesses/postProcess";

import { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import { LockObject } from "../../../../../sharedUiComponents/tabs/propertyGrids/lockObject";
import { CommonPostProcessPropertyGridComponent } from './commonPostProcessPropertyGridComponent';
import { GlobalState } from '../../../../globalState';
import { LineContainerComponent } from '../../../../../sharedUiComponents/lines/lineContainerComponent';
import { ButtonLineComponent } from '../../../../../sharedUiComponents/lines/buttonLineComponent';
import {getTrans} from '../../../../../translationLng';
interface IPostProcessPropertyGridComponentProps {
    globalState: GlobalState;
    postProcess: PostProcess,
    lockObject: LockObject,
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>
}

export class PostProcessPropertyGridComponent extends React.Component<IPostProcessPropertyGridComponentProps> {
    constructor(props: IPostProcessPropertyGridComponentProps) {
        super(props);
    }

    edit() {        
        const postProcess = this.props.postProcess;
        postProcess.nodeMaterialSource!.edit();
    }

    render() {
        const postProcess = this.props.postProcess;

        return (
            <div className="pane">
                <CommonPostProcessPropertyGridComponent globalState={this.props.globalState} lockObject={this.props.lockObject} postProcess={postProcess} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                {
                    postProcess.nodeMaterialSource &&
                    <LineContainerComponent title={getTrans('CONFIGURATION')} selection={this.props.globalState}>
                        <ButtonLineComponent label={getTrans('NodeMaterialEditor')} onClick={() => this.edit()} />
                    </LineContainerComponent>                
                }
            </div>
        );
    }
}