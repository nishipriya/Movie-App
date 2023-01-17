import React, {useEffect, useState} from 'react'
import './App.css';
export default function App() {
  const [data, setData] = useState([]);
  const [dataClick, setDataClick] = useState(true);
  const [dataClickView, setDataClickView] = useState(false);
  const [dataId, setDataId] = useState({});

  //local_storage_code
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [time, setTime] = useState('');

  const handle = () => {
    localStorage.setItem('Id',document.querySelectorAll('input')[0].value);
    localStorage.setItem('Movie_Name',document.querySelectorAll('input')[1].value); 
    localStorage.setItem('Movie_Lang',document.querySelectorAll('input')[2].value); 
    localStorage.setItem('Movie_Day',document.querySelectorAll('input')[3].value);   
    localStorage.setItem('Fname',name);
    localStorage.setItem('Email',email);
    localStorage.setItem('Mobile',number);
    localStorage.setItem('Time',time);
    
    alert("Movie Book Done")
 };

  useEffect(() => {
      getPost();
      // getFetchPost();
  }, [])
  // useEffect(() => {
  // getFetchPost(dataClick);
  // }, [dataClick])
  const getPost = async () => {
      fetch('https://api.tvmaze.com/search/shows?q=all').then(res => res.json()).then(res => setData(res))
  }
  const getFetchPost = async (dataClick) => {
      fetch(`https://api.tvmaze.com/shows/${dataClick}`).then(res => res.json()).then(res => setDataId(res))
  }
  const handleClick = (data) => {
      const {id} = data?.show
      // setDataClick(id)
      getFetchPost(id)
      setDataClick(false)
      setDataClickView(true)
  }
  console.log(dataId)
return (
  <div className='container' style={{display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"32px"}}>
  {dataClick && data.map((res, index) => (
      <div style={{width:"220px", height:"100%", background:"#f9f9f9", padding:"15px", borderRadius:"15px"}} key={index}>
          <img src={res?.show?.image?.original} height="220px" style={{borderRadius:"5px"}}/>
          <p>{res?.show.id || '-'}</p>
          <p>{res?.show.name || "-"}</p>
          <p>{res?.show.language || "-"}</p>
          <p>{res?.show?.schedule?.days[0] || "-"}</p>
          <button onClick={() => handleClick(res)}>View Details</button>
      </div>
  ))}
  { dataClickView &&
  <center>
      <div style={{padding:"10px"}}>
          <img src={dataId.image?.original} height="220px" style={{borderRadius:"5px"}}/>
          <div style={{width:"100%", padding:"10px"}}>
          <input type="text" value={dataId.id || '-'} name= 'id' readOnly className='input_color'/>
          <input type="text" value={dataId.name || "-"}  name= 'name' readOnly className='input_color'/>
          <input type="text" value={dataId.language || "-"} readOnly className='input_color'/>
          <input type="text" value={dataId.schedule?.days[0] || "-"}readOnly className='input_color'/>
          <input type="text" id="fname" name="fnames" value={name} placeholder="Enter your name.." onChange={(e) => setName(e.target.value)}/>
          <input type="text" id="email" name="emails" value={email} placeholder="Enter your email.." onChange={(e) => setEmail(e.target.value)}/>
          <input type="text" id="mobile" name="mobiles" value={number} placeholder="Enter your mobile number.." onChange={(e) => setNumber(e.target.value)}/>
          <select id="country" name="country" onChange={(e) => setTime(e.target.value)}>
          <option value="">..Select Time Solt..</option>
          <option value="10am-1pm">10am-1pm</option>
          <option value="2pm-5pm">2pm-5pm</option>
          <option value="6pm-9pm">6pm-9pm</option>
          <option value="10pm-1am">10pm-1am</option>
         </select>
          {/* <p>{dataId.id || '-'}</p>
          <p>{dataId.name || "-"}</p>
          <p>{dataId.language || "-"}</p>
          <p>{dataId.schedule?.days[0] || "-"}</p> */}
          <br/><button onClick={() => {
              setDataClick(true) 
              setDataClickView(false)
          }}>Back</button> <br/>
         <br/> <button onClick={handle}>Book Movie</button>
          </div>
      </div>
      </center>
  }
  </div>
)
}
