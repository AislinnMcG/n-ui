import React, { Component } from 'react';
import classNames from 'classnames';
import { Image } from '@financial-times/n-image';
import { buildImageServiceUrl } from '@financial-times/n-image/src/helpers';

export default class TourTip extends Component {

	renderTourLink (data) {
		if (data.settings.hasTourPageLink) {
			return <p className="tour-tip__link"><a href="/tour" className="tour-tip__link" data-trackable="tour-link">New hints and tips</a></p>;
		}
	}

	renderBody (data) {
		const createMarkup = (prop) => ({ __html: prop });

		if (data.content.body) {
			return <p className="tour-tip__body" dangerouslySetInnerHTML={createMarkup(data.content.body)}></p>;
		}
	}

	renderCta (data) {
		if (data.content.ctaUrl && data.content.ctaLabel) {
			return <a href={data.content.ctaUrl} className="tour-tip__cta o-buttons o-buttons--standout" data-trackable="cta">{data.content.ctaLabel}</a>;
		}
	}

	renderImage (data) {
		if (data.content.imageUrl) {

			return <div className="tour-tip__img-container">
				<Image
					src={buildImageServiceUrl(data.content.imageUrl, (data.content.imageUrl.substr(-4,4) === '.svg') ? {format: 'svg'} : {} )}
					alt={data.content.imageAlt}
					classes={['tour-tip__img']}
				/>
			</div>;
		}
	}

	render () {
		let data = JSON.parse(JSON.stringify(this.props.data));

		const modifiersFromConfig = (data.modifiers || []).map(modifier => `tour-tip--${modifier}`);
		const modifiers = [`tour-tip--${data.settings.size}`, ...modifiersFromConfig];
		const classes = classNames({
			'tour-tip': true
		}, modifiers);

		return <div className={classes} data-trackable={`tour-tip-${data.id}`}>
			<div className="tour-tip__main">
				<div className="tour-tip__text">
					{this.renderTourLink(data)}
					<h2 className="tour-tip__standout">{data.content.title}</h2>
					{this.renderBody(data)}
					{this.renderCta(data)}
				</div>
				{this.renderImage(data)}
			</div>
		</div>
	}
}
