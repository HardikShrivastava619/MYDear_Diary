import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TbPencilSearch } from 'react-icons/tb';

const OldEntries = () => {
  const loginData = useSelector((s) => s.loginData);
  const uid = loginData?.user?._id;

  const colorData = useSelector((s) => s.colorData);
  const [searchedEntrie, setsearchedEntrie] = useState("");

  const [entries, setEntries] = useState([]);
  const searchref = useRef();

  const handleSearch = async () => {
    try {
      const searchedDateValue = searchref.current.value;  // This will be in YYYY-MM-DD format

      // Ensure a valid date is selected
      if (!searchedDateValue) {
        throw new Error('Please select a date.');
      }

      // Convert to ISO format with the time portion (2024-11-02T00:00:00.000+00:00)
      const date = new Date(searchedDateValue);
      const isoDate = date.toISOString();

      // Send the ISO date to the backend
      const res = await fetch(`http://localhost:5000/getSearcheDates/${uid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isoDate }), 
      });
      const data = await res.json();


setsearchedEntrie(data?.searchEntry)
      if (data?.success) {
        toast.success('Search successful');
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
      toast.error(error.message);
    }
  };

  const getEnteredDates = async () => {
    try {
      const res = await fetch(`http://localhost:5000/getEnteredDates/${uid}`);
      const data = await res.json();

      if (data?.success) {
        setEntries(data?.entries);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error in fetching entries');
    }
  };

  useEffect(() => {
    getEnteredDates();
  }, []);





  return (
    <>

    
      <div   className='old-entries-search-bar-container' style={{ display: 'flex', justifyContent: 'center' }}>
        
        <input ref={searchref} type="date"placeholder="🔍Search by date" className="form-control search old-entries-search-bar "style={{height: '2.5rem',width: '15rem',margin: '1rem',fontFamily: 'cursive',fontSize: '1rem',}}   />
        <button className={` ${colorData.modeColor === 'black' ? 'btn-violet' : " btn-indigo"  } ,   `} onClick={handleSearch}>
          <h5><TbPencilSearch /></h5>
</button>
      </div>


      <div   className='searched-date'  style={{display:"flex" , justifyContent:"center"}} >            
  {searchedEntrie === "" ? <></> : ( () => {
    const isoDate = searchedEntrie?.date;
    const date = new Date(isoDate);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    const formattedDate = `${day}-${month}-${year}`;
    return (
      <div key={searchedEntrie?._id}className="col-md-3 card    text-center"style={ {  backgroundImage: 'linear-gradient(50deg , pink 40% , skyblue 60%)' , justifyContent:"center" ,margin: '1rem',height: '4rem',border: '1px solid black', width:"15rem"  }}>
        <img
          src="/images/pinkd.png"
          alt="error_in_loading"
          height="42rem"
          width="40rem"
          style={{ display: 'flex', alignItems: 'start' }}/>
          <Link to={`/Home/myEntry/${searchedEntrie?._id}   `} style={{ color: 'black', fontFamily: 'cursive' }}>
          {formattedDate}
          </Link>
      </div>
    );
  }  )   ()}
</div>      <div className="card all-dates " style={{  display: 'flex', backgroundColor: `${colorData.modeColor === 'black' ? 'grey' : ''}`,border: `${colorData === 'black' ? '1px solid white' : ''}`,flexDirection: 'row',margin: '3rem',flexWrap: 'wrap',height: '18rem',overflowY: 'auto',}}>
       
       
        { entries.length === 0 ?    <div className="relative w-full h-10 overflow-hidden">
    <h5 className="animate-slide">
      No entry Yet
    </h5> 
    <h5 className="animate-slide-second">
      No entry Yet
    </h5>
    <h5 className="animate-slide-third">
      No entry Yet
    </h5>
  </div>        :    entries.slice().reverse().map((e) => {
          const isoDate = e.date;
          const date = new Date(isoDate);

          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');

          const formattedDate = `${day}-${month}-${year}`;
          return (
            <div
              key={e._id}
              className="col-md-3 card text-center"
              style={{
                backgroundImage: '     linear-gradient(50deg , pink 40% , skyblue 60%)',
                margin: '1rem',
                height: '4rem',
                border: '1px solid black',
              }}
            >
              <img
                src="/images/pinkd.png"
                alt="error_in_loading"
                height="42rem"
                width="40rem"
                style={{ display: 'flex', alignItems: 'start' }}
              />
              <Link to={`/Home/myEntry/${e._id}  `} style={{ color: 'black', fontFamily: 'cursive' }}>
                {formattedDate}
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OldEntries;
