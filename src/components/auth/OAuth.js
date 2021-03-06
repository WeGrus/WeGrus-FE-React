import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { actionCreators } from "../../store";

const Redirecting = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

function mapStateToProps(state) {
  return state;
}
function mapDispatchToProps(dispatch) {
  return {
    setKakaoId: (kakaoId, id) =>
      dispatch(actionCreators.setKakaoId(kakaoId, id)),
    setToken: (token) => dispatch(actionCreators.setToken(token)),
    loginSuccess: (token) => dispatch(actionCreators.loginSuccess(token)),
  };
}

function OAuth(props) {
  let navigate = useNavigate();

  useEffect(async () => {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code"); // url 파라미터에서 인가코드 받는 부분
    //let grant_type = "authorization_code";
    //let client_id = "65cd2fc55aec40658e2efbc951d47164";
    console.log(code);
    await axios
      .post(`/signin?authorizationCode=${code}`, {
        headers: {
          "Access-Control-Allow-Origin": "http://api.igrus.net:8080/", // 서버 domain
        },
        withCredentials: true,
      }) //로그인 api로 인가코드를 보내 백엔드에서 카카오 로그인 완료
      .then(async (res) => {
        const KAKAO_ID = res.data.data.userId;
        const RESULT = res.data.data.status;

        console.log(res);
        props.setKakaoId(KAKAO_ID);
        console.log(KAKAO_ID);
        //console.log(KAKAO_ID, RESULT);
        if (RESULT === "fail") {
          navigate("/login/email-auth");
        } else if ("success") {
          const ACCESS_TOKEN = res.data.data.accessToken;
          await props.loginSuccess(ACCESS_TOKEN);

          //console.log(ACCESS_TOKEN);
          //서버에서 쿠키로 전송한 refresh_token을 확인하는 코드입니다
          //sameSite - lax의 경우 다른 도메인간 쿠키 전송이 불가능 하기 때문에 sameSite none으로 설정하고 https를 통해 secure 설정을 하여 전송하거나 도메인을 통합해야 합니다.

          navigate("/");
          props.loginSuccess(ACCESS_TOKEN);
        } else {
          window.alert("로그인 실패하였습니다. 다시 시도해주세요.");
          navigate("/");
          console.log("what the fuck are you doin'");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("Not Found");
        window.alert("페이지를 찾을 수 없습니다.");
        navigate("/");
      });
  }, []);

  return (
    <Redirecting>
      <FontAwesomeIcon icon={faSpinner} pulse />
      &nbsp;
    </Redirecting>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(OAuth);
