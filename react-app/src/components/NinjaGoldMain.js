import React, { Component } from "react";
import { loadDetails,updateNinjaDetails} from '../redux.js';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import axios from 'axios';
import NinjaGoldCount from "./NinjaGoldCount.js";
import NinjaGoldPlayerArena from "./NinjaGoldPlayerArena.js";
import NinjaGoldActionTracker from "./NinjaGoldActionTracker.js";
import './../style/ninjamain.css'

class NinjaGoldMain extends Component {
    constructor(props) {
      super(props);
      this.state={
                  error:""
                }
    }
    retriveNinjaDetails=()=>{
        axios.get(`http://localhost:5000/getninjagolddetails/`)
        .then((response )=> {
            console.log("the ninja details",response.data.data);
           this.props.loadDetails(response.data.data[0]);
           this.setState({error:""});
        })
        .catch((error) => {
           this.setState({error:"Server connection failed"});
        });
    }
    componentDidMount(){
        this.retriveNinjaDetails();
    }
    render() {

    const displayError=()=>{
         if(this.state.error!== ""){
           return  <div className="errormessagediv">{this.state.error}</div>
         }
     } 

      return (
        <div >
         {displayError()}   
         <NinjaGoldCount/>
         <NinjaGoldPlayerArena retriveNinjaDetails={this.retriveNinjaDetails}/>
         <NinjaGoldActionTracker/>
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
  )(NinjaGoldMain);