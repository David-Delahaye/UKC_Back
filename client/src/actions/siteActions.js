import {FETCH_SITES, NEW_SITE, DELETE_SITE, NEW_MESSAGE} from './types'

export const fetchSites = () => async dispatch => {
    const response = await fetch('/api/sites');
    const jsonData = await response.json();
    dispatch({
        type: FETCH_SITES,
        payload: jsonData
    })
}

export const newSite = (siteData) => async dispatch => {
    //UPDATE DB
    const message = await fetch("/api/sites",{
        method: "POST",
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify(siteData)
    });

    //UPDATE MESSAGE
    const jsonMessage = await message.json();
    dispatch({
        type: NEW_MESSAGE,
        payload: jsonMessage
    })

    //UPDATE SITES
    const response = await fetch('/api/sites');
    const jsonData = await response.json();
    dispatch({
        type: NEW_SITE,
        payload: jsonData
    })
}

export const deleteSite = (siteID) => async dispatch => {
    //UPDATE DB
    const message = await fetch(`/api/sites/${siteID}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    })

    //UPDATE MESSAGE
    const jsonMessage = await message.json();
    console.log(jsonMessage);
    
    dispatch({
        type: NEW_MESSAGE,
        payload: jsonMessage
    })

    //UPDATE SITES
    const response = await fetch('/api/sites');
    const jsonData = await response.json();
    dispatch({
        type: DELETE_SITE,
        payload: jsonData
    })
}

export const getSite = (siteID) => async dispatch => {
    
}