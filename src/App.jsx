import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react"

function App() {

  const [length, setLength] = useState(12);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const referenceID = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbersAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [numbersAllowed, charAllowed, length, setPassword]);

  const copyToClipboard = useCallback(() => {
    referenceID?.current.select();
    referenceID?.current.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, numbersAllowed, charAllowed, generatePassword]);

  return (

    <div className="background w-full h-screen text-center overflow-hidden">
      <div className="flex flex-col gap-5 w-full max-w-lg mx-auto mt-[80px] border rounded-md p-6 shadow-[rgba(255,_255,_255,_0.5)_0px_3px_8px]">
        <h1 className="text-white text-4xl mb-[12px] font-semibold">Password Generator</h1>
        <div className="w-full">
          <input
            className="w-[70%] p-2 border-0 outline-none rounded-l-lg text-[18px]"
            type="text"
            readOnly
            ref={referenceID}
            value={password}
          />
          <button
            onClick={copyToClipboard}
            className="bg-blue-500 text-white p-2 rounded-r-lg font-semibold text-[18px]">copy</button>
        </div>
        <div className="w-full flex max-w-lg justify-between mt-[15px]">
          <div className="flex gap-2 items-center">
            <input
              type="range"
              className="h-[6px] w-[110px]"
              min={8}
              max={20}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="font-semibold text-orange-500 text-lg">Length: <span className="text-white">{length}</span></label>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              defaultChecked={numbersAllowed}
              id="num"
              className="w-[16px] h-[16px]"
              onChange={() => setNumbersAllowed((prev) => !prev)}
            />
            <label htmlFor="num" className="font-semibold text-orange-500 text-lg">Numbers</label>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="char"
              className="w-[16px] h-[16px]"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="char" className="font-semibold text-orange-500 text-lg">Characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
