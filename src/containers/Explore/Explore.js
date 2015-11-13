import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';
import * as landmarkActions from 'redux/modules/landmarks';
import { areasAreLoaded, loadAreas } from 'redux/modules/areas';
import { Error, Loader, AreaList } from 'components';

@connect(
  state => ({
    areas: state.areas.ALL,
  }),
  {...landmarkActions})

export default
class Explore extends Component {
  static propTypes = {
    changeHeader: PropTypes.func,
    areas: PropTypes.object,
    location: PropTypes.object,
    params: PropTypes.object,
  }

  componentDidMount() {
    const headerTitle = 'Choose an area';
    this.props.changeHeader(headerTitle);
  }

  static fetchDataDeferred(getState, dispatch) {
    if (!areasAreLoaded(getState())) {
      return dispatch(loadAreas());
    }
  }

  render() {
    // const styles = require('./Explore.scss');
    const styles = require('./../Landmarks/Landmarks.scss');
    const { areas } = this.props;
    const loading = !areas || areas.loading;
    const error = !areas || areas.error;
    if (loading) return (<Loader />);
    if (error) return (<Error error={error} />);
    const areaItems = areas.payload;
    return (
      <div className={styles.landmarks}>
        <DocumentMeta title="Explore the MSD"/>
        <h1>All areas</h1>
        <AreaList items={areaItems} />
      </div>
    );
  }
}
