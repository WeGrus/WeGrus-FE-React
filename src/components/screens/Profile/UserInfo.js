import axios from "axios";
import { forwardRef, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import styled from "styled-components";
import { actionCreators } from "../../../store";
import { DEPARTMENTS, GRADE, STATUS } from "../Signup";
import FileUploadComponent from "./fileUpload.component";
import DetailBox, {
  ButtonBox,
  ContentBox,
  EditButton,
  EditForm,
  EditInput,
  EditProfileInput,
  FormError,
  InfoBox,
  InfoText,
  ProfilePhoto,
  SubmitButton,
} from "./ProfileElements";

function mapStateToProps(state) {
  console.log(state);
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    editPhoto: (imageUrl) => dispatch(actionCreators.editPhoto(imageUrl)),
    putUserInfo: (
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
    ) =>
      dispatch(
        actionCreators.putUserInfo(
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
        )
      ),
  };
}
const SSelect = styled.select`
  width: 80%;
`;

const Select = forwardRef(({ onChange, name, options, placeholder }, ref) => (
  <>
    <SSelect name={name} ref={ref} onChange={onChange} required>
      <option value="hide">*--{placeholder}--</option>
      {options.map((value, dataName) => (
        <option key={value} value={dataName}>
          {value}
        </option>
      ))}
    </SSelect>
  </>
));

function UserInfo(props) {
  console.log(props);
  const { handleSubmit, register, formState } = useForm();
  const [infoPage, setInfoPage] = useState(true);
  const [hasError, setHasError] = useState(false);

  const DATA = props.data;

  useState(() => {
    console.log("delete photo");
  }, [DATA, hasError, infoPage]); //DATA??? ????????? ????????? ?????????????????? ?????? ????????? ????????? ????????????.

  const config = {
    header: { "content-type": "multipart/form-data" },
  };
  const formData = new FormData();
  formData.append("emtyData", null);

  const handleDeletePhoto = () => {
    axios
      .patch("/members/image", formData, config)
      .then((res) => {
        props.editPhoto(
          "https://igrus-webservice-bucket.s3.ap-northeast-2.amazonaws.com/basic.jpeg"
        );
      })
      .catch((err) => {
        const ErrMessage = err?.response?.data?.message;
        console.log(ErrMessage); //????????? ?????? ??? ?????? ?????? ??? ?????? ???????????? ?????????
      });
  };

  function handleEditProfile() {
    if (infoPage) {
      setInfoPage(false);
    } else {
      setInfoPage(true);
    } //?????? ?????? ?????? ?????? ??? state??? ????????? ?????? ???????????? ????????????
  }

  const onSubmit = ({
    department,
    academicStatus,
    grade,
    phone,
    introduce,
  }) => {
    phone = phone //???????????? ????????? "-" ???????????? ??????
      .replace(/[^0-9]/, "")
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    const body = {
      academicStatus: STATUS[academicStatus],
      department: DEPARTMENTS[department],
      grade: GRADE[grade],
      introduce,
      name: DATA.name,
      phone,
    };

    console.log(JSON.stringify(body));

    axios
      .patch("/members/info", body, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res.data.data);
        console.log(props);
        props.putUserInfo(
          DATA.id,
          DATA.email,
          DATA.name,
          DATA.studentId,
          DEPARTMENTS[department],
          GRADE[grade],
          DATA.gender,
          phone,
          DATA.createdDate,
          introduce,
          DATA.imageUrl,
          STATUS[academicStatus],
          DATA.roles,
          DATA.group
        );
        console.log(props.userReducer);
        setHasError(false);
        handleEditProfile();
      })
      .catch((err) => {
        const errMessage = err.response.data.message;
        console.log(errMessage);
        setHasError(true);
      });
  };

  return (
    <>
      <InfoBox>
        <DetailBox title="????????? ?????? ??????">
          <ContentBox>
            <ProfilePhoto>
              <img src={`${DATA.imageUrl}`} alt="profile" />
            </ProfilePhoto>
            {props?.userReducer?.roles?.length > 1 ? (
              <ButtonBox>
                <FileUploadComponent />
                <EditButton type="file" onClick={() => handleDeletePhoto()}>
                  ??????
                </EditButton>
              </ButtonBox>
            ) : null}
          </ContentBox>
        </DetailBox>
        <DetailBox title="?????? ??????">
          {infoPage ? (
            <>
              <InfoText>
                <span>?????? | {DATA.name}</span>
                <span>?????? | {DATA.studentId}</span>
                <span>?????? | {DATA.department}</span>
                <span>?????? | {DATA.grade}</span>
                <span>?????? | {DATA.academicStatus}</span>
                <span>????????? | {DATA.phone}</span>
                <span>?????? | {DATA.introduce}</span>
                {props?.userReducer?.roles?.length > 1 ? (
                  <ButtonBox>
                    <EditButton onClick={() => handleEditProfile()}>
                      ??????
                    </EditButton>
                  </ButtonBox>
                ) : null}
              </InfoText>
            </>
          ) : (
            <>
              <EditForm onSubmit={handleSubmit(onSubmit)}>
                <EditInput>
                  <div>?????? | {DATA.name}</div>
                  {/*<EditProfileInput
                    {...register("name", {
                      required: "name is required.",
                    })}
                    value={DATA.name}
                    type="text"
                    placeholder="*??????"
                    hasError={Boolean(formState.errors?.name?.message)}
                  />*/}
                </EditInput>
                <EditInput>
                  <div>?????? | {DATA.studentId}</div>
                </EditInput>
                <EditInput>
                  <div>?????? | </div>
                  <Select
                    {...register("department", {
                      required: "????????? ?????? ?????? ???????????????.",
                    })}
                    placeholder="??????"
                    options={DEPARTMENTS}
                  />
                </EditInput>
                <EditInput>
                  <div>?????? | </div>
                  <Select
                    {...register("grade", {
                      required: "????????? ?????? ?????? ???????????????.",
                    })}
                    placeholder="??????"
                    options={["1??????", "2??????", "3??????", "4??????", "??? ???"]}
                  />
                </EditInput>
                <EditInput>
                  <div>?????? | </div>
                  <Select
                    {...register("academicStatus", {
                      required: "?????? ????????? ?????? ?????? ???????????????.",
                    })}
                    placeholder="?????? ??????"
                    options={["??????", "??????", "??????"]}
                  />
                </EditInput>
                <EditInput>
                  <div>????????? | </div>
                  <EditProfileInput
                    {...register("phone", {
                      required: "???????????? ?????? ?????? ???????????????.",
                    })}
                    defaultValue={DATA.phone.replace(/-/g, "")}
                    type="tel"
                    placeholder="*????????????"
                    hasError={Boolean(formState.errors?.password?.message)}
                  />
                </EditInput>
                <EditInput>
                  <div>?????? | </div>
                  <EditProfileInput
                    {...register("introduce")}
                    defaultValue={DATA.introduce}
                    type="text"
                    placeholder="??????"
                    hasError={Boolean(formState.errors?.password?.message)}
                  />
                </EditInput>
                {hasError ? (
                  <FormError>?????? ????????? ?????? ??????????????????.</FormError>
                ) : null}
                <ButtonBox>
                  <SubmitButton type="submit" />
                </ButtonBox>
              </EditForm>
            </>
          )}
        </DetailBox>
      </InfoBox>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
