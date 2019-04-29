import R from 'ramda';
import { 
    FETCH_PHONE_SUCCESS,
    LOAD_MORE_PHONES_SUCCESS,
    SEARCH_PHONE
} from '../actions/actionTypes';

const initialState = {
    ids: [],
    search: ''
}

export default (state = initialState, {type, payload}) => {
    switch(type) {
        case FETCH_PHONE_SUCCESS:
            return R.merge(state, {
                ids: R.pluck('id', payload)
            })
        case LOAD_MORE_PHONES_SUCCESS:
            const ids = R.pluck('id', payload);
            return R.merge(state, {
                ids: R.concat(ids, state.ids)
            })
        case SEARCH_PHONE:
            return R.merge(state, {
                search: payload
            })
        default:
            return state
    }
}