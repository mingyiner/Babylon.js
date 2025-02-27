import * as React from "react";
import { ButtonLineComponent } from "../../../../../../sharedUiComponents/lines/buttonLineComponent";
import { GlobalState } from "../../../../../globalState";
import { PopupComponent } from "../../../../../popupComponent";
import { BottomBarComponent } from "./bottomBar/bottomBarComponent";
import { Context } from "./context";
import { TopBarComponent } from "./topBarComponent";
import { CanvasComponent } from "./graph/canvasComponent";
import { SideBarComponent } from "./sideBar/sideBarComponent";
import { Animation } from "babylonjs/Animations/animation";
import { TargetedAnimation } from "babylonjs/Animations/animationGroup";
import {getTrans} from '../../../../../../translationLng';
require("./scss/curveEditor.scss");

interface IAnimationCurveEditorComponentProps {
    globalState: GlobalState;
    context: Context;
}

interface IAnimationCurveEditorComponentState {
    isOpen: boolean;
}

export class AnimationCurveEditorComponent extends React.Component<
    IAnimationCurveEditorComponentProps,
    IAnimationCurveEditorComponentState
> {

    constructor(props: IAnimationCurveEditorComponentProps) {
        super(props);

        this.state = { isOpen: false };
    }

    onCloseAnimationCurveEditor(window: Window | null) {
        if (window !== null) {
            window.close();
        }
        this.setState({isOpen: false});
        this.props.context.activeAnimations = [];
        this.props.context.onActiveAnimationChanged.notifyObservers();
    }

    shouldComponentUpdate(newProps: IAnimationCurveEditorComponentProps, newState: IAnimationCurveEditorComponentState) {               
        if (newState.isOpen !== this.state.isOpen) {

            if (newState.isOpen) {
                this.props.context.prepare();
                if (this.props.context.animations && this.props.context.animations.length) {
                    setTimeout(() => {
                        this.props.context.activeAnimations.push(this.props.context.useTargetAnimations ? (this.props.context.animations![0] as TargetedAnimation).animation : this.props.context.animations![0] as Animation);
                        this.props.context.onActiveAnimationChanged.notifyObservers();    
                    });
                }
            }

            return true;
        }

        return false;
    }
    private _onKeyDown(evt: KeyboardEvent) {
        switch (evt.key) {
            case "Delete":
                if (this.props.context.activeKeyPoints?.length) {
                    this.props.context.onDeleteKeyActiveKeyPoints.notifyObservers();
                }
                break;
            case " ":
                if (this.props.context.isPlaying) {
                    this.props.context.stop();
                } else {
                    this.props.context.play(true);
                }
                break;
            case "a":
                if (evt.ctrlKey) {
                    this.props.context.onSelectAllKeys.notifyObservers();                    
                    this.props.context.onActiveKeyPointChanged.notifyObservers();
                    evt.preventDefault();
                }
                break;
        }
    }

    public render() {
        return (
            <>
                <ButtonLineComponent label={getTrans('Edit')} onClick={() => {
                    this.setState({isOpen: true});
                }} />
                {
                    this.state.isOpen &&
                    <PopupComponent
                        id="curve-editor"
                        title={getTrans('AnimationCurveEditor')}
                        size={{ width: 1024, height: 512 }}
                        onResize={() => this.props.context.onHostWindowResized.notifyObservers()}
                        onClose={(window: Window) => this.onCloseAnimationCurveEditor(window)}
                        onKeyDown={evt => this._onKeyDown(evt)}
                    >
                        <div id="curve-editor">
                            <TopBarComponent globalState={this.props.globalState} context={this.props.context}/>
                            <SideBarComponent globalState={this.props.globalState} context={this.props.context}/>
                            <CanvasComponent globalState={this.props.globalState} context={this.props.context}/>
                            <BottomBarComponent globalState={this.props.globalState} context={this.props.context}/>
                        </div>
                    </PopupComponent>
        }
            </>
        );
    }

}