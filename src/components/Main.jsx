import React, { useEffect, useState } from 'react';
import getRandomGiphy from '../data/Giphy';
import pGiphy from '../assets/please-giphy/giphy1.gif';
import audioAccepted from '../assets/accepted.mp3';
import './main.css';

function Main() {
    const [isAccepted, setIsAccepted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [hoverCount, setHoverCount] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dateForm, setDateForm] = useState(false);
    const [randomGiphy, setRandomGiphy] = useState();
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [message, setMessage] = useState('');
    const [messageError, setMessageError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showStatus, setShowStatus] = useState(false);
    const [date, setDate] = useState('');
    const [dateError, setDateError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [inputType, setInputType] = useState('text');
    const [audio, setAudio] = useState(null);


    useEffect(()=>{
      if(isAccepted){
        const newAudio = new Audio(audioAccepted);
        newAudio.play();
        setAudio(newAudio);
      }else{
        if(audio){
          audio.pause();
          setAudio(null);
        }
      }
    },[isAccepted]);
    
    const handleFocus = () => {
      setInputType('date');
    };
  
    const handleBlur = () => {
      setInputType('text');
    };
  
    const handleHover = () => {
      if (!isHovered) {
        setIsHovered(true);
        }
        setHoverCount((prevCount) => (prevCount % 3) + 1);
        const initialX = Math.floor(Math.random() * (window.innerWidth - 200));
        const initialY = Math.floor(Math.random() * (window.innerHeight - 50));
        setPosition({ x: initialX, y: initialY });
    };

    const handleAccept = () => {
      setHoverCount(0);
      setIsAccepted(true);
      setRandomGiphy(getRandomGiphy());
    };

    const handleDate = () => {
      setDateForm(prevDateForm => !prevDateForm);
      setShowStatus(false);
    };
    

    function handleNameChange(event) {
      setName(event.target.value);
      setSuccessMessage(null);
      if (!event.target.value) {
        setNameError('Please enter a name.');
      } else {
        setNameError('');
      }
    }
  
    function handleMessageChange(event) {
      setMessage(event.target.value);
      setSuccessMessage(null);
      if (!event.target.value) {
        setMessageError('Please enter a message');
      } else {
        setMessageError('');
      }
    }
  
    function handleDateChange(event) {
      const selectedDate = event.target.value;
      setDate(selectedDate);
      setSuccessMessage(null);
    
      if (!selectedDate || selectedDate === '') {
        setDateError('Please enter a valid date');
      } else {
        setDateError('');
      }
    }
    
    const encode = (data) => {
      return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
    }
  

    function fixDate(e) {
      e.preventDefault();
      let hasError = false;
      if (!name) {
        setNameError('Please enter a name');
        hasError = true;
      }
      if (!message) {
        setMessageError('Please enter a message');
        hasError = true;
      }
      if(!date || date === ''){
        setDateError('Please select a perfect date!!');
        hasError = true;
      }
      if (!hasError) {
        setSubmitting(true);
        const data = {
          date,
          name,
          message
        };
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encode({'form-name': 'date-data', ...data})
        })
          .then(() => {
            setSubmitting(false);
            setSuccessMessage('Yaaa! Date confirmed.');
            setShowStatus(true);
            e.target.reset();
            setName('');
            setMessage('');
            setDate('');
          })
          .catch(error => {
            setSubmitting(false);
            setShowStatus(true);
            setSuccessMessage('There was an error sending your message. Please try again later.');
            console.error(error);
          });
      }else{
        setSuccessMessage('Please enter necessary details!');
      }
    }
  
  

  return (
    <div className='main' style={{ position: 'relative', height: '100vh' }}>
        <div className="container">
            <div className="riyal-div">
                <div className="riyal-head">
                  {isAccepted ? (
                    <h1>Yaaaa!!!</h1>
                  ):(
                    <h1>wana go on a date?</h1>
                  )}
                </div>
                <div className="riyal-img">
                  {isAccepted ? (
                    <img src={randomGiphy} alt="Accepted Giphy" />
                  ) : (
                    <img src={pGiphy} alt="Default Giphy" />
                  )}
                    {isHovered && (
                      <>
                      {[...Array(hoverCount)].map((_, index) => (
                        <h1 key={index} className='please-text'>
                          Please{Array(index + 1).fill('!').join('')}
                        </h1>
                      ))}
                      </>
                    )}
                </div>
                <div className="riyal-btns">
                      {isAccepted ? (
                          dateForm ? (
                            <button onClick={handleDate}>Close</button>
                          ) : (
                            <button onClick={handleDate}>Fix a date</button>
                          )
                        ) : (
                          <button className='yes-btn' onClick={handleAccept}>Yes</button>
                        )}
                        {!isAccepted && (
                          <button
                            className='no-btn'
                            onMouseEnter={handleHover}
                            onClick={handleHover}
                            style={{
                              width: 'calc(clamp(5.25em, 5vw, 4em) * 1.5)',
                              left: `${position.x}px`,
                              top: `${position.y}px`,
                              position: isHovered ? 'absolute' : 'static',
                            }}
                          >
                            No
                          </button>
                        )}
                </div>
                {dateForm ? (
                  <div className="date-form">
                  <form action='' onSubmit={fixDate} method='POST' name='date-data' className="dt-form-container">
                  <input type='hidden' name='form-name' value='date-data' />
                    <div className="input-div">
                    <input
                      type={inputType}
                      onChange={handleDateChange}
                      name='date'
                      placeholder='Choose a perfect Date here'
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                      <p className='error-txt'>{dateError}</p>
                    </div>
                    <div className="input-div">
                      <input type="text" onChange={handleNameChange} placeholder='what name shall I use to address you?' name='name'/>
                      <p className='error-txt'>{nameError}</p>
                    </div>
                    <div className="input-div">
                      <input type="text" onChange={handleMessageChange} placeholder='Your lovely text here...' name='message'/>
                      <p className='error-txt'>{messageError}</p>
                    </div>
                    {
                      submitting ? (
                        <button disabled>Fixing...</button>
                      ):(
                        <button>Fix it</button>
                      )
                    }
                  </form>
                  </div>
                ):(
                  <></>
                )}
                {showStatus ? (
                  <div className="date-form">
                    <div className="dt-form-container">
                      <p>{successMessage}</p>
                    </div>
                  </div>
                ):(
                  <></>
                )}
            </div>
        </div>
        <a className='credit' target="_blank" rel="noreferrer" href="https://bibhu-ni.netlify.app/">MADE WITH <span style={{ color: '#a02424' }}>&#10084;</span>, By Bibhu</a>
    </div>
  );
}

export default Main;
