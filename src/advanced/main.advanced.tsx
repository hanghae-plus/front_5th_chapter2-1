import { App } from '@/apps/App';
import React from 'react';
import ReactDOM from 'react-dom/client';
// import './src/apps/styles/reset.css';

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
