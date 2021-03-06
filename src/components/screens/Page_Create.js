import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import Checkbox from "./../shared/Checkbox";
import axios from "axios";
import { connect } from "react-redux";
import {
  Background,
  Content,
  Category,
  Header,
  Title,
  OtherDetail,
  BtnSection,
  GoToList,
  Right,
  SetOption,
  Text,
  Write,
} from "./../shared/PageElements";
import { usePrompt } from "./../Blocker";
import { useBeforeunload } from "react-beforeunload";

function mapStateToProps(state) {
  return state;
}

let file;
let filecheck = false



function Page(props) {
  console.log(props);
  const [refreshCheck, setRefreshCheck] = React.useState(true);
  const location = useLocation().state;
  console.log(location);
  const {isSecret} = location;
  const [secret, setSecret] = React.useState(false);
  const [notice, setNotice] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [postImageIds, setPostImageIds] = React.useState([]);
  
  usePrompt('현재 작성중인 페이지에서 벗어나시겠습니까?', refreshCheck)

  const editorRef = React.useRef();

  const Navigate = useNavigate(); 
  const isClubExecutives =   props.userReducer.roles.some(i => ["ROLE_CLUB_EXECUTIVE","ROLE_CLUB_PRESIDENT"].includes(i))
  const isGroupExecutives =   props.userReducer.roles.some(i => ["ROLE_GROUP_EXECUTIVE","ROLE_GROUP_PRESIDENT"].includes(i))


  const handleSecretOptionChange = (event) => {
    setSecret(!secret);
  };

  const isNotice = () => {
    if (notice === false) {
      return "NORMAL";
    } else {
      return "NOTICE";
    }
  };

  const handleNoticeOptionChange = (event) => {
    setNotice(!notice);
  };

  function printTextBody() {
    const deitorInstance = editorRef.current.getInstance();
    const getContent_html = deitorInstance.getHTML();
    return getContent_html;
  }

  const emptyChecker = (content) => {
    if(title === "" || content === null || content === undefined){
      console.log(title);
      console.log(content);
      return true;
    }
    return false;
    
  }


  function submit(){
    setRefreshCheck(false)
    
    const data = {
      "boardId": location.boardId,
      "content": printTextBody(),
      "postImage":postImageIds,
      "secretFlag": secret,
      "title": title,
      "type": isNotice()
    }

    if(emptyChecker(data.content) === true){
      alert("제목이나 게시글이 공백이면 작성하실 수 없습니다.")
    }
    else{
      let postCreateRequest  = new FormData();
      postCreateRequest.append("postCreateRequest", new Blob([JSON.stringify(data)], {type : 'application/json'}))
 
      console.log("ddasdasdasadad");
 
      if(filecheck){
       postCreateRequest.append('file',file);
     }
 
     axios.post(`/posts`,postCreateRequest,{
       headers: {
         "content-type": "multipart/mixed"
       }
     })
     .catch(function (error) {
       console.log(error.toJSON());
       //console.log("코드가 반복인가? 2");
     })
     .then(function (res) {
       //"content-type": "multipart/form-data"
       console.log(res);
       console.log("깃허브도 새롭게 업데이트 되었다!1");
       
       Navigate(-1);
     })

    }




  }

  React.useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().removeHook("addImageBlobHook");
      editorRef.current
        .getInstance()
        .addHook("addImageBlobHook", (blob, callback) => {
          (async () => {
            let formData = new FormData();
            formData.append("image", blob);
            let imageUrl;
            axios
              .post(`/posts/image`, formData, {
                headers: {
                  "content-type": "multipart/form-data",
                },
              })
              .then(function (res) {
                console.log(res);
                imageUrl = res.data.data.imageUrl;
                const postImageId = res.data.data.postImageId;
                setPostImageIds((current) => [...current, postImageId]);
                callback(imageUrl, "iamge");
              });
          })();
          return false;
        });
    }

    return () => {};
  }, [editorRef]);

  const handleTest = (e) => {
    console.log(e.target.files[0]);
    file = e.target.files[0]
    console.log(e.target.files);
    filecheck = true;
  };

  
  useBeforeunload((event) => {
    if (refreshCheck === true) {
      event.preventDefault();
    }
  });
  

  return (
    <div>
      <Background>
        <Content>
          <Category>
            {location.category}|{location.subCategory}
          </Category>
          <Header>
            <Title
              type="text"
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Title>
            <OtherDetail>{props.userReducer.name}</OtherDetail>
          </Header>
          <Editor
            placeholder="본문을 적어주세요."
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            ref={editorRef}
          />
          <input type="file" id="docpicker" onChange={handleTest}></input>

          <BtnSection>

            <GoToList onClick={()=>{Navigate(-1);}}>목록으로</GoToList>
            <Right>
              {(isClubExecutives === true && location.category !== "소모임")?
                          <SetOption>
                          <Text><span style={{ marginRight: 8 }}>공지글 설정하기</span></Text>
                          <Checkbox checked={notice} onChange={handleNoticeOptionChange}/>
                        </SetOption>
              :
              null}
              {(isGroupExecutives === true && location.category === "소모임") ?
                <SetOption>
                  <Text><span style={{ marginRight: 8 }}>공지글 설정하기</span></Text>
                  <Checkbox checked={notice} onChange={handleNoticeOptionChange} />
                </SetOption>
                :
                null}

              {(isSecret === true) ?
                <SetOption>
                  <Text>
                    <span style={{ marginRight: 8 }}>비밀글 설정하기</span>
                  </Text>
                  <Checkbox
                    checked={secret}
                    onChange={handleSecretOptionChange}
                  />
                </SetOption>
                :
                null
              }

              <Write onClick={submit}>작성</Write>
            </Right>
          </BtnSection>
        </Content>
      </Background>
    </div>
  );
}
export default connect(mapStateToProps)(Page);
