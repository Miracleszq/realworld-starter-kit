import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../../components/Header/Header'

export default function CreatArticle() {
    let history = useHistory()
    const [title,setTitle] = useState()
    const [description,setDescription] = useState()
    const [body,setBody] = useState()
    const [tag,setTag] = useState([])
    function upDataArticle() {
        let obj = {
            "article": {
                "title": title,
                "description": description,
                "body": body,
                "tagList": tag,
            }
        }
        
        axios({
            url: '/api/articles',
            method: "POST",
            data: obj,
            headers: {
              Authorization:`Token ${ sessionStorage.getItem('token')}`,
            }
          }).then(res => {
            if (res.status == 200) {
                history.push('/user')
            }
          })
    }
    return (
        <div>
            <Header></Header>
            <div className="editor-page">
                <div className="container page">
                    <div className="row">

                        <div className="col-md-10 offset-md-1 col-xs-12">
                            <form>
                                <fieldset>
                                    <fieldset className="form-group">
                                        <input type="text" className="form-control form-control-lg" placeholder="Article Title" onChange={(e) =>{setTitle(e.target.value)}}/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input type="text" className="form-control" placeholder="What's this article about?" onChange={(e) =>{setDescription(e.target.value)}}/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <textarea className="form-control" rows="8"
                                            placeholder="Write your article (in markdown)" onChange={(e)=>{setBody(e.target.value)}}></textarea>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input type="text" className="form-control" placeholder="Enter tags" onChange={(e) => {
                                            setTag(e.target.value.trim().split(/\s+/))
                                        }}/>
                                        <div className="tag-list"></div>
                                    </fieldset>
                                    <button className="btn btn-lg pull-xs-right btn-primary" type="button" onClick={() => upDataArticle()}>
                                        Publish Article
                                    </button>
                                </fieldset>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
