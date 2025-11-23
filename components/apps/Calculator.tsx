import React, { useState } from 'react';

export const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [resetNext, setResetNext] = useState(false);

  const handleNum = (num: string) => {
    if (display === '0' || resetNext) {
      setDisplay(num);
      setResetNext(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOp = (op: string) => {
    setOperator(op);
    setPrevValue(display);
    setResetNext(true);
  };

  const calculate = () => {
    if (!prevValue || !operator) return;
    const cur = parseFloat(display);
    const prev = parseFloat(prevValue);
    let res = 0;
    switch (operator) {
      case '+': res = prev + cur; break;
      case '-': res = prev - cur; break;
      case '×': res = prev * cur; break;
      case '÷': res = prev / cur; break;
    }
    setDisplay(String(res));
    setPrevValue(null);
    setOperator(null);
    setResetNext(true);
  };

  const clear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setResetNext(false);
  };

  const btnClass = "flex items-center justify-center h-8 rounded-none bg-[#c0c0c0] text-black font-bold bevel-out active:bevel-in text-sm";
  const opClass = "flex items-center justify-center h-8 rounded-none bg-[#c0c0c0] text-red-800 font-bold bevel-out active:bevel-in text-sm";

  return (
    <div className="h-full bg-[#c0c0c0] p-2 flex flex-col gap-2">
       <div className="bg-white border-2 bevel-in p-1 text-right font-mono text-xl h-10 flex items-center justify-end overflow-hidden">
         {display}
       </div>
       <div className="grid grid-cols-4 gap-1">
         <button onClick={clear} className="col-span-3 flex items-center justify-center h-8 rounded-none bg-[#c0c0c0] text-red-600 font-bold bevel-out active:bevel-in">C</button>
         <button onClick={() => handleOp('÷')} className={opClass}>/</button>
         
         <button onClick={() => handleNum('7')} className={btnClass}>7</button>
         <button onClick={() => handleNum('8')} className={btnClass}>8</button>
         <button onClick={() => handleNum('9')} className={btnClass}>9</button>
         <button onClick={() => handleOp('×')} className={opClass}>*</button>

         <button onClick={() => handleNum('4')} className={btnClass}>4</button>
         <button onClick={() => handleNum('5')} className={btnClass}>5</button>
         <button onClick={() => handleNum('6')} className={btnClass}>6</button>
         <button onClick={() => handleOp('-')} className={opClass}>-</button>

         <button onClick={() => handleNum('1')} className={btnClass}>1</button>
         <button onClick={() => handleNum('2')} className={btnClass}>2</button>
         <button onClick={() => handleNum('3')} className={btnClass}>3</button>
         <button onClick={() => handleOp('+')} className={opClass}>+</button>

         <button onClick={() => handleNum('0')} className={`${btnClass} col-span-2`}>0</button>
         <button onClick={() => handleNum('.')} className={btnClass}>.</button>
         <button onClick={calculate} className={btnClass}>=</button>
       </div>
    </div>
  );
};