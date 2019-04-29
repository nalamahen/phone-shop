import R from 'ramda';
import {
    ADD_PHONE_TO_BASKET
} from '../actions/actionTypes'

export default (state = [], {type, payload}) => {
    switch(type) {
        case ADD_PHONE_TO_BASKET:
            return R.append(payload, state);
        default:
            return state;
    }
}