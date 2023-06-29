/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
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
import { FileRepository, type FileLoader } from '@ckeditor/ckeditor5-upload';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Table, TableToolbar, TableProperties, TableCellProperties } from '@ckeditor/ckeditor5-table';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';
import { HtmlEmbed } from '@ckeditor/ckeditor5-html-embed';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { FontSize } from '@ckeditor/ckeditor5-font';
import GFMDataProcessor from '@ckeditor/ckeditor5-markdown-gfm/src/gfmdataprocessor';
import { type Editor } from '@ckeditor/ckeditor5-core';
import './custom.css';

class MarkdownPlugin extends Plugin {
	constructor( editor: Editor ) {
		super( editor );
		editor.data.processor = new GFMDataProcessor( this.editor.editing.view.document );
	}
	public static get pluginName(): 'MarkdownPlugin' {
		return 'MarkdownPlugin';
	}
}

class Adapter {
	private loader: FileLoader;
	private uploadFunction: Function;

	constructor( loader: FileLoader, uploadFunction: Function ) {
		this.loader = loader;
		this.uploadFunction = uploadFunction;
	}
	public upload() {
		return this.loader.file.then( file => this.uploadFunction( file ) );
	}
	public abort() {
		// Do nothing
	}
}

class CustomUploadAdapter extends Plugin {
	public static get requires() {
		return [ FileRepository ];
	}
	public static get pluginName(): 'CustomUploadAdapter' {
		return 'CustomUploadAdapter';
	}
	public init(): void {
		const { uploadFunction } = this.editor.config.get( 'customUploadAdapter' ) as { uploadFunction: Function };

		if ( typeof uploadFunction !== 'function' ) {
			console.warn( 'No `uploadFunction` was provided' );
			return;
		}

		this.editor.plugins.get( FileRepository ).createUploadAdapter = loader => {
			return new Adapter( loader, uploadFunction );
		};
	}
}

export default class FullEditor extends ClassicEditorBase {
	public static override builtinPlugins = [
		Essentials,
		Autoformat,
		Bold,
		Italic,
		BlockQuote,
		Heading,
		Image,
		ImageUpload,
		Link,
		LinkImage,
		List,
		Paragraph,
		PasteFromOffice,
		TextTransformation,
		HorizontalLine,
		CustomUploadAdapter,
		ImageCaption,
		ImageStyle,
		ImageToolbar,
		Indent,
		MediaEmbed,
		Table,
		TableToolbar,
		SourceEditing,
		HtmlEmbed,
		Alignment,
		FontSize,
		ImageResize,
		TableProperties,
		TableCellProperties,
		MarkdownPlugin
	];

	public static override defaultConfig = {
		toolbar: {
			items: [
				'heading',
				'|',
				'bold',
				'italic',
				'fontSize',
				'alignment',
				'|',
				'link',
				'bulletedList',
				'numberedList',
				'blockQuote',
				'horizontalLine',
				'|',
				'outdent',
				'indent',
				'|',
				'uploadImage',
				'insertTable',
				'mediaEmbed',
				'htmlEmbed',
				'|',
				'sourceEditing',
				'|',
				'undo',
				'redo'
			]
		},
		image: {
			toolbar: [
				'imageStyle:inline',
				'imageStyle:block',
				'imageStyle:side',
				'|',
				'toggleImageCaption',
				'imageTextAlternative'
			]
		},
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells',
				'tableProperties',
				'tableCellProperties'
			]
		},
		// This value must be kept in sync with the language defined in webpack.config.js.
		language: 'en'
	};
}
