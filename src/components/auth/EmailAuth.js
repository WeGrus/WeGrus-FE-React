import React, { useEffect, useState } from "react";
import AuthLayout from "../auth/AuthLayout";
import Button from "../auth/Button";
import HeaderContainer from "../auth/HeaderContainer";
import PageTitle from "../shared/PageTitle";
import axios from "axios";
import { connect } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { actionCreators } from "../../store";

function mapStateToProps(state) {
  console.log(state);
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    setEmail: (text) => dispatch(actionCreators.setEmail(text)),
  };
}

const NextButton = styled(Link)`
  width: 292px;
  span {
    padding: 10px;
  }

  border-radius: 18px;
  color: ${(props) => props.ftcolor};
  font-weight: bold;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
`;

const InhaEmail = styled.div`
  width: 292px;
  padding: 10px;
  border-radius: 18px;
  background-color: #f5f5f5;
  margin-bottom: 8px;
  display: flex;
  align-items: center;

  span {
    color: gray;
  }
`;

const LoginForm = styled.form`
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
`;

const MoveOnMessage = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function EmailAuth(props) {
  const [verificationKey, setVerificationKey] = useState();
  const { handleSubmit, register } = useForm();
  const [emailAuth, setEmailAuth] = useState(false);

  const checkVerifi = () => {
    let params = new URLSearchParams(window.location.search);
    let verifiKey = params.get("verificationKey");
    console.log(params, verifiKey);

    setVerificationKey(verifiKey);
    console.log(verificationKey);
    if (verifiKey) {
      axios
        .post(`/signup/verify?verificationKey=${verifiKey}`)
        .then((res) => {
          const CERTIFIED = res.data.data.certified;
          console.log(res);
          if (CERTIFIED) {
            console.log(
              "진행하던 회원 가입 브라우저로 이동하여 다음 버튼을 눌러주세요."
            );
          } else {
            console.log("Authentication expired");
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Can't find verification key.");
    }
  };
  useEffect(() => {
    /*if (!props.userReducer.userId) {
      //window.alert(message);
      navigate("/");
    }*/
    console.log(props);
    checkVerifi();
  });

  const onSubmit = (data) => {
    data.email = `${data.email}@inha.edu`;
    const EMAIL = data.email;

    axios.post(`/signup/check/email?email=${EMAIL}`).then((res) => {
      const STATUS = res.data.data.status;
      if (STATUS === "success") {
        props.setEmail(data.email);
        window.open("https://mail.google.com/mail/u/1/#inbox", "_blank");
        setEmailAuth(true);
        console.log(res.data.message);
        //setMessage(res.data);
      } else {
        console.log(res);
      }
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="이메일 인증" />
      {verificationKey ? (
        <MoveOnMessage>
          <h2>진행하던 회원 가입 페이지로 이동하여 다음 버튼을 눌러주세요.</h2>
        </MoveOnMessage>
      ) : (
        <>
          <HeaderContainer>
            <span>인하대학교 학생 이메일을 통해 인증을 완료해 주세요.</span>
          </HeaderContainer>
          <LoginForm onSubmit={handleSubmit(onSubmit)}>
            <InhaEmail>
              <input
                {...register("email", {
                  required: "학번을 입력하세요.",
                })}
                placeholder="*학번 입력"
                type="text"
              />
              <span>@inha.edu</span>
            </InhaEmail>

            {emailAuth ? (
              <NextButton to="/signup" color="#30B0B0" ftcolor="white">
                <span>다음 단계</span>
              </NextButton>
            ) : (
              <Button color="#106557" ftcolor="white" type="submit" />
            )}
          </LoginForm>
        </>
      )}
    </AuthLayout>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailAuth);
