import logo from './logo.svg';
import './App.css';
import AccountCreate from './components/AccountCreate';
import AccountList from './components/AccountList';
import AccountUpdate from './components/AccountUpdate';
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="main">
      <header role="heading" className="App-header" aria-level="1">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>Exercise 1:</code> CRUD Application of Bank Accounts
        </p>
      </header>
      <Routes>
        <Route exact path='/create' element={<AccountCreate />} />
        <Route path='/' element={<AccountList />} />
        <Route path='/update/:id' element={<AccountUpdate />} />
      </Routes>
    </div>
  );
}

export default App;
