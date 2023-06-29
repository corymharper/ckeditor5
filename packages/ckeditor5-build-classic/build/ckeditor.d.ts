/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Image, ImageCaption, ImageStyle, ImageToolbar, ImageResize, ImageUpload } from '@ckeditor/ckeditor5-image';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { FileRepository } from '@ckeditor/ckeditor5-upload';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Table, TableToolbar, TableProperties, TableCellProperties } from '@ckeditor/ckeditor5-table';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';
import { HtmlEmbed } from '@ckeditor/ckeditor5-html-embed';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { FontSize } from '@ckeditor/ckeditor5-font';
import { type Editor } from '@ckeditor/ckeditor5-core';
import './custom.css';
declare class MarkdownPlugin extends Plugin {
    constructor(editor: Editor);
    static get pluginName(): 'MarkdownPlugin';
}
declare class CustomUploadAdapter extends Plugin {
    static get requires(): (typeof FileRepository)[];
    static get pluginName(): 'CustomUploadAdapter';
    init(): void;
}
export default class FullEditor extends ClassicEditorBase {
    static builtinPlugins: (typeof TextTransformation | typeof Essentials | typeof Paragraph | typeof Heading | typeof Autoformat | typeof Bold | typeof Italic | typeof BlockQuote | typeof Image | typeof ImageCaption | typeof ImageResize | typeof ImageStyle | typeof ImageToolbar | typeof ImageUpload | typeof Link | typeof LinkImage | typeof List | typeof PasteFromOffice | typeof HorizontalLine | typeof Indent | typeof MediaEmbed | typeof Table | typeof TableCellProperties | typeof TableProperties | typeof TableToolbar | typeof SourceEditing | typeof HtmlEmbed | typeof Alignment | typeof FontSize | typeof MarkdownPlugin | typeof CustomUploadAdapter)[];
    static defaultConfig: {
        toolbar: {
            items: string[];
        };
        image: {
            toolbar: string[];
        };
        table: {
            contentToolbar: string[];
        };
        language: string;
    };
}
export {};
