import axios from "axios";
import * as React from "react";
import { connect } from "react-redux";
import {useLocation,useParams } from "react-router-dom";
import PageTitle from "../../shared/PageTitle";
import ScreenTitle from "../../shared/ScreenTitle";
import SideBar from "./SideBar";
import { Content } from "./../Profile/ProfileElements";
import UserInfo from "./UserInfo";
import UserPosts from "./UserPosts"
import UserComments from "./UserComments"
import UserScrape from "./UserScrape"


const mapStateToProps = (state) => {
  return state;
};

const mappingParamBoardName = [
    {param: "infor", boardName: "정보"},
    {param: "posts", boardName: "게시글"},
    {param: "comments", boardName: "댓글"},
    {param: "scraps", boardName: "저장한 게시글"},
]

const mapping = (param) => {
    const boardName = mappingParamBoardName.find((item) => item.param === param).boardName
    return boardName
}

function OtherProfile(props) {
  const location = useLocation();
  const param = useParams();

  const [target, setTarget] = React.useState(null);
  const [info, setInfo] = React.useState(null);

  const [load, setLoad] = React.useState(false); // load유무로 location의 값이 바뀐 뒤에 렌더
  const [renderComponent, setRenderComponent] = React.useState(null);
  const DATA = props.userReducer;
  const input = useLocation();


  React.useEffect(()=>{
      axios.get(`/members/info/${param.userid}`)
      .catch(function (error) {
        console.log(error.toJSON());
      })
      .then(function (res) {
        console.log(res);
        setInfo(res.data.data.info)
        setTarget(mapping(param.category));
        if (param.category === "infor") {
          console.log("infor");
          setRenderComponent((current) =><UserInfo data={res.data.data.info} />);
        }
        else if (param.category === "posts") {
          console.log("posts");
          setRenderComponent((current) => <UserPosts />);
        }
        else if (param.category === "comments") {
          console.log("comments");
          setRenderComponent((current) => <UserComments />) ;
        }
        else if (param.category === "scraps") {
          console.log("scraps");
          setRenderComponent((current) =><UserScrape />);
        }
      })
  },[location])

  return (
    <>
      <PageTitle title="프로필" />
      <SideBar
            posts={mappingParamBoardName}
            getFilter={setTarget}
            target={target}
            linkHeader={"profile"}
            userId={param.userid}
          ></SideBar>
      <Content>
        <ScreenTitle>{`프로필 | ${target}`}</ScreenTitle>
        {renderComponent}
      </Content>
    </>
  );
}
export default connect(mapStateToProps)(OtherProfile);