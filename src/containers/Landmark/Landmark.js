import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';
import * as landmarkActions from 'redux/modules/landmarks';
import { landmarkIsLoaded, loadLandmark } from 'redux/modules/landmarks';
import { Error, Image, PaperLoader, SnippetList } from 'components';

@connect(
  state => ({
    landmarks: state.landmarks,
  }),
  {...landmarkActions})

export default
class Landmark extends Component {
  static propTypes = {
    activeNavItem: PropTypes.func,
    changeHeader: PropTypes.func,
    landmarks: PropTypes.object,
    location: PropTypes.object,
    params: PropTypes.object
  }

  componentDidMount() {
    this.props.changeHeader('Landmark');
    this.props.activeNavItem('landmark');
    //
    // TODO: store the snippets in the state
    //
  }

  static fetchDataDeferred(getState, dispatch) {
    const state = getState();
    const landmarkId = state.router.params.slug;
    if (!landmarkIsLoaded(state, landmarkId)) {
      return dispatch(loadLandmark(landmarkId));
    }
  }

  render() {
    const styles = require('./Landmark.scss');
    const landmarkId = this.props.params.slug;
    const landmark = this.props.landmarks[landmarkId];
    const loading = !landmark || landmark.loading;
    const error = !landmark || landmark.error;
    if (loading) return (<PaperLoader />);
    if (error) return (<Error error={error} />);
    const { location } = this.props;
    const {area, description, image, snippets, teaser, title } = landmark.payload;
    const areaId = landmark.payload.area_id;
    const meta = {
      title: title,
      description: teaser,
      meta: {
        property: {
          'og:title': title,
          'og:image': image && image.medium.src,
          'og:image:width': image && image.medium.width,
          'og:image:height': image && image.medium.height,
          'og:description': teaser
        }
      }
    };

    return (
      <div className={ snippets.length ? [styles.landmark, styles.landmarkWithSnippets].join(' ') : styles.landmark }>
        <DocumentMeta {...meta} extend />
        <div className={styles.coverImage}>
          <Image image={image} size="medium" />
        </div>
        <div className={styles.landmarkDetails}>
          <h1>
            <span className={styles.landmarkTitle}>
              {title}
            </span>
          </h1>
          <div className={styles.breadcrumb}>
            <Link to={`/explore/${areaId}`}>← Back to {area}</Link>
          </div>
          { description && <div className={styles.landmarkDescription} dangerouslySetInnerHTML={{__html: description}} /> }
        </div>
        { snippets.length && <SnippetList items={snippets} location={location} /> }
      </div>
    );
  }
}
