import { DoCheck, ElementRef, IterableDiffers, KeyValueDiffers, OnChanges, OnDestroy, Renderer2, SimpleChanges } from '@angular/core';
import { NgClass } from '@angular/common';
import { BaseFxDirective } from '../core/base';
import { BaseFxDirectiveAdapter } from '../core/base-adapter';
import { MediaMonitor } from '../../media-query/media-monitor';
export declare type NgClassType = string | string[] | Set<string> | {
    [klass: string]: any;
};
export declare class ClassDirective extends BaseFxDirective implements DoCheck, OnChanges, OnDestroy {
    protected monitor: MediaMonitor;
    private _ngClassInstance;
    ngClassBase: NgClassType;
    ngClassXs: NgClassType;
    ngClassSm: NgClassType;
    ngClassMd: NgClassType;
    ngClassLg: NgClassType;
    ngClassXl: NgClassType;
    ngClassLtSm: NgClassType;
    ngClassLtMd: NgClassType;
    ngClassLtLg: NgClassType;
    ngClassLtXl: NgClassType;
    ngClassGtXs: NgClassType;
    ngClassGtSm: NgClassType;
    ngClassGtMd: NgClassType;
    ngClassGtLg: NgClassType;
    classXs: NgClassType;
    classSm: NgClassType;
    classMd: NgClassType;
    classLg: NgClassType;
    classXl: NgClassType;
    classLtSm: NgClassType;
    classLtMd: NgClassType;
    classLtLg: NgClassType;
    classLtXl: NgClassType;
    classGtXs: NgClassType;
    classGtSm: NgClassType;
    classGtMd: NgClassType;
    classGtLg: NgClassType;
    constructor(monitor: MediaMonitor, _ngEl: ElementRef, _renderer: Renderer2, _iterableDiffers: IterableDiffers, _keyValueDiffers: KeyValueDiffers, _ngClassInstance: NgClass);
    ngOnChanges(changes: SimpleChanges): void;
    ngDoCheck(): void;
    ngOnDestroy(): void;
    protected _configureMQListener(): void;
    protected _updateKlass(value?: NgClassType): void;
    protected _updateNgClass(value?: NgClassType): void;
    protected _classAdapter: BaseFxDirectiveAdapter;
    protected _ngClassAdapter: BaseFxDirectiveAdapter;
}
