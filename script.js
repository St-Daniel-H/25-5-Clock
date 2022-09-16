function App(){
 const [breakLength,setbreakLength] = React.useState(5);
 const [sessionLength,setsessionLength] = React.useState(25);
 const [play,setPlay] = React.useState(false);
 const [second,setSecond] = React.useState(0);
 const [minute,setMinute] = React.useState(25)
 const [sstext,setSStext] = React.useState("start");
 const [timerSession,setTimerSession] = React.useState(true);


   function Decrement(BS){
    return () => {
        if(BS === "break" && play == false) {
            if(breakLength>1){
                setbreakLength(breakLength-1);
                if(timerSession == false){
                    setMinute(breakLength-1);
                    setSecond(0);
                }
            }
            else return;
        }else if (BS === "session" && play == false){
         if(sessionLength>1){
            setsessionLength(sessionLength-1);
            if(timerSession == true){
                setMinute(sessionLength-1);
                setSecond(0);
            } 
         }
        else return;
     }
    }}

    function Increment(BS){
        return () => {
            if(BS === "break" && play == false) {
             if(breakLength<60){
                setbreakLength(breakLength+1); 
                
                if(timerSession == false){
                    setMinute(breakLength+1);
                    setSecond(0);
                } 
             }
             else return;
            }else if (BS === "session"){
             if(sessionLength<60 && play== false){
                setsessionLength(sessionLength+1);
                if(timerSession == true) {
                    setMinute(sessionLength+1);
                    setSecond(0);
                }
             }
             else return;
            
         }
        }
    }
    function reset(){    
        $("#SeBr").html("Session");  
        setSecond(0);
       setPlay(false);
        setbreakLength(5);
        setsessionLength(25);
        setMinute(25);
        setSStext("start");
        setTimerSession(true);
    }
   function start(){
     if(play == true){
        setPlay(false);
        setSStext("start");
     }else if(play == false){
        setPlay(true);
        setSStext("stop");      
     }
   }

    React.useEffect(() => {
    if(play == true){
        const interval = setInterval(() => {
            if( second > 0){
                setSecond(second - 1)
                  
            }else if(second==0 && minute>0){
                setSecond(59)
                setMinute(minute-1);
                console.log("hi");
            }
            else if(minute==0 && second == 0){
                if(timerSession == true){
                    setMinute(breakLength);
                    $("#SeBr").html("Break!!");
                    setTimerSession(false);
                    playSound('1764.mp3', 3);

                }else if (timerSession == false){
                    setMinute(sessionLength);
                    $("#SeBr").html("Session");
                    setTimerSession(true);
                }
                    
            }
          }, 1000);
              return () => clearInterval(interval);
    
    }else if(play == false){
        return;
    }
       
  }, [second,play,minute]);  
   
  function show(num){
    if(num<10){
        return ("0" + num);
    }else return num;
  }

  const playSound = (audioURL, playCount = 1) => {

    const audioContext = new AudioContext();   
    audioContext.resume();
  
    let playCountArray = [];
  
    for (let i = 0; i < playCount; i++) {
  
      let soundInstance = new Audio(audioURL);
      playCountArray.push(soundInstance);
  
      if (playCountArray.length < playCount) {
  
        playCountArray[i].addEventListener('ended', () => {playCountArray.shift(); playCountArray[0].play();});
      }
    }
    
    playCountArray[0].play();
  };
  
  
   
return(
   <div id="wrapper">
      <div id="App">
        <div id="tools">
            <div id="break">
               <div id="break-label"><h3>Break Length</h3></div>
               <button  onClick={Increment("break")} id="break-increment"><i className="fa-solid fa-arrow-up"></i></button>
               <div id="break-length">{breakLength}</div>
               <button onClick={Decrement("break")}id="break-decrement">
                <i className="fa-sharp fa-solid fa-arrow-down-long"></i>
                </button>
               
              
            </div>
            <div id="session">
               <div id="session-label"><h3>Session Length</h3></div>
               <button onClick={Increment("session")} id="session-increment"><i className="fa-solid fa-arrow-up"></i></button>
               <div id="session-length">{sessionLength}</div>
               <button onClick={Decrement("session")} id="session-decrement"><i className="fa-sharp fa-solid fa-arrow-down-long"></i></button>
              
               
            </div>
        </div>
        <div id="tools2">
            <div id="timer-label">
              <h3 id='SeBr'>Session</h3>
              <div id="time-left">{show(minute)}:{show(second)}</div>
            </div>
            <button onClick={start}id="start_stop">{sstext}</button>
            <button id="reset" onClick={reset}><i className="fa-solid fa-repeat"></i></button>
            </div>
            </div>
        </div>
    )
}
const root = ReactDOM.createRoot(document.getElementById("Load"));
      root.render(<App/>);
