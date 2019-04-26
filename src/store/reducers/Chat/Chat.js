import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  secret: ''
}

const reducer = (state = initialState, action) =>  {
  switch (action.type) {
    case actionTypes.SAVE_SECRET :
    return {
      ...state,
      secret: action.data
    }

    default : return state;
  }
   
};


export default reducer;