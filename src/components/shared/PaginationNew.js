import React from "react";
import {
  PaginationSection,
  Pagebtn,
  BtnSpan,
  BtnBox,
  MovePageInput,
  MovePageSubmit,
} from "./PaginationElements";
import { useNavigate } from "react-router-dom";

function Pagination(props) {
  const { total, page, linkHeader, param, searchParams } = props;
  const totalNumPages = total;
  const numPages = totalNumPages > 4 ? 5 : totalNumPages;
  const [current, setCurrent] = React.useState(page);
  const displayRightEl = React.useRef(null);
  const displayLeftEl = React.useRef(null);
  const navigate = useNavigate();

  const showBtnBox = (e) => {
    if (e.target.dataset.direction === "right") {
      if (displayRightEl.current.style.display === "block") {
        displayRightEl.current.style.display = "none";
      } else {
        displayRightEl.current.style.display = "block";
      }
    } else {
      if (displayLeftEl.current.style.display === "block") {
        displayLeftEl.current.style.display = "none";
      } else {
        displayLeftEl.current.style.display = "block";
      }
    }
    setCurrent(page);
    setCurrent(page);
  };

  const movePage = () => {
    if (current > 0 && current <= totalNumPages) {
      displayLeftEl.current.style.display = "none";
      displayRightEl.current.style.display = "none";
      changePage(current);
    } else {
      //경고를 넣을 것인지 추후에
    }
  };

  const changePage = (page) => {
    console.log("page가 바뀔때마다 동작!");
    if (param.isSearch === "false") {
      navigate(`/${linkHeader}/${param.boardId}/${page}/${param.sorted}/false`);
    } else if (param.isSearch === "true") {
      let url = `/${linkHeader}/${param.boardId}/${page}/${
        param.sorted
      }/true?option=${searchParams.get("option")}&keyword=${searchParams.get(
        "keyword"
      )}`;
      url = url.replace(/\+/g, "%2B");
      navigate(url);
    }
  };

  return (
    <>
      {page < 5 ? (
        <PaginationSection>
          <Pagebtn onClick={() => changePage(page - 1)} disabled={page === 1}>
            {" "}
            {"<"}{" "}
          </Pagebtn>

          {Array(numPages)
            .fill()
            .map((a, i) => (
              <Pagebtn
                key={i + 1}
                onClick={() => changePage(i + 1)}
                aria-current={page === i + 1 ? "page" : null}
              >
                {i + 1}
              </Pagebtn>
            ))}

          <Pagebtn
            onClick={() => changePage(page + 1)}
            disabled={page >= totalNumPages}
          >
            {">"}
          </Pagebtn>
        </PaginationSection>
      ) : (
        <PaginationSection>
          <Pagebtn onClick={() => changePage(page - 1)} disabled={page === 1}>
            {" "}
            {"<"}{" "}
          </Pagebtn>

          <BtnSpan>
            <Pagebtn
              onClick={showBtnBox}
              disabled={page === totalNumPages}
              data-direction={"left"}
            >
              {"..."}
            </Pagebtn>

            <BtnBox ref={displayLeftEl}>
              <MovePageInput
                type={"number"}
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
              ></MovePageInput>
              <MovePageSubmit onClick={movePage}>페이지</MovePageSubmit>
            </BtnBox>
          </BtnSpan>

          <Pagebtn onClick={() => changePage(page - 2)}>{page - 2}</Pagebtn>

          <Pagebtn onClick={() => changePage(page - 1)}>{page - 1}</Pagebtn>

          <Pagebtn
            onClick={() => changePage(page)}
            aria-current={page ? "page" : null}
          >
            {page}
          </Pagebtn>

          {page + 1 <= totalNumPages ? (
            <Pagebtn onClick={() => changePage(page + 1)}>{page + 1}</Pagebtn>
          ) : null}

          {page + 2 <= totalNumPages ? (
            <Pagebtn
              onClick={() => changePage(page + 2)}
              aria-current={page === page - 2 ? "page" : null}
            >
              {page + 2}
            </Pagebtn>
          ) : null}
          <BtnSpan>
            <Pagebtn
              onClick={showBtnBox}
              disabled={page === totalNumPages}
              data-direction={"right"}
            >
              {"..."}
            </Pagebtn>
            <BtnBox ref={displayRightEl}>
              <MovePageInput
                type={"number"}
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
              ></MovePageInput>
              <MovePageSubmit onClick={movePage}>페이지</MovePageSubmit>
            </BtnBox>
          </BtnSpan>
          <Pagebtn
            onClick={() => changePage(page + 1)}
            disabled={page === totalNumPages}
          >
            {">"}
          </Pagebtn>
        </PaginationSection>
      )}
    </>
  );
}

export default React.memo(Pagination);
