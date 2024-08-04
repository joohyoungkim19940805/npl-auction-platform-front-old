/*

  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
*/
'use client'
import { useState } from 'react';
const Menu1Page = () => {
    const [userList, setUserList] = useState(null);
    const fetchData = async () => {
        const response = await window.fetch(`/api/user/list`,{
            method: 'GET'
        });
        const data = await response.json();
        console.log(data);
        setUserList(data.data);
    };
    return (
        <div>
            <span>111</span>
            <button onClick={()=>fetchData()}>click is call (server api) notice board list ... ==</button>
            { ! userList || (userList as Array<any>).length == 0 ? <></> :  
                (userList as Array<any>).map(item=>{
                    return (
                        <div>
                            <div> id :: {item.id}</div>
                            <div> title :: {item.title}</div>
                            <div> body :: {item.body}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Menu1Page