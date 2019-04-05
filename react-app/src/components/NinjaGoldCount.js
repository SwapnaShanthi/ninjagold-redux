import React, { Component } from "react";
import { loadDetails,updateNinjaDetails} from '../redux.js';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import axios from 'axios';
import './../style/ninjagoldcount.css';

class NinjaGoldCount extends Component {
    constructor(props) {
      super(props);
      this.state={
                }
    }
    render() {
    

      return (
        <div className="ninjagoldcountouterdiv">
            <div className="ninjagoldcountheaderdiv">Ninja Gold Count</div>
            <div className="counterstyle">Gold Count:{this.props.goldCount}</div>
        </div>
      );
    }
  }
  
  const mapStateToProps = (state) => ({
    ninjaActionTrackerList:state.ninjaActionTrackerList,
    goldCount:state.goldCount
  })
  
  const mapDispatchToProps = (dispatch) => ({
    loadDetails: (payload) => dispatch(loadDetails(payload)),
    updateNinjaDetails: (payload) => dispatch(updateNinjaDetails(payload))
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(NinjaGoldCount);