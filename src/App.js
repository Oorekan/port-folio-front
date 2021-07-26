import { ToastProvider } from 'react-toast-notifications';
import Navbar from './components/Navbar';
import Main from './components/Main';
import CurrentUserContextProvider from './contexts/CurrentUserContext';

export default function App() {
  return (
    <>
      <ToastProvider
        autoDismiss
        autoDismissTimeout={3000}
        placement="bottom-right"
      >
        <CurrentUserContextProvider>
          <Navbar />
          <Main />
        </CurrentUserContextProvider>
      </ToastProvider>
    </>
  );
}
