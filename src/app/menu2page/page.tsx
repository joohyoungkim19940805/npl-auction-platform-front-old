/*
  {
    "postId": 1,
    "id": 1,
    "name": "id labore ex et quam laborum",
    "email": "Eliseo@gardner.biz",
    "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
  },
*/
'use client'
import { useState } from 'react';
const Menu2Page = () => {
    const [userList, setUserList] = useState(null);
    const fetchData = async () => {
        const response = await window.fetch(`/api/user/list2`,{
            method: 'GET'
        });
        const data = await response.json();
        console.log(data);
        setUserList(data.data);
    };
    return (
        <div>
            <div style={{color:"red"}}>
                <span>222</span>
            </div>
            <button onClick={()=>fetchData()}>click is call (server api) notice board commant list ... ==</button>
            { ! userList || (userList as Array<any>).length == 0 ? <></> :  
                (userList as Array<any>).map(item=>{
                    return (
                        <div>
                            <div> id :: {item.id}</div>
                            <div> name :: {item.name}</div>
                            <div> email :: {item.email}</div>
                            <div> body :: {item.body}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Menu2Page