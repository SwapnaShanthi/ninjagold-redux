import {
    createStore,
} from 'redux';
import update from 'react-addons-update';

export const loadDetails = (payload) => ({
    type: 'RETRIVE_ALL',   
    payload                     // <-- action.type
});
export const updateNinjaDetails = (payload) => ({
    type: 'UPDATE',   
    payload                     // <-- action.type
});


export const ninjaReducer=(state =initialState, action)=>{
    console.log("reducer state",state,action.type);
    switch (action.type) {
        
      case 'RETRIVE_ALL':
            return Object.assign({},
                                state,
                                {ninjaActionTrackerList:action.payload.ninjaactions,goldCount:action.payload.goldcount})
      case 'UPDATE':
            let count=action.payload.goldcount+state.goldCount;
             return Object.assign({},
                                  state,
                                  {ninjaActionTrackerList:[...state.ninjaActionTrackerList,action.payload.ninjaactions],goldCount:count})
      
      
       default:
             return state;
    }
}



const initialState = { 
    ninjaActionTrackerList: [],
    goldCount:0             
};

export function configureStore(initialState = initialState) { // initialState = initialState | {}
    const store = createStore(ninjaReducer,initialState);
    return store;
};

export const store = configureStore();
