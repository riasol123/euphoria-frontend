export const FETCH_ORGANIZER_REQUEST = 'FETCH_ORGANIZER_REQUEST';
export const FETCH_ORGANIZER_SUCCESS = 'FETCH_ORGANIZER_SUCCESS';
export const FETCH_ORGANIZER_FAILURE = 'FETCH_ORGANIZER_FAILURE';

export const fetchOrganizerRequest = (payload: any) => ({
  type: FETCH_ORGANIZER_REQUEST,
  payload,
});

export const fetchOrganizerSuccess = (data: any) => ({
  type: FETCH_ORGANIZER_SUCCESS,
  payload: data,
});

export const fetchOrganizerFailure = (error: string) => ({
  type: FETCH_ORGANIZER_FAILURE,
  payload: error,
}); 