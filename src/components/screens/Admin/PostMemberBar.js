import styled from "styled-components";
import * as React from "react"
import {PostInforBar,PostCotent,Grade,StudentId,PhoneNumber,Name,PostRole,PostAttendance,PostGender,PostNumber,CheckBtn,SmallCheckBtn} from "./../../shared/BoardElement"
import axios from "axios";
import { connect } from "react-redux";
import { actionCreators } from "../../../store";
import OptionButton from "./OptionBtn"

const printRole = (value) => {
    if(value.includes("ROLE_CLUB_PRESIDENT")){
        return "회장"
    }
    else if(value.includes("ROLE_GROUP_PRESIDENT")){
        return "운영진"
    }
    else if(value.includes("ROLE_CLUB_EXECUTIVE")){
        return "운영진"
    }
    else if(value.includes("ROLE_GROUP_EXECUTIVE")){
        return "운영진"
    }
    else if(value.includes("ROLE_MEMBER")){
        return "일반"
    }
    else if(value.includes("ROLE_GUEST")){
        return "게스트"
    }
    else if(value.includes("ROLE_BAN")){
        return "밴"
    }
    else if(value.includes("ROLE_RESIGN")){
        return "사직"
    }
}

function mapDispatchToProps(dispatch){
    return{
      setAll: (boardId,page,isSearching,selected,boardCategoryName) => dispatch(actionCreators.setAll(boardId,page,isSearching,selected,boardCategoryName)),
    }
  }

function mapStateToProps(state) {
    return state;
  }

function PostMemberBar(props) { // 
    const [show, setShow] = React.useState(-1);

    //console.log(props);
    let postdata = "";
   if (props.groupList) {
       console.log(props.groupList);
   }

   if(props.data[0] !== undefined && props.data[0].member === undefined){
    postdata = props.data.map((data)=>
    <PostInforBar key={data.id}>
        <PostCotent>
            <PostNumber>{data.id}</PostNumber>
            <Grade post>{data.grade}</Grade>
            <StudentId>{data.studentId}</StudentId>
            <PhoneNumber post>{data.phone}</PhoneNumber>
            <Name>{data.name}</Name>
            <PostRole>{printRole(data.roles)}</PostRole>
            <PostAttendance>{data.academicStatus}</PostAttendance>
            <PostGender>{data.gender}</PostGender>
            <OptionButton id={data.id} setShow={setShow} show={show} data={data}/>
        </PostCotent>
    </PostInforBar>
    )
}


    return (
        <>
        {postdata}
            {/* <PostInforBar >
                <PostCotent>
                    <PostNumber>{1}</PostNumber>
                    <Grade post>{1}</Grade>
                    <StudentId>{12141595}</StudentId>
                    <PhoneNumber post>{"data.phone"}</PhoneNumber>
                    <Name>{"data.name"}</Name>
                    <PostRole>{printRole(["ROLE_CLUB_PRESIDENT"])}</PostRole>
                    <PostAttendance>{"재학"}</PostAttendance>
                    <PostGender>{"남"}</PostGender>
                    <OptionButton id={1} setShow={setShow} show={show}/>
                </PostCotent>
            </PostInforBar>
            <PostInforBar >
                <PostCotent>
                    <PostNumber>{1}</PostNumber>
                    <Grade post>{1}</Grade>
                    <StudentId>{12141595}</StudentId>
                    <PhoneNumber post>{"data.phone"}</PhoneNumber>
                    <Name>{"data.name"}</Name>
                    <PostRole>{printRole(["ROLE_CLUB_PRESIDENT"])}</PostRole>
                    <PostAttendance>{"재학"}</PostAttendance>
                    <PostGender>{"남"}</PostGender>
                    <OptionButton id={2} setShow={setShow} show={show}/>
                </PostCotent>
            </PostInforBar> */}
        </>
    );
}

export default React.memo(connect(mapStateToProps,mapDispatchToProps)(PostMemberBar));