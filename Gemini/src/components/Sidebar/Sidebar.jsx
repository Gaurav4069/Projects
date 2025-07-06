import React, { useContext, useState } from 'react'
import "./Sidebar.css"
import {assets} from  '../../assets/assets.js'
import { Context } from '../../context/Context.jsx'

const Sidebar = () => {

const [extend, setextend] = useState(false)

  const collapseSidebar = ()=>{
     setextend(prev=>!prev)
  }

 const{onSent,prevPrompts,setRecentPrompt,newChat}=useContext(Context)

 const loadprompt = async (prompt)=>{
   setRecentPrompt(prompt)
   await onSent(prompt)
 }
  return (
    <div className='sidebar'>
      <div className="top">
    <img onClick={collapseSidebar} className='menu' src={assets.menu_icon} alt='sidebar' />
    <div onClick={newChat} className="new_chat">
      <img src={assets.plus_icon} alt="newChat" />
      {extend?<p>New Chat</p>:null} 
    </div>
    {extend ? <div className="recent">
      <p className="recent-title">Recent</p>
      {prevPrompts.map((item,index)=>{
         return (
          <div onClick={()=>loadprompt(item)} className="recent-entry">
          <img src={assets.message_icon} alt="MessageIcon" />
          <p>{item.slice(0,18)}...</p>
        </div>
         )
      })}
     
    </div>:null}
    
      </div>
      <div className="bottom">
    <div className="bottom-item recent-entry">
      <img src={assets.question_icon} alt="questionIcon" />
      {extend?<p>Help </p>:null}
      
    </div>
    <div className="bottom-item recent-entry">
      <img src={assets.history_icon} alt="HistoryIcon" />
      {extend?<p>History</p>:null}
     
    </div>
    <div className="bottom-item recent-entry">
      <img src={assets.setting_icon} alt="SettingIcon" />
      {extend?<p>Settings</p>:null}
      
    </div>
      </div>

    </div>
  )
}

export default Sidebar