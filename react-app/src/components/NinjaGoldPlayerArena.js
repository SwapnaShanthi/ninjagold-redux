import React, { Component } from "react";
import { loadDetails,updateNinjaDetails} from '../redux.js';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import axios from 'axios';
import './../style/ninjagoldplayerarena.css'

class NinjaGoldPlayerArena extends Component {
    constructor(props) {
      super(props);
      this.state={
                }
    }
    handleNinjaActivity=(min,max,type)=>{

        let goldCount=Math.floor(Math.random() * (max - min + 1)) + min;
        let textMessage="You've earned "
        if(type==="Farm"){
           textMessage= textMessage +`${goldCount}`+ " at the Farm";
        }else if(type==="Cave"){
            textMessage= textMessage+`${goldCount}`+ " at the Cave";
        }else if(type==="Casino"){
            if(goldCount%2===0){
                goldCount=goldCount*(-1);
                textMessage= "You've lost "+`${Math.abs(goldCount)}`+ " at the Casino";
            }else{
                textMessage= textMessage+`${goldCount}`+ " at the Casino";
            }
            
        }else if(type==="House"){
            textMessage= textMessage+`${goldCount}`+ " at the House";
        }
        let tempninjaActionTrackerList = Array.from(this.props.ninjaActionTrackerList);
        tempninjaActionTrackerList.push(textMessage);
        let objectToUpdate={id:1,
                            ninjaactions:tempninjaActionTrackerList,
                            goldcount:this.props.goldCount+goldCount

                           }
        this.updateServer(objectToUpdate);
        
    }
    updateServer=(objectToUpdate)=>{
       
        axios.post(`http://localhost:5000/updateninjadetails/`,{objectToUpdate})
             .then((response) => {
                this.props.retriveNinjaDetails();
                this.setState({error:""});
             })
             .catch((error) => {
                  this.setState({error:"Server connection failed"});
              });   

    }
  
    render() {

      return (
        <div className="ninjagoldplayerarenaouterdiv" >
            <div className="ninjagoldplayerarenaheaderdiv">Ninja Players Arena</div>
            <div className="playerarenadiv">
                <div className="playerarenainnerdiv">
                    <div className="header">Farm</div>
                    <div className="descriptiondiv">Earns 2 - 5 Gold</div>
                    <div><button onClick={()=>{this.handleNinjaActivity(2,5,"Farm")}} className="buttonstylefarm" type="button" >Farm</button></div>
                </div>
                <div className="playerarenainnerdiv">
                    <div className="header">Cave</div>
                    <div className="descriptiondiv">Earns 5 - 10 Gold</div>
                    <div><button  onClick={()=>{this.handleNinjaActivity(5,10,"Cave")}} className="buttonstylecave" type="button" >Cave</button></div>
                </div>
                <div className="playerarenainnerdiv">
                    <div className="header">Casino</div>
                    <div className="descriptiondiv">Earn up to or loose up to 100 Gold</div>
                    <div><button onClick={()=>{this.handleNinjaActivity(0,100,"Casino")}} className="buttonstylecasino" type="button" >Casino</button></div>
                </div>
                <div className="playerarenainnerdiv">
                    <div className="header">House</div>
                    <div className="descriptiondiv">Earns 7 - 15 Gold</div>
                    <div><button onClick={()=>{this.handleNinjaActivity(7,15,"House")}} className="buttonstylehouse" type="button" >House</button></div>
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
  )(NinjaGoldPlayerArena);