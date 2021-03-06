import { SideBox, SideContent, SideBoldContent } from "./../../shared/SideBarElements";
import * as React from "react";
import { Link } from "react-router-dom";

function SideBar(props) {
    const {posts = [], getFilter = () => {}, target, linkHeader, userId} = props

    console.log("새로운 사이드 바!");
    console.log(props);

    function handleOnClick(e) {
      getFilter(e.target.id);
    }
  
    const printData = posts.map((content) =>
        content.boardName.toString() === target ? (
            <SideBoldContent id={content.boardName} key={content.boardName} onClick={handleOnClick} data-index={posts.indexOf(content)}>
                {content.boardName}
            </SideBoldContent>
            
        ) : (
            <Link to={`/${linkHeader}/${content.param}/1/${userId}`}>
            <SideContent id={content.boardName} key={content.boardName} onClick={handleOnClick} data-index={posts.indexOf(content)}>
                {content.boardName}
            </SideContent>
            </Link>
        )
    );
  
    return (
      <>
        <SideBox>{printData}</SideBox>
      </>
    );
  }
  export default React.memo(SideBar);