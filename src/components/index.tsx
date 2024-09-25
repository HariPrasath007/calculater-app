import React from "react"
import { useState, useRef } from "react" 


const Calculator: React.FC = () => {

    const calInputvalue = useRef<HTMLInputElement>(null)
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string>('');

    function add(numbers: string): number {
        console.log(`test-------${JSON.stringify(numbers)}`)

        if (numbers === "") return 0;

        let delimiter = ",";
        if (numbers.startsWith("//")) {
            const parts = numbers.split("\n");
            delimiter = parts[0].substring(2); // Extract delimiter
            numbers = parts.slice(1).join("\n"); // Remaining numbers
        }
    
        // Split by the delimiter and newlines
        const regex = new RegExp(`[${delimiter}\n]`);
        const numberArray = numbers.split(regex);
    
        const negatives: number[] = [];
        const sum = numberArray.reduce((acc, curr) => {
            const num = parseInt(curr, 10);
            if (isNaN(num)) return acc; // Skip non-numeric entries
    
            if (num < 0) {
                negatives.push(num);
            }
            return acc + num;
        }, 0);
    
        if (negatives.length > 0) {
            throw new Error(`negative numbers not allowed ${negatives.join(", ")}`);
        }
    
        return sum;

    }
    

    const doCalculation = () => {
        try {
            const inputval: string | undefined = calInputvalue.current?.value;
            let value = inputval?.replaceAll('\\n','\n')
            if (value?.startsWith('"')) {
                value = value.slice(1);
            }
            if (value?.endsWith('"')) {
                value = value.slice(0,-1);
            }
            if (typeof value === 'string') {
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