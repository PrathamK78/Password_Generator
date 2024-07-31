import { useState,useCallback,useEffect, useRef } from 'react'
import './index.css'

function App() {
  const [length,setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordCopied, setPasswordCopied] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if(numberAllowed) str += '0123456789';
    if(charAllowed) str += '!@#$%^&*()_+';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  },[length,numberAllowed,charAllowed,setPassword]); //setPassword is added to the dependency array just for optimization purposes to keep it in memory which helps in time complexity

  const copyPasswordToClipboard = useCallback(()=>{
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand('copy');
      setPasswordCopied(true);
      setTimeout(() => setPasswordCopied(false), 3000); // Reset after 2 seconds
    }
  },[]);

  useEffect(()=>{
    passwordGenerator(); 
  },[length,numberAllowed,charAllowed,passwordGenerator]);

  return (
    <>
      <h1 className='w-full max-w-md mx-auto shadow-md rounded-2xl px-5 py-5 my-9 bg-blue-400 text-white text-4xl text-center'>Password Generator</h1>
      <div className="container">
        <div id="input-group">
          <input type="text" value={password} className="input" placeholder="Password...." readOnly ref={passwordRef}/>
          <button onClick={copyPasswordToClipboard} className="button--submit" type="submit">
            {passwordCopied ? 'Copied' : 'Copy'}
          </button>

          
        </div> <br />
        <div className='flex text-sm gap-x-2 justify-center items-center'>
            <div className='flex items-center gap-x-2'>
              <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}} />
              <label className='text-yellow-400 font-bold'>Length {length}</label>
            </div> <br /> 

            <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' onChange={()=>{setNumberAllowed((prev)=>!prev)}} />
            <label className='text-yellow-400 font-bold' htmlFor="numberInput">Numbers</label>

            <input type="checkbox" defaultChecked={charAllowed} id='characterInput' onChange={()=>{setCharAllowed((prev)=>!prev)}} />
            <label className='text-yellow-400 font-bold' htmlFor="characterInput">Characters</label>
        </div>
      </div>

    </>
  )
}

export default App
