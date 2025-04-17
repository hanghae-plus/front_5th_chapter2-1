import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('app');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
} else {
  // eslint-disable-next-line no-console
  console.error("Root element with id 'app' not found.");
}
