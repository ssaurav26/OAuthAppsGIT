import React from 'react';

function Repo ({ gitData: {name, language, html_url, created_at, description, login, avatar_url,id, type } }){
    return (
        <React.Fragment>
            <div class="repo-detail-container">
                {avatar_url && <div className="avatar"><img src={avatar_url}/></div>}
                <div className="repo-info">
                    {name && <div><b>Name:</b> {name}</div>}
                    {id && <div><b>Id:</b> {id}</div>}
                    {type && <div><b>Type:</b> {type}</div>}
                    {login && <div> <b>Name: </b>{login}</div>}
                    {language && <div><b>Language:</b> {language}</div>}
                    {html_url && <div><b>Repository Path:</b> <a href={html_url} >{html_url}</a></div>}
                    {created_at && <div><b>Created At: </b>{created_at}</div>}
                    {description && <div><b>Description: </b>{description}</div>}
                </div>
            </div>
        </React.Fragment>
    )
}


export default Repo;