import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';
import Header from './Header';
import Employees from './Employees';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './Nav';
import GroupedTeamMembers from './GroupedTeamMembers';
import NotFound from './NotFound';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <Router>
        <Nav />
        <Header />
        <Routes>
          <Route path="/" element={<Employees />} />
          <Route path="/Teams" element={<GroupedTeamMembers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </DataProvider>
  );
}

export default App;