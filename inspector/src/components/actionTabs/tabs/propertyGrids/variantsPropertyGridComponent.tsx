import * as React from "react";

import { Observable } from "babylonjs/Misc/observable";
import { Nullable } from 'babylonjs/types';

import { PropertyChangedEvent } from "../../../propertyChangedEvent";
import { LineContainerComponent } from "../../../../sharedUiComponents/lines/lineContainerComponent";
import { LockObject } from "../../../../sharedUiComponents/tabs/propertyGrids/lockObject";
import { GlobalState } from "../../../globalState";
import { OptionsLineComponent } from '../../../../sharedUiComponents/lines/optionsLineComponent';
import {getTrans} from '../../../../translationLng';

declare type KHR_materials_variants = import("babylonjs-loaders/glTF/2.0/Extensions/KHR_materials_variants").KHR_materials_variants;

interface IVariantsPropertyGridComponentProps {
    globalState: GlobalState;
    host: any;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}

export class VariantsPropertyGridComponent extends React.Component<IVariantsPropertyGridComponentProps> {

    constructor(props: IVariantsPropertyGridComponentProps) {
        super(props);
    }

    private _getVariantsExtension(): Nullable<KHR_materials_variants> {
        return this.props.globalState?.glTFLoaderExtensions["KHR_materials_variants"] as KHR_materials_variants;
    }

    render() {
        const extension = this._getVariantsExtension();
        if (!extension) {
            return null;
        }
        let variants: string[] = extension.getAvailableVariants(this.props.host);

        if (!variants || variants.length === 0) {
            return null;
        }

        let options = variants.sort().map((v: string, i: number) =>  {
            return {label: v, value: i + 1}
        });

        options.splice(0, 0, {label: getTrans('Original'), value: 0})

        return (
            <div>
                <LineContainerComponent title={getTrans('VARIANTS')} selection={this.props.globalState}>             
                <OptionsLineComponent
                    label={getTrans('Activevariant')} options={options} noDirectUpdate={true}
                    target={this.props.host}
                    propertyName=""
                    onSelect={(value: number) => {
                        if (value === 0) {
                            extension.reset(this.props.host);
                        } else {
                            extension.selectVariant(this.props.host, variants[value - 1]);
                        }
                        this.forceUpdate();
                    }}
                    extractValue={() => {
                        let lastPickedVariant = extension.getLastSelectedVariant(this.props.host) || 0;
                        let index = 0;
                        if (lastPickedVariant && Object.prototype.toString.call(lastPickedVariant) === '[object String]') {
                            index = variants.indexOf(lastPickedVariant as string);
                            if (index > -1) {
                                index = index + 1;
                            }
                        }

                        return index;
                    }}
                />
                </LineContainerComponent>
            </div>
        );
    }
}