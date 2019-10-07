import * as con from '../../../../store/user/constants';
import * as actions from '../../../../store/user/actions';

describe('user actions', () => {
  it('GET_USER_REQUEST', () => {
    const expectedAction = {
      type: con.GET_USER_REQUEST,
    };
    expect(actions.getUserRequest()).toEqual(expectedAction)
  });

  it('GET_USER_SUCCESS', () => {
    const expectedAction = {
      type: con.GET_USER_SUCCESS,
      payload: {
        userName: 'TestUser',
        messages: [ 1, 2, 3 ]
      }
    };
    expect(actions.getUserSuccess(expectedAction.payload)).toEqual(expectedAction)
  });

  it('GET_USER_FAILURE', () => {
    const expectedAction = {
      type: con.GET_USER_FAILURE,
      payload: "Something went wrong"
    };
    expect(actions.getUserFailure(expectedAction.payload)).toEqual(expectedAction)
  })
});
