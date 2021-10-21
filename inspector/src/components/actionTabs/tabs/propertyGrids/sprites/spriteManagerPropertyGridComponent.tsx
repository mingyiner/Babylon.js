import * as React from "react";

import { Observable } from "babylonjs/Misc/observable";

import { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import { LockObject } from "../../../../../sharedUiComponents/tabs/propertyGrids/lockObject";
import { LineContainerComponent } from '../../../../../sharedUiComponents/lines/lineContainerComponent';
import { GlobalState } from '../../../../globalState';
import { SpriteManager } from 'babylonjs/Sprites/spriteManager';
import { TextInputLineComponent } from '../../../../../sharedUiComponents/lines/textInputLineComponent';
import { TextLineComponent } from '../../../../../sharedUiComponents/lines/textLineComponent';
import { CheckBoxLineComponent } from '../../../../../sharedUiComponents/lines/checkBoxLineComponent';
import { FloatLineComponent } from '../../../../../sharedUiComponents/lines/floatLineComponent';
import { SliderLineComponent } from '../../../../../sharedUiComponents/lines/sliderLineComponent';
import { RenderingManager } from 'babylonjs/Rendering/renderingManager';
import { TextureLinkLineComponent } from '../../../lines/textureLinkLineComponent';
import { ButtonLineComponent } from '../../../../../sharedUiComponents/lines/buttonLineComponent';
import { Sprite } from 'babylonjs/Sprites/sprite';
import { Tools } from 'babylonjs/Misc/tools';
import { FileButtonLineComponent } from '../../../../../sharedUiComponents/lines/fileButtonLineComponent';
import { Constants } from 'babylonjs/Engines/constants';
import { OptionsLineComponent } from '../../../../../sharedUiComponents/lines/optionsLineComponent';
import {getTrans} from '../../../../../translationLng';
interface ISpriteManagerPropertyGridComponentProps {
    globalState: GlobalState;
    spriteManager: SpriteManager;
    lockObject: LockObject;
    onSelectionChangedObservable?: Observable<any>;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>
}

export class SpriteManagerPropertyGridComponent extends React.Component<ISpriteManagerPropertyGridComponentProps> {
    private _snippetUrl = "https://snippet.babylonjs.com";


    constructor(props: ISpriteManagerPropertyGridComponentProps) {
        super(props);
    }

    addNewSprite() {
        const spriteManager = this.props.spriteManager;
        var newSprite = new Sprite("new sprite", spriteManager);

        this.props.onSelectionChangedObservable?.notifyObservers(newSprite);
    }

    disposeManager() {
        const spriteManager = this.props.spriteManager;
        spriteManager.dispose();

        this.props.onSelectionChangedObservable?.notifyObservers(null);
    }

    saveToFile() {
        const spriteManager = this.props.spriteManager;
        let content = JSON.stringify(spriteManager.serialize(true));

        Tools.Download(new Blob([content]), "spriteManager.json");
    }

    loadFromFile(file: File) {
        const spriteManager = this.props.spriteManager;
        const scene = spriteManager.scene;

        Tools.ReadFile(file, (data) => {
            let decoder = new TextDecoder("utf-8");
            let jsonObject = JSON.parse(decoder.decode(data));

            spriteManager.dispose();
            this.props.globalState.onSelectionChangedObservable.notifyObservers(null);

            let newManager = SpriteManager.Parse(jsonObject, scene, "");
            this.props.globalState.onSelectionChangedObservable.notifyObservers(newManager);
        }, undefined, true);
    }

    loadFromSnippet() {
        const spriteManager = this.props.spriteManager;
        const scene = spriteManager.scene;

        let snippedId = window.prompt("Please enter the snippet ID to use");

        if (!snippedId) {
            return;
        }

        spriteManager.dispose();
        this.props.globalState.onSelectionChangedObservable.notifyObservers(null);

        SpriteManager.CreateFromSnippetAsync(snippedId, scene).then((newManager) => {
            this.props.globalState.onSelectionChangedObservable.notifyObservers(newManager);
        }).catch(err => {
            alert("Unable to load your sprite manager: " + err);
        });
    }

    saveToSnippet() {
        const spriteManager = this.props.spriteManager;
        let content = JSON.stringify(spriteManager.serialize(true));

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    var snippet = JSON.parse(xmlHttp.responseText);
                    const oldId = spriteManager.snippetId || "_BLANK";
                    spriteManager.snippetId = snippet.id;
                    if (snippet.version && snippet.version != "0") {
                        spriteManager.snippetId += "#" + snippet.version;
                    }
                    this.forceUpdate();
                    if (navigator.clipboard) {
                        navigator.clipboard.writeText(spriteManager.snippetId);
                    }

                    let windowAsAny = window as any;

                    if (windowAsAny.Playground && oldId) {
                        windowAsAny.Playground.onRequestCodeChangeObservable.notifyObservers({
                            regex: new RegExp(`SpriteManager.CreateFromSnippetAsync\\("${oldId}`, "g"),
                            replace: `SpriteManager.CreateFromSnippetAsync("${spriteManager.snippetId}`
                        });
                    }

                    alert("Sprite manager saved with ID: " + spriteManager.snippetId + " (please note that the id was also saved to your clipboard)");
                }
                else {
                    alert("Unable to save your sprite manager");
                }
            }
        }

        xmlHttp.open("POST", this._snippetUrl + (spriteManager.snippetId ? "/" + spriteManager.snippetId : ""), true);
        xmlHttp.setRequestHeader("Content-Type", "application/json");

        var dataToSend = {
            payload : JSON.stringify({
                spriteManager: content
            }),
            name: "",
            description: "",
            tags: ""
        };

        xmlHttp.send(JSON.stringify(dataToSend));
    }

    render() {
        const spriteManager = this.props.spriteManager;

        var alphaModeOptions = [
            { label: getTrans('Combine'), value: Constants.ALPHA_COMBINE },
            { label: getTrans('Oneone'), value: Constants.ALPHA_ONEONE },
            { label: getTrans('Add'), value: Constants.ALPHA_ADD },
            { label: getTrans('Subtract'), value: Constants.ALPHA_SUBTRACT },
            { label: getTrans('Multiply_'), value: Constants.ALPHA_MULTIPLY },
            { label: getTrans('Maximized'), value: Constants.ALPHA_MAXIMIZED },
            { label: getTrans('Premultiplied'), value: Constants.ALPHA_PREMULTIPLIED },
        ];

        return (
            <div className="pane">
                <LineContainerComponent title={getTrans('GENERAL')} selection={this.props.globalState}>
                    <TextInputLineComponent lockObject={this.props.lockObject} label={getTrans('Name')}target={spriteManager} propertyName="name" onPropertyChangedObservable={this.props.onPropertyChangedObservable}/>
                    <TextLineComponent label={getTrans('UniqueID')} value={spriteManager.uniqueId.toString()} />
                    <TextLineComponent label={getTrans('Capacity')} value={spriteManager.capacity.toString()} />
                    <TextureLinkLineComponent label={getTrans('Texture')} texture={spriteManager.texture} onSelectionChangedObservable={this.props.onSelectionChangedObservable}/>
                    {
                        spriteManager.sprites.length < spriteManager.capacity &&
                        <ButtonLineComponent label={getTrans('Addnewsprite')} onClick={() => this.addNewSprite()} />
                    }
                    <ButtonLineComponent label={getTrans('Dispose')} onClick={() => this.disposeManager()} />
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('FILE')} selection={this.props.globalState}>
                    <FileButtonLineComponent label={getTrans('Load')} onClick={(file) => this.loadFromFile(file)} accept=".json" />
                    <ButtonLineComponent label={getTrans('Save')} onClick={() => this.saveToFile()} />
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('SNIPPET')} selection={this.props.globalState}>
                    {
                        spriteManager.snippetId &&
                        <TextLineComponent label={getTrans('SnippetID')} value={spriteManager.snippetId} />
                    }
                    <ButtonLineComponent label={getTrans('Loadfromsnippetserver')} onClick={() => this.loadFromSnippet()} />
                    <ButtonLineComponent label={getTrans('Savetosnippetserver')} onClick={() => this.saveToSnippet()} />
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('PROPERTIES')} selection={this.props.globalState}>
                    <CheckBoxLineComponent label={getTrans('Pickable')} target={spriteManager} propertyName="isPickable" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('Fogenabled')} target={spriteManager} propertyName="fogEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label={getTrans('Nodepthwrite')} target={spriteManager} propertyName="disableDepthWrite" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label={getTrans('RenderinggroupID')} decimalCount={0} target={spriteManager} propertyName="renderingGroupId" minimum={RenderingManager.MIN_RENDERINGGROUPS} maximum={RenderingManager.MAX_RENDERINGGROUPS - 1} step={1} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <OptionsLineComponent label={getTrans('Alphamode')} options={alphaModeOptions} target={spriteManager} propertyName="blendMode"
                        onPropertyChangedObservable={this.props.onPropertyChangedObservable}
                        onSelect={(value) => this.setState({ blendMode: value })} />
                </LineContainerComponent>
                <LineContainerComponent title={getTrans('CELLS')} selection={this.props.globalState}>
                    <FloatLineComponent label={getTrans('Cellwidth')} isInteger={true} target={spriteManager} propertyName="cellWidth" min={0} onPropertyChangedObservable={this.props.onPropertyChangedObservable}/>
                    <FloatLineComponent label={getTrans('Cellheight')} isInteger={true} target={spriteManager} propertyName="cellHeight" min={0} onPropertyChangedObservable={this.props.onPropertyChangedObservable}/>
                </LineContainerComponent>
            </div>
        );
    }
}