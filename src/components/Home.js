import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import Styled from "styled-components";
import { AuthContext } from "../App";
import Repo  from "./Repo";


export default function Home() {
  const { state, dispatch } = useContext(AuthContext);
  const [responseData, setResponseData] = useState({})
  const [errorMessage, setErrorMessage] = useState("");

  if (!state.isLoggedIn) {
    return <Redirect to="/login" />;
  }

  const { avatar_url, name, public_repos, followers, following } = state.user

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT"
    });
  } 

  const handleSelection = (selection) => {
    if(selection === "public_repos" || selection === "followers" || selection === "following" || selection ==="activity"){
      const proxy_url_getDetails = state.proxy_url_getDetails;
      const getDataFromLocal = JSON.parse(localStorage.getItem("user"));
      let requestType;

      if(selection === "public_repos"){
        requestType = "repos"
      }
      if(selection === "followers"){
        requestType = "followers"
      }
      if(selection === "following"){
        requestType = "following"
      }
      if(selection === "activity"){
        requestType = "activity"
      }

      const requestData = {
        username : getDataFromLocal.login,
        requestType: requestType
      }

      fetch(proxy_url_getDetails, {
        method: "POST",
        body: JSON.stringify(requestData)
      })
      .then(response => response.json())
      .then(data => {
        const responseData = data.map(({ name, language, html_url, created_at, description, login, avatar_url, id, type }) => {
          return { name, language, html_url, created_at, description, login, avatar_url, id, type };
      })
      setResponseData( responseData );
    }).catch(error => {
      console.log(`inside getrepos error: ${error}`)
      setErrorMessage({
        errorMessage: error.response.statusText
      })
  })
}
}

 const displayRepos = () => {
    return responseData.map((gitData, index) => <Repo key={index} gitData={gitData} />);
  }

  return (
    <Wrapper>
      <div className="container">
        <button onClick={()=> handleLogout()}>Logout</button>
        <div>
          <div className="content">
            <img src={avatar_url} alt="Avatar"/>
            <span>{name}</span>
            <a onClick={() => handleSelection("public_repos")}><span>{public_repos} <b>Repos</b> </span></a>
            <a onClick={() => handleSelection("followers")}><span>{followers} <b>Followers </b></span></a>
            <a onClick={() => handleSelection("following")}><span>{following}<b> Following </b></span></a>
            <a onClick={() => handleSelection("activity")}><span><b> Activity </b></span></a>
          </div>
          <div className="repo-content">
            {responseData.length > 0 && displayRepos()}
          </div>
            
        </div>
      </div>
      <div>
      </div>
    </Wrapper>
  );
}

const Wrapper = Styled.section`
.container{
  display: ;
  flex-direction: column;
  height: 100vh;
  font-family: Arial;

  button{
    all: unset;
    width: 100px;
    height: 35px;
    margin: 10px 10px 0 0;
    align-self: flex-end;
    background-color: #0041C2;
    color: #fff;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #0041C2;
    float:right;  

    &:hover{
      background-color: #fff;
      color: #0041C2;
    }
  }

  >div{
    width: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 50px;

    .content{
      display: flex;
      flex-direction: column;
      align-self: flex-start;
      padding: 20px 100px;    
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
      width: auto;
      a:hover{
        cursor: pointer; 
      }
      img{
        height: 150px;
        width: 150px;
        border-radius: 50%;
      }
  
      >span:nth-child(2){
        margin-top: 20px;
        font-weight: bold;
      }
  
      >span:not(:nth-child(2)){
        margin-top: 8px;
        font-size: 14px;
      }
     
    }
    .repo-content{
      width: auto;
    .repo-detail-container{
      padding: 20px;
      flex-direction: column;
      font-family: Arial;
      justify-content: left;
  
      .avatar{
          display: inline-block;
          img{
              height: 100px;
              width: 100px;
              border-radius: 50%;
            }
      }
     
      .repo-info{
          display: inline-block;
          position: relative;
          margin: 13px 0px 0px 11px;
      }
  }
}

  }
 
}
`;