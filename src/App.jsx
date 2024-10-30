import './App.css'
import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Textarea } from './components/Textarea'
import { Alert } from './components/Alert'
import { About } from './components/About'
import { NotFound } from './components/NotFound'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MorseCodeShow from './components/MorseCodeShow'
import { createRoot } from 'react-dom/client'

function App() {

  const [alert, setAlert] = useState(null) // for showing alert
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1000);
  }
  const [mode, setMode] = useState('light'); //check for dark mode is enabled or not
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      document.title = "Text Utils - Home (Dark)";
      showAlert("Dark mode has been enabled", "success");
      // setInterval(() => {
      //   document.title = "Created by Harsh yadav";
      // }, 1500);
    } else {
      setMode("light");
      document.body.style.backgroundColor = 'beige';
      document.title = "Text Utils - Home (Light)";
      showAlert("Light mode has been enabled", "success");
    }
  }
  // /user --> conponent 1
  // /user/home -->component 2
  // without exact path it should be same result

  return (
    <>
      <Router>
        <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} /> {/*passing mode for checking mode(dark or light) or toggleMode which toggle dark or light mode */}
        <Alert alert={alert} />
        <Routes>
          <Route exact path="/" element={<Textarea showAlert={showAlert} heading="Enter text below for analyze" mode={mode} />} />
          <Route exact path="/about" element={<About />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/morsetable" element={<MorseCodeShow/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
    </>
  )
}
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App/>)
export default App
