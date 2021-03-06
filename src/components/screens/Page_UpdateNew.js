import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
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
import { Editor } from "@toast-ui/react-editor";
import Checkbox from "./../shared/Checkbox";
import axios from "axios";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return state;
}

const checkNotice = (type) => {
  // 공지글인지 아닌지 확인
  if (type === "NORMAL") {
    return false;
  } else {
    return true;
  }
};

function Page(props) {

    
    const location = useLocation().state;
    const pageData = location.pageData
    const editorRef = React.createRef();
    const [notice, setNotice] = React.useState(checkNotice(pageData.type))
    const [secret,setSecret] = React.useState(pageData.secretFlag)
    const [title,setTitle] = React.useState(pageData.title);
    const [isSecret, setIsSecret] = React.useState(false); // 비밀글을 설정할 수 있는지 확인
    const Navigate = useNavigate()
    //const isAuthority =   props.userReducer.roles.some(i => ["ROLE_GROUP_EXECUTIVE","ROLE_GROUP_PRESIDENT","ROLE_CLUB_EXECUTIVE","ROLE_CLUB_PRESIDENT"].includes(i))
    const isClubExecutives =   props.userReducer.roles.some(i => ["ROLE_CLUB_EXECUTIVE","ROLE_CLUB_PRESIDENT"].includes(i))
    const isGroupExecutives =   props.userReducer.roles.some(i => ["ROLE_GROUP_EXECUTIVE","ROLE_GROUP_PRESIDENT"].includes(i))


  React.useEffect(() => {
    axios
    .get(`/boards/categories`, {})
    .catch(function (error) {
      console.log(error.toJSON());
    })
    .then(function (res) {
      const inputText = editorRef.current.getInstance(); // 수정할 내용을 불러옴.
      inputText.setHTML(pageData.content);
      console.log(pageData);
      const category = [...res?.data?.data?.boards?.filter((element) => element?.boardName === pageData?.board)];
      console.log(category);
      setIsSecret(category[0].boardSecretFlag)
      console.log(category[0].boardSecretFlag);
    });

  }, []);


    const handleNoticeOptionChange = event => { // 공지사항인지 유무
      console.log(!notice);
      if(!notice === true){ //공지글로 설정했을 때
        axios.patch(`/club/executives/boards/pin`,{
            "postId": pageData.postId,
            "type": "NOTICE"
        },{
        })
      }
      else{
        axios.patch(`/club/executives/boards/pin`,{
          "postId": pageData.postId,
          "type": "NORMAL"
      },{
      })
      }
      setNotice(!notice)
    }

    const handleNoticeGroupOptionChange = (e) => {
      console.log(!notice);
      if(!notice === true){ //공지글로 설정했을 때
        axios.patch(`/groups/executives/boards/pin`,{
            "postId": pageData.postId,
            "type": "NOTICE"
        },{
        })
      }
      else{
        axios.patch(`/groups/executives/boards/pin`,{
          "postId": pageData.postId,
          "type": "NORMAL"
      },{
      })
      }
      setNotice(!notice)
    }

    const handleSecretOptionChange = event => { // 비밀 글인지 유무
      setSecret(!secret)

    }


  function printTextBody() {
    const editorInstance = editorRef.current.getInstance();
    const getContent_html = editorInstance.getHTML();
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

  function submit() {
    // 작성 버튼을 눌렀을 시 작동
    const content = printTextBody()

    if(emptyChecker(content) === true){
      alert("제목이나 게시글이 공백이면 작성하실 수 없습니다.")
    }
    else{
      axios
      .put(
        `/posts`,
        {
          content: content,
          postId: pageData.postId,
          secretFlag: secret,
          title: title,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .catch(function (error) {
        console.log(error.toJSON());
      })
      .then(function (res) {
        console.log(res);
        //Navigate("/board", {state:{category:location.subCategory, page:1}});
        Navigate(-1);
      });
    }

    

     }



//initialValue={data.title}


  //initialValue={data.title}

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
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            ref={editorRef}
          />
          <BtnSection>

            <GoToList onClick={()=>{Navigate(-1);}}>목록으로</GoToList>
            <Right>

            {(isClubExecutives === true && location.category !== "소모임")?
                          <SetOption>
                          <Text><span style={{ marginRight: 8 }}>공지글 설정하기</span></Text>
                          <Checkbox
                            checked={notice}
                            onChange={handleNoticeOptionChange}
                          />
                        </SetOption>
              :
              null}
                {(isGroupExecutives === true && location.category === "소모임")?
                  <SetOption>
                    <Text><span style={{ marginRight: 8 }}>공지글 설정하기</span></Text>
                    <Checkbox
                      checked={notice}
                      onChange={handleNoticeGroupOptionChange}
                    />
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