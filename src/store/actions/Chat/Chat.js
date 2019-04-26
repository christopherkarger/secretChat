import * as actionTypes from '../../actions/actionTypes';
import SimpleCrypto from "simple-crypto-js";



const save = data => {
  return {
    type: actionTypes.SAVE_SECRET, 
    data
  }
}

export const saveSecret = data => {
  return dispatch => {
    let secret = '';
    if (data && data.length > 0) {
      const simpleCrypto = new SimpleCrypto(data);
      secret = simpleCrypto.encrypt(data);
    }
    
    dispatch(save(secret));
  }
}