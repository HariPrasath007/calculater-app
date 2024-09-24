import React from "react"
import { useState, useRef } from "react" 


const Calculator: React.FC = () => {

    const calInputvalue = useRef<HTMLInputElement>(null)
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string>('');

    function add(numbers: string): number {
        // console.log(`test-------${JSON.stringify(numbers)}`)
        if (numbers === "") {
            return 0;
        }
    
        let delimiter = ",";
        let numString = numbers;
    
        // Check for custom delimiter
        const customDelimiterMatch = numString.match(/^\/\/(.+)\n(.*)$/);
        if (customDelimiterMatch) {
            delimiter = customDelimiterMatch[1];
            numString = customDelimiterMatch[2];
        }
    
        // Split numbers using the defined delimiters (comma, newline, or custom)
        const regex = new RegExp(`${delimiter}|\\n`);
        const numList = numString.split(regex);
    
        const negatives: number[] = [];
        let total = 0;
    
        for (const num of numList) {
            const parsedNum = convertToInt(num);
            if (parsedNum < 0) {
                negatives.push(parsedNum);
            }
            if (parsedNum < 1000) {
                total += parsedNum;
            }
        }
    
        if (negatives.length > 0) {
            throw new Error("Negative numbers not allowed: " + negatives.join(","));
        }
    
        return total;
    }
    
    function convertToInt(num: string): number {
        return parseInt(num, 10);
    }
    


    const doCalculation = () => {
        try {
            const inputval: string | undefined = calInputvalue.current?.value;
            const value = inputval?.replace('\\n','\n')
            if (typeof value === 'string' && value.trim() !== '') {
                const sum = add(`${value}`);
                setResult(sum);
                setError(''); // Call your function with the input value
              } 
           
        } catch (err: any) {
            setError(err.message);
            setResult(null);
        }
    }

    return(
        <React.Fragment>
            <div>
                Input: <input type="text" ref={calInputvalue} name="cal_input" />
            </div>
            <button type="button" onClick={doCalculation}>Calculate</button>
            <h2>Result: {result !== null ? result : 'N/A'}</h2>
            {error && <h3 style={{ color: 'red' }}>{error}</h3>}
        </React.Fragment>
    )
}

export default Calculator;