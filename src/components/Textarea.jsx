import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export const Textarea = (props) => {

    // convert text to upper case
    const handleUpClick = () => {
        let newText = Text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to uppercase", "success")
    }
    // convert text to lower case
    const handleLoClick = () => {
        let newText = Text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to lowercase", "success")
    }
    // clear the text in the text area
    const cleartext = () => {
        setText("");
        props.showAlert("Text cleared", "success")
    }
    // handle extra space
    const handleExtraSpace = () => {
        let newText = Text.split(/[ ]+/);
        setText(newText.join(' '));
        props.showAlert("Extra space removed", "success")
    }
    // const handleExtraSpace2 = () => {
    //     let newText = Text.split(/[ ]+/);
    //     setText(newText.join(' '));
    //     // props.showAlert("Extra space removed","success")
    // }
    // copy text
    const handleCopy = () => {
        const text = document.getElementById("textbox").value;
        if (text.trim() !== '') {
            navigator.clipboard.writeText(text).then(function () {
                console.log("Text copied");
            }).catch(function (err) {
                console.log("error while copying : ", err);
            })
        } else {
            console.log("No text to copy");
        }
        props.showAlert("text copied", "success")
    }

    // paste form clip board
    const handlePasteCp = () => {
        navigator.clipboard.readText().then(copiedText => {
            setText(document.getElementById("textbox").value + copiedText)
            // document.getElementById("textbox").value = document.getElementById("textbox").value + copiedText;
        }).catch(err => {
            console.error("Failed to load form clipboard : ", err);
            document.getElementById("textbox").value = "pasting form clipboard not working"
        })
        props.showAlert("paste from clipboard", "success")
    }
    // speak text
    const handleSpeakAloud = () => {
        const text = document.getElementById("textbox").value;
        if ("speechSynthesis" in window) {
            const speech = new SpeechSynthesisUtterance(text);// create a speech object
            speech.lang = "en-US";
            speech.pitch = 1;
            speech.rate = 1;
            speech.volume = 1;
            window.speechSynthesis.speak(speech); // speak text
        }
        props.showAlert("start speak", "success")
    }
    const handleStopSpeakAloud = () => {
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel(); // cancel any ongoing speech
        }
        props.showAlert("stop speak", "success")
    }

    const handleLocalStorageSet = () => {
        localStorage.setItem('ls', Text);
        props.showAlert("text saved to local storage", "success")
    }
    const handleLocalStorageRetrive = () => {
        let storedText = localStorage.getItem('ls') || 'Local storage cleared';
        setText(storedText);
        props.showAlert("retrive from local storage", "success")
    }
    const handleLocalStorageDelete = () => {
        localStorage.removeItem('ls');
        props.showAlert("local storage clear", "success")
    }

    const morseCodeMap = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
        'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
        'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
        'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
        'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
        'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
        '4': '....-', '5': '.....', '6': '-....', '7': '--...',
        '8': '---..', '9': '----.', '0': '-----'
    };
    function showMorseTable(){
       for(let text in morseCodeMap){
        console.log(text,morseCodeMap[text]);
       }
    }
    function convertToMorse() {
        // let inputText = document.getElementById('textbox').value.toUpperCase();
        let text = Text.toUpperCase();
        let morseResult = text.split('').map(char => morseCodeMap[char] || char).join(' ');
        // document.getElementById('textbox').value = morseResult || "No text entered.";
        setText(morseResult);
        props.showAlert("Converted to morse code","success");
    }
    
    function convertToText() {
        // let inputMorse = document.getElementById('textbox').value.trim();
        let text = Text.trim();
        let textResult = text.split(' ').map(code => Object.keys(morseCodeMap).find(key => morseCodeMap[key] === code) || code).join('');
        // document.getElementById('textOutput').value = textResult || "No Morse code entered.";
        setText(textResult);
        props.showAlert("Converted to text","success");
    }
    // set text to the value of the textarea
    const handleOnchange = (event) => {
        setText(event.target.value);
        // localStorage.setItem(event.target.value);
    }

    //calculate word and character
    const calculateWord = () => {
        return Text.trim().split(/\s+/).filter(word => word.length > 0).length;
        // return Text.split(" ").filter(word=>word.length!==0).length;
    }
    const calculateCharacter = () => {
        return Text.length;
    }
    const calculateTime = () => {
        // return Math.round(0.008 * (calculateWord()) * 60);
        return (0.008 * (calculateWord()) * 60);
    }

    const [Text, setText] = useState("");
    return (
        <>
            <div className="container" style={{ backgroundColor: props.mode === 'dark' ? '#042743' : 'beige' }}>
                <div className="head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: props.mode === 'light' ? 'black' : 'white' }}>
                    <h2>{props.heading}</h2>
                    <button type="button" class="btn btn-danger" onClick={cleartext}>Clear text</button>
                </div>
                <div className="mb-3">
                    <textarea className="form-control" value={Text} onChange={handleOnchange} style={{ backgroundColor: props.mode === 'dark' ? 'beige' : 'white', color: props.mode === 'light' ? 'black' : 'black' }} id="textbox" rows="9"></textarea>
                </div>
                {/* <div className="container mb-3" style={{ display: 'flex', alignItems: 'center', justifyContent: '', flexWrap: 'wrap' }}> */}
                <button disabled={Text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleUpClick}>convert to Uppercase</button>
                <button disabled={Text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleLoClick}>convert to Lowercase</button>
                <button disabled={Text.length===0} className="btn btn-primary mx-2 my-2" onClick={convertToMorse}>Text to Morse Code</button>
                <button disabled={Text.length===0} className="btn btn-primary mx-2 my-2" onClick={convertToText}>Morse Code to Text</button>
                <button disabled={Text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleSpeakAloud}>Speak aloud</button>
                <button disabled={Text.length===0} className="btn btn-primary mx-2 my-2" onClick={handlePasteCp}>Paste from clipboard</button>
                <button disabled={Text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleStopSpeakAloud}>Stop speak aloud</button>
                <button disabled={Text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleExtraSpace}>Remove extra white space</button>
                <button disabled={Text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleCopy}>Copy text</button>
                <button disabled={Text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleLocalStorageSet}>save to local storage</button>
                <button disabled={Text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleLocalStorageRetrive}>retrive from local storage</button>
                <button disabled={Text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleLocalStorageDelete}>delete from local storage</button>
                <button className="btn btn-primary mx-2 my-2" onClick={showMorseTable} ><Link style={{color:"white",textDecoration:"none"}} to="/morsetable">Show morse table</Link></button>
                {/* </div> */}
                <div className="container my-3" style={{ color: props.mode === 'light' ? 'black' : 'white' }}>
                    <h2>Text Summary</h2>
                    <p>{calculateWord()} words and {calculateCharacter()} character</p>
                    <p>{calculateCharacter() > 0 ? calculateTime() + " seconds to read" : "Enter some text for calculating estimate time to read"}</p>
                    <h3>Preview</h3>
                    <p>{calculateCharacter() > 0 ? Text : "Nothing to preview."}</p>
                </div>
            </div>
        </>
    )
}
