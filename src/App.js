import React, {useState} from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

const App =()=> {
  const pageSize = 8
  const country = 'in'
  const apiKey = process.env.REACT_APP_API_KEY_BIZZSOLE
  const [progress, setProgress] = useState(0)

    return (
      <Router>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        />
        <NavBar/>

        <Routes>
          <Route
            exact path='/'
            element={
              <div>
                <News setProgress={setProgress} apiKey={apiKey} key='general' pageSize={pageSize} country={country} category='general'/>
              </div>
            }
          />
          <Route
            exact path='/business'
            element={
              <div>
                <News setProgress={setProgress} apiKey={apiKey} key='business' pageSize={pageSize} country={country} category='business'/>
              </div>
            }
          />
          <Route
            exact path='/entertainment'
            element={
              <div>
                <News setProgress={setProgress} apiKey={apiKey} key='entertainment' pageSize={pageSize} country={country} category='entertainment'/>
              </div>
            }
          />
          <Route
            exact path='/health'
            element={
              <div>
                <News setProgress={setProgress} apiKey={apiKey} key='health' pageSize={pageSize} country={country} category='health'/>
              </div>
            }
          />
          <Route
            exact path='/science'
            element={
              <div>
                <News setProgress={setProgress} apiKey={apiKey} key='science' pageSize={pageSize} country={country} category='science'/>
              </div>
            }
          />
          <Route
            exact path='/sports'
            element={
              <div>
                <News setProgress={setProgress} apiKey={apiKey} key='sports' pageSize={pageSize} country={country} category='sports'/>
              </div>
            }
          />
          <Route
            exact path='/technology'
            element={
              <div>
                <News setProgress={setProgress} apiKey={apiKey} key='technology' pageSize={pageSize} country={country} category='technology'/>
              </div>
            }
          />
        </Routes>
      </Router>

    )
  }

export default App;
