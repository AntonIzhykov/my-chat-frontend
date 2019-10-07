import { initialState as state, user as reducer } from '../../../../store/user/reducer';
import * as con from '../../../../store/user/constants';

describe('user reducer', () => {

  it('GET_USER_REQUEST', () => {
    const action = {
      type: con.GET_USER_REQUEST,
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      loading: true,
    })
  });

  it('GET_USER_SUCCESS', () => {
    const _state = {
      ...state,
      loading: true
    };

    const action = {
      type: con.GET_USER_SUCCESS,
      payload: {
        userName: "TestUser",
        messages: [ 1, 2, 3 ]
      }};

    expect(reducer(_state, action)).toEqual({
      ...state,
      loading: false,
      user: action.payload,
    })
  });

  it('GET_USER_FAILURE', () => {
    const _state = {
      ...state,
      loading: true
    };
    const action = {
      type: con.GET_USER_FAILURE,
      payload: "Something went wrong"
    };

    expect(reducer(_state, action)).toEqual({
      ...state,
      loading: false,
      error: action.payload
    })
  })
});
