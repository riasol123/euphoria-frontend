import { GET_ORGANIZER_STATUS_FAILURE, GET_ORGANIZER_STATUS_REQUEST, GET_ORGANIZER_STATUS_SUCCESS, POST_ORGANIZER_FAILURE, POST_ORGANIZER_REQUEST, POST_ORGANIZER_SUCCESS } from "../actionTypes";

export const fetchOrganizerRequest = (payload: any) => ({
  type: POST_ORGANIZER_REQUEST,
  payload,
});

export const fetchOrganizerSuccess = (data: any) => ({
  type: POST_ORGANIZER_SUCCESS,
  payload: data,
});

export const fetchOrganizerFailure = (error: string) => ({
  type: POST_ORGANIZER_FAILURE,
  payload: error,
}); 

export const getOrganizerStatusRequest = () => ({
  type: GET_ORGANIZER_STATUS_REQUEST,
});

export const getOrganizerStatusSuccess = (data: any) => ({
  type: GET_ORGANIZER_STATUS_SUCCESS,
  payload: data,
});

export const getOrganizerStatusFailure = (error: string) => ({
  type: GET_ORGANIZER_STATUS_FAILURE,
  payload: error,
}); 