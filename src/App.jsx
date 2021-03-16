import React,{createContext,useState,useMemo,useEffect,useRef} from 'react'
import Son from './components/son.tsx'
export const ThemeContext=createContext('lithg')
function App() {
  const [count,setCount]=useState(0)
  const it=useRef()
  const double =useMemo(()=>{
    return count*2
  },[count===3])
  useEffect(() => {
    it.current=setInterval(()=>{
      setCount(count=>count+1)
    },1000)
  }, [])
    useEffect(() => {
    if(count>=5){
      clearInterval(it.current)
    }
  }, )
  return (
    <div className="App">
      <button onClick={()=>setCount(count+1)}>click+1</button><br/>
      Count:{count}----double:{double}
     <ThemeContext.Provider value={'lithggggg'}>
      <Son />
     </ThemeContext.Provider>
    </div>
  );
}

export default App;
