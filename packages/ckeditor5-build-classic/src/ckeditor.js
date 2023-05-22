/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage';

import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline.js';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize.js';
import MediaEmbedToolbar from '@ckeditor/ckeditor5-media-embed/src/mediaembedtoolbar.js';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import GFMDataProcessor from '@ckeditor/ckeditor5-markdown-gfm/src/gfmdataprocessor';

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';

import './custom.css';

function MarkdownPlugin( editor ) {
	editor.data.processor = new GFMDataProcessor( editor.editing.view.document );
}

class CustomUploadAdapter extends Plugin {
	static get requires() {
		return [ FileRepository ];
	}

	static get pluginName() {
		return 'CustomUploadAdapter';
	}

	init() {
		const uploadFunction = this.editor.config._config.uploadFunction;

		if ( typeof uploadFunction !== 'function' ) {
			console.warn( 'No `uploadFunction` was provided' );
			return;
		}

		this.editor.plugins.get( FileRepository ).createUploadAdapter = loader => {
			return new Adapter( loader, uploadFunction );
		};
	}
}

class Adapter {
	constructor( loader, uploadFunction ) {
		this.loader = loader;
		this.uploadFunction = uploadFunction;
	}

	upload() {
		return this.loader.file.then((file) => this.uploadFunction(file));
	}

	abort() {
		// Do nothing
	}
}

class FullEditor extends ClassicEditor {}
class MarkdownEditor extends ClassicEditor {}

// Plugins to include in the build.
FullEditor.builtinPlugins = [
	Essentials,
	Autoformat,
	Bold,
	Italic,
	BlockQuote,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	Link,
	LinkImage,
	List,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	Table,
	TableToolbar,
	TextTransformation,

	Alignment,
	FontSize,
	HorizontalLine,
	ImageResize,
	MediaEmbedToolbar,
	TableProperties,
	TableCellProperties,
	CustomUploadAdapter
];

// Editor configuration.
FullEditor.defaultConfig = {
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

// Plugins to include in the build.
MarkdownEditor.builtinPlugins = [
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
	MarkdownPlugin,
	CustomUploadAdapter
];

// Editor configuration.
MarkdownEditor.defaultConfig = {
	toolbar: {
		items: [
			'heading',
			'|',
			'bold',
			'italic',
			'|',
			'link',
			'bulletedList',
			'numberedList',
			'blockQuote',
			'horizontalLine',
			'uploadImage',
			'|',
			'undo',
			'redo'
		]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};

export default {
	FullEditor, MarkdownEditor
};