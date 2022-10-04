import { useGlobalContext } from './context'
import './App.css';
import Search from './components/Search';
import Meals from './components/Meals';
import Modal from './components/Modal';
import Favorites from './components/Favorites';

function App() {
  const { showModal } = useGlobalContext()
  return (
    <main>
      <Search />
      {/* <Favorites /> */}
      <Meals />
      {showModal && <Modal />}
    </main>
  );
}

export default App;