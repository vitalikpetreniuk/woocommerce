/**
 * External dependencies
 */
import { useMemo } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { setQueryAttribute } from '../../utils';
import DisplaySettingsToolbar from './display-settings-toolbar';
import DisplayLayoutToolbar from './display-layout-toolbar';
import CollectionChooserToolbar from './collection-chooser-toolbar';
import type { ProductCollectionContentProps } from '../../types';
import { getCollectionByName } from '../../collections';

export default function ToolbarControls(
	props: ProductCollectionContentProps
) {
	const { attributes, openCollectionSelectionModal, setAttributes } = props;
	const { query, displayLayout } = attributes;

	const setQueryAttributeBind = useMemo(
		() => setQueryAttribute.bind( null, props ),
		[ props ]
	);

	const collection = getCollectionByName( props.attributes.collection );
	const showCollectionChooserToolbar =
		collection?.scope?.includes( 'block' ) ||
		collection?.scope === undefined;

	return (
		<BlockControls>
			{ showCollectionChooserToolbar && (
				<CollectionChooserToolbar
					openCollectionSelectionModal={
						openCollectionSelectionModal
					}
				/>
			) }
			{ ! query.inherit && (
				<>
					<DisplaySettingsToolbar
						query={ query }
						setQueryAttribute={ setQueryAttributeBind }
					/>
					<DisplayLayoutToolbar
						displayLayout={ displayLayout }
						setAttributes={ setAttributes }
					/>
				</>
			) }
		</BlockControls>
	);
}
