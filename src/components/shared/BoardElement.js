import styled from "styled-components";
import img from './../../images/Polygon.jpg'
import {Link} from "react-router-dom"

export const SearchBarSection = styled.div`
  width: 910.07px;
  margin: 0 auto;
  min-height: 64px;

  border-bottom: 2px solid #0B665C;
  font-size: 14px;
  display: flex;
  flex-direction: row;
 
`
export const SearchBarForm = styled.form`
display: flex;
flex-direction: row;
margin-left: 20px;
margin-top: 16px;
`
export const SearchBarSelect = styled.select`
width: 117px;
height: 32px;
padding-left: 8px;
border-radius: 50px;
line-height: 16.41px;
color: #C4C4C4;
border: 1px solid #C4C4C4;


-moz-appearance: none;
-webkit-appearance: none;
appearance: none;
background:url(${img});
background-repeat: no-repeat;
background-size: 17px 17px;
background-position: bottom 8px right 11px;
`
export const SearchBar = styled.div`
margin-left: 9px;
position: relative;
`
export const SearchBarInput = styled.input`
min-width: 331.48px;
height: 31.59px;
border: 1px solid #C4C4C4;
border-radius: 50px;
padding-left: 19.87px;
`
export const SearchBarSubmit = styled.input`
position: absolute;
right: 3.71px;
top: 4.25px;
width: 28.9px;
height: 25.27px;
border:none;
border-radius: 50px;
border-color: #C4C4C4; 
background-color:#C4C4C4; 
`

export const SearchBarFilter = styled.select`
width: 60.52px;
height: 16.59px;
line-height: 16.41px;
margin-top: 24px;
margin-left: 100.52px;
border: none;

-moz-appearance: none;
-webkit-appearance: none;
appearance: none;

background:url(${img});
background-repeat: no-repeat;
background-size: 12.35px 10.43px;
background-position: right 2px bottom 2px;
`

export const CreateBtnLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0b665c;
  width: 110px;
  height: 33px;
  border-radius: 16.5px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-left: 100.32px;
  margin-top: 15.85px;
`

export const InforBar = styled.div`
font-size: 14px;
font-weight: 700;
line-height: 16.41px;
width: 909.07px;
margin: 0 auto;
min-height: 34px;
border-bottom: 2px solid #0B665C; 
`
export const InforContents = styled.div`
padding-top: 10px;
display: flex;
flex-direction: row;
text-align: center;
`
export const Number = styled.div`
min-width: 65px;
text-align: center;
margin-left: 25px;
`

export const Categorization = styled.div`
width: 90px;
text-align: center;
margin-left: 4px;
`
export const Title = styled.div`
width: 373px;
margin-left: 31px;
`

export const Writer = styled.div`
width: 77px;
text-align: center;
`

export const Date = styled.div`
width: 63px;
text-align: center;
margin-left: 16px;
`

export const Hits = styled.div`
width: 40px;
text-align: center;
margin-left: 11px;
`

export const Recommendation = styled.div`
width: 40px;
text-align: center;
margin-left: 9px;
`

export const Comment = styled.div`
width: 40px;
text-align: center;
margin-left: 7px;
`

export const Grade = styled.div`
width: 28px;
text-align: center;
margin-left: 25px;
`
export const StudentId = styled.div`
width: 63px;
text-align: center;
margin-left: 25px;
`
export const Major = styled.div`
width: 100px;
margin-left: 25px;
`
export const Apply = styled.div`
width: 83px;
margin-left: 25px;
text-align: center;
`
export const Name = styled.div`
width: 79px;
text-align: center;
margin-left: 25px;
`
export const Role = styled.div`
width: 56px;
text-align: center;
margin-left: 25px;
`
export const Attendance = styled.div`
width: 30px;
text-align: center;
margin-left: 25px;
`
export const Age = styled.div`
width: 28px;
text-align: center;
margin-left: 25px;
`
export const Permission = styled.div`
width: 28px;
text-align: center;
margin-left: 25px;
height: 16px;
`

export const Withdraw = styled.div`
width: 28px;
text-align: center;
margin-left: 25px;
height: 16px;
`
export const PostInforBar = styled.div`
width: 909.07px;
height: 31px;
margin: 0 auto;
font-size: 14px;
line-height: 16.41px;
border-bottom: 1px solid black;
`
export const PostCotent = styled.div`
padding-top: 8px;
display: flex;
flex-direction: row;
`