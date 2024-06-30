import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import img from './setting.png'
import sound from './mouse-click-117076.mp3'
function App() {
  const [index,setIndex] = useState(0)
  const [min,setMin] = useState(()=>{
    if(localStorage.getItem(`pomodore`) != null){
        return localStorage.getItem(`pomodore`)
    }else{
      return 25
    }
  })
  const [sec,setSec ] = useState(`00`)
  const [play,setPlay] = useState(false)
  const [times,setTimes] = useState(()=>{
    if(localStorage.getItem(`interval`) != null){
      return ((+localStorage.getItem(`interval`)*2) -1)
    } else{
      return 5
    }
  })
  const hidden = useRef(null)
  const pomodore = useRef(),short=useRef(),long=useRef(),inetrval=useRef(),ul=useRef()
useEffect(()=>{
  if(min == 0 && sec == 0){
    setTimes(times - 0.5)
    setPlay(false)
    setTimeout(() => {
      const children = [...ul.current.children]
      children.forEach((e)=>{
        e.classList.remove(`active`)
      })
      if(times == 0.5){
        children[2].classList.add(`active`)
        setIndex(0)
        setTimes(6)
        if(localStorage.getItem(`long`) != null){
          setMin(+localStorage.getItem(`long`))
          setSec(`00`)
        }else{
          setSec(`00`)
          setMin(45)
        }
      }else{
        if(index == 0){
          children[1].classList.add(`active`)
          setIndex(1)
          setSec(`00`)
          if(localStorage.getItem(`short`)!= null){
            setMin(+localStorage.getItem(`short`))
          }else{
            setMin(5)
          }
        }else{
          children[0].classList.add(`active`)
          setIndex(0)
          setSec(`00`)
          if(localStorage.getItem(`pomodore`) != null){
            setMin(localStorage.getItem(`pomodore`))
        }else{
           setMin(25)
        }
        }
      }
    }, 1000);
  }
   if(play == true){
    if(sec == -1){
      setMin(min-1)
      setSec(59)
    }
      setTimeout(()=>{
        setSec(sec -1)
      },1000)
    }
    return ()=>{
      window.onbeforeunload = (e)=>{
        e.preventDefault();
      }
    }
  },[sec,play])
  function change(target,childs){
    const children = [...childs]
    children.forEach((e)=>{
      e.classList.remove(`active`)
    })
    target.classList.add(`active`)
  }
  function save(){
    setMin(pomodore.current.value)
    localStorage.setItem(`pomodore`,pomodore.current.value)
    localStorage.setItem(`short`,short.current.value)
    localStorage.setItem(`long`,long.current.value)
    localStorage.setItem(`interval`,inetrval.current.value)
    hidden.current.style.display = `none`
    setPlay(false)
    setSec(`00`)  
  }
  return (
    <div className="App h-screen text-white  ">
      <div ref={hidden} className=' hidden absolute w-1/4 h-2/3 top-1/4 rounded-xl bg-white  flex-col justify-between  text-black'>
    <p className=' p-2 font-semibold text-lg '>Pomodoro settings</p>
      <div className=' felx justify-between p-2 m-2 flex'>
        <label>pomodore</label><input type='number' ref={pomodore} />
      </div>
      <div className=' felx justify-between p-2 m-2 flex'>
        <label>Shortbreak</label><input type='number' ref={short} />
      </div>
      <div className=' felx justify-between p-2 m-2 flex'>
        <label>Longbreak</label><input type='number' ref={long} />
      </div>
      <div className=' felx justify-between p-2 m-2 flex'>
        <label>inetrval</label><input type='number' ref={inetrval} />
      </div>
      <button className=' w-1/2 rounded-lg px-6 py-4 btn text-white cursor-pointer self-center' onClick={()=>{save()}}>Apply changes</button>
      <button className=' w-1/2 rounded-lg px-6 py-4 dis text-white cursor-pointer self-center' onClick={()=>{
        hidden.current.style.display = `none`
      }}>Discard</button>
      </div>
      <div className=' p-12 h-screen'>
      <h1 className=' text-center p-2 m-2 text-2xl'>pomodoro</h1  >
      <ul ref={ul} className=' ul flex justify-between w-1/3 mx-auto rounded-full p-3 px-4 '>
        <li data-id='1'  onClick={(e)=>{change(e.currentTarget,e.currentTarget.parentElement.children)}}  className=' p-2 px-3 cursor-pointer active'>pomodore</li>
        <li data-id='2' onClick={(e)=>{change(e.currentTarget,e.currentTarget.parentElement.children)}} className=' p-2 px-3 cursor-pointer'>shortbreak</li>
        <li data-id='3' onClick={(e)=>{change(e.currentTarget,e.currentTarget.parentElement.children)}} className=' p-2 px-3 cursor-pointer'>longbreak</li>
      </ul>
      <div className=' ball mx-auto   bg-white rounded-full p-3 m-3 my-12 flex flex-col justify-center items-center' >
        <p className=' text-6xl font-extrabold'><span>{min}</span>:<span>{sec}</span></p>
        <p onClick={()=>{setPlay(!play);new Audio(sound).play()}} className='pause text-xl uppercase p-2 m-2 cursor-pointer '>{play? `pause`: `start`}</p>
      </div>
      <img onClick={()=>{
        hidden.current.style.display = `flex`
      }} className=' w-8 mx-auto cursor-pointer' src={img} />
      </div>
      <div>
      </div>
    </div>
  );
}

export default App;
