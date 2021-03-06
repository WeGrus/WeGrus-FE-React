import { createStore } from "@reduxjs/toolkit";

import { combineReducers } from "redux";

const SET_ID = "SET_ID";
const SET_EMAIL = "SET_EMAIL";
const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const PUT_USER_INFO = "PUT_USER_INFO";
const EDIT_PHOTO = "EDIT_PHOTO";
const LOGOUT = "LOGOUT";

const initialState = {
  //userReducer의 기본값입니다.
  id: null,
  email: null,
  name: null,
  studentId: null,
  department: null,
  grade: null,
  phone: null,
  createdDate: null,
  introduce: null,
  imageUrl:
    "https://igrus-webservice-bucket.s3.ap-northeast-2.amazonaws.com/basic.jpeg",
  academicStatus: null,
  roles: null,
  authenticated: false,
  token: null,
  userId: null,
  gender: null,
  group: null,
};

const setKakaoId = (userId) => {
  //카카오 로그인 후 kakao_id를 다음 컴포넌트에 넘겨주는 액션 생성함수입니다.
  return {
    type: SET_ID,
    userId,
  };
};
const setEmail = (email) => {
  //이메일 인증 후 회원가입 시 이메일 정보를 signup 컴포넌트에 넘겨주기 위함
  return {
    type: SET_EMAIL,
    email,
  };
};
const userSignUp = (academicStatus, department, gender, grade, name, phone) => {
  //정보 입력 후 회원가입
  return {
    type: LOGIN,
    result: true,
    academicStatus,
    department,
    gender,
    grade,
    name,
    phone,
  };
};

const loginSuccess = (token) => {
  return { type: LOGIN_SUCCESS, result: true, token };
};

const putUserInfo = (
  id,
  email,
  name,
  studentId,
  department,
  grade,
  gender,
  phone,
  createdDate,
  introduce,
  imageUrl,
  academicStatus,
  roles,
  group
) => {
  return {
    type: PUT_USER_INFO,
    id,
    email,
    name,
    studentId,
    department,
    grade,
    gender,
    phone,
    createdDate,
    introduce,
    imageUrl,
    academicStatus,
    roles,
    group,
  };
};

const editPhoto = (imageUrl) => {
  return { type: EDIT_PHOTO, imageUrl };
};

const logUserOut = () => {
  return { type: LOGOUT, result: false, token: null };
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ID:
      return {
        ...state,
        authenticated: action.result,
        userId: action.userId,
      };
    case SET_EMAIL:
      return {
        ...state,
        authenticated: action.result,
        email: action.email,
      };
    case LOGIN:
      return {
        ...state,
        authenticated: action.result,
        academicStatus: action.academicStatus,
        department: action.department,
        gender: action.gender,
        grade: action.grade,
        name: action.name,
        phone: action.phone,
      };
    case LOGIN_SUCCESS:
      return { ...state, authenticated: action.result, token: action.token };
    case PUT_USER_INFO:
      return {
        ...state,
        id: action.id,
        email: action.email,
        name: action.name,
        studentId: action.studentId,
        department: action.department,
        gender: action.gender,
        grade: action.grade,
        phone: action.phone,
        createdDate: action.createdDate,
        introduce: action.introduce,
        imageUrl: action.imageUrl,
        academicStatus: action.academicStatus,
        roles: action.roles,
        group: action.group,
      };
    case EDIT_PHOTO:
      return { ...state, imageUrl: action.imageUrl };
    case LOGOUT:
      return { ...state, authenticated: action.result, token: action.token };
    default:
      return state;
  }
};

const setToken = (token) => {
  //token값을 받기위해서 만든 액션
  return {
    type: "SET",
    token,
  };
};

const tokenReducer = (state = "", action) => {
  // 토큰값을 받기위한 리듀서.
  switch (action.type) {
    case "SET":
      return action.token;
    default:
      return state;
  }
};

// 게시판, 스터디 , 그룹등의 커뮤니티 기능에서 뒤로가기를 구현하기 위해 page값등을 저장하는 리듀서를 만들었습니다.
// 기존 이용하려 했던 location의 경우 기존의 값과 새로운 값이 두번 바뀌면서 적용하기 어려웠기 때문입니다.
// 지금은 page,boardId,검색유무,나열 기준(최신순, 추천순) 등의 기능밖에 없지만 스터디와 소모임의 경우에도 사용할 정도로 수정할 예정입니다.

const pageState = {
  boardId: null, // 백엔드와 통신 때 이용하는 번호입니다.
  page: 1, // 페이지입니다.
  isSearching: [false], // 검색유무를 파악합니다. 총 3개의 원소가 있으며 0번째는 검색유무, 1번째는 검색옵션(글쓴이만, 제목만) 2번째는 키워드입니다.
  selected: null, // 정렬 순을 의미합니다.(최신순, 추천순)
  boardCategoryName: null, // boardCategoryName 은 경로를 의미합니다.
  viewCategoryName: null, // 보여지는 CategoryName 를 의미합니다.
};

const setAll = (boardId, page, isSearching, selected, boardCategoryName) => {
  return {
    type: "SET_ALL",
    boardId,
    page,
    isSearching,
    selected,
    boardCategoryName,
  };
};

const setViewCategoryName = (viewCategoryName) => {
  return {
    type: "SET_VIEW_CATEGORY_NAME",
    viewCategoryName,
  };
};

const setBoardId = (boardId) => {
  return {
    type: "SET_BOARD_ID",
    boardId,
  };
};

const setPage = (page) => {
  return {
    type: "SET_PAGE",
    page,
  };
};

const setIsSearching = (isSearching) => {
  return {
    type: "SET_ISSEARCHING",
    isSearching,
  };
};

const setSelected = (selected) => {
  return {
    type: "SET_SELECTED",
    selected,
  };
};

const PageReducer = (state = pageState, action) => {
  switch (action.type) {
    case "SET_ALL":
      return {
        ...state,
        boardId: action.boardId,
        page: action.page,
        isSearching: action.isSearching,
        selected: action.selected,
        boardCategoryName: action.boardCategoryName,
      };
    case "SET_BOARD_ID":
      return {
        ...state,
        boardId: action.boardId,
      };
    case "SET_PAGE":
      return {
        ...state,
        page: action.page,
      };
    case "SET_ISSEARCHING":
      return {
        ...state,
        isSearching: action.isSearching,
      };
    case "SET_SELECTED":
      return {
        ...state,
        selected: action.selected,
      };
    case "SET_VIEW_CATEGORY_NAME": {
      return {
        ...state,
        viewCategoryName: action.viewCategoryName,
      };
    }
    default:
      return state;
  }
};

const combinestore = combineReducers({
  // combineReducers로 복수의 Reducer 사용 가능.
  userReducer,
  tokenReducer,
  PageReducer,
});

const store = createStore(combinestore); // store 생성

export const actionCreators = {
  setKakaoId,
  setEmail,
  userSignUp,
  loginSuccess,
  putUserInfo,
  setToken,
  setAll,
  setBoardId,
  setPage,
  setIsSearching,
  setSelected,
  setViewCategoryName,
  editPhoto,
  logUserOut,
};

export default store;

// export const Token = configureStore({
//   reducer: {
//     AccessToken: AccessTokenReducer,
//   },
// });
