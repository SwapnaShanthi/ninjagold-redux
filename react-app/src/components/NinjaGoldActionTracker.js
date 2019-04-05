import React, { Component } from "react";
import { loadDetails,updateNinjaDetails} from '../redux.js';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import axios from 'axios';
import './../style/ninjagoldactiontracker.css';

class NinjaGoldActionTracker extends Component {
    constructor(props) {
      super(props);
      this.state={
                }
    }
    render() {
      const displayNinjaActionTracker=this.props.ninjaActionTrackerList.map((item,index)=>{
           return <li>{item}</li>

      })

      return (
        <div >
          <div className="ninjagoldactiontrackerouterdiv">
            <div className="ninjagoldactiontrackerheaderdiv">Ninja Gold Action Tracker</div>
            <div className="listdiv">
                <ul>
                    {displayNinjaActionTracker}
                </ul>
            </div>
        </div>
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
  )(NinjaGoldActionTracker);