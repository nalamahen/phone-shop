import {
    FETCH_PHONE_START,
    FETCH_PHONE_SUCCESS,
    FETCH_PHONE_FAILURE,
    LOAD_MORE_PHONES_START,
    LOAD_MORE_PHONES_SUCCESS,
    LOAD_MORE_PHONES_FAILURE,
    FETCH_PHONE_BY_ID_START,
    FETCH_PHONE_BY_ID_SUCCESS,
    FETCH_PHONE_BY_ID_FAILURE,
    ADD_PHONE_TO_BASKET,
    SEARCH_PHONE,
    FETCH_CATEGORIES_START,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE
} from './actionTypes';

import { 
    fetchPhones as fetchPhonesApi,
    loadMorePhones as loadMorePhonesApi,
    fetchPhoneById as fetchPhoneByIdApi,
    fetchCategories as fetchCategoriesApi
} from '../api';
import { getRenderedPhonesLength } from '../selectors';

export const fetchPhones = () => async (dispatch, getState) => {
    const offset = getRenderedPhonesLength(getState());
    try {
        dispatch({ type: FETCH_PHONE_START });
        
        const phones = await loadMorePhonesApi(offset);        
    
        dispatch( {
            type: FETCH_PHONE_SUCCESS,
            payload: phones
        })        
    } catch (err) {
        dispatch({ 
            type: FETCH_PHONE_FAILURE,
            payload: err,
            error: true
        })
    }
    
}

export const loadMorePhones = () => async dispatch => {   
    dispatch({ type: LOAD_MORE_PHONES_START });
    try {
        const phones = await fetchPhonesApi();
    
        dispatch( {
            type: LOAD_MORE_PHONES_SUCCESS,
            payload: phones
        })        
    } catch (err) {
        dispatch({ 
            type: LOAD_MORE_PHONES_FAILURE,
            payload: err,
            error: true
        })
    }
    
}

export const fetchPhoneById = (id) => async dispatch => {
    dispatch({ type: FETCH_PHONE_BY_ID_START });

    try {
        const phone = await fetchPhoneByIdApi(id);

        dispatch( {
            type: FETCH_PHONE_BY_ID_SUCCESS,
            payload: phone
        })
    } catch (err) {
        dispatch( {
            type: FETCH_PHONE_BY_ID_FAILURE,
            payload: err,
            error: true
        })
    }
}

export const addPhoneToBasket = id => dispatch => {
    dispatch( {
        type: ADD_PHONE_TO_BASKET,
        payload: id
    });
}

export const searchPhone = text => dispatch => {

    dispatch({
        type: SEARCH_PHONE,
        payload: text
    });
}

export const fetchCategories = () => async dispatch => {
    
    try {
        dispatch({ type: FETCH_CATEGORIES_START });
        
        const categories = await fetchCategoriesApi();        
    
        dispatch( {
            type: FETCH_CATEGORIES_SUCCESS,
            payload: categories
        })        
    } catch (err) {
        dispatch({ 
            type: FETCH_CATEGORIES_FAILURE,
            payload: err,
            error: true
        })
    }
    
}