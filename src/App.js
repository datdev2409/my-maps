import Map from './components/Map';
import PlaceInput from './components/PlaceInput';
import { MapContextProvider } from './store/MapContext';

function App() {
	return (
		<MapContextProvider>
			<PlaceInput />
			<Map />
		</MapContextProvider>
	);
}

export default App;
