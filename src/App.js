import { useEffect } from 'react';
import Map from './components/Map';
import PlaceDetail from './components/PlaceDetail';
import PlaceInput from './components/PlaceInput';
import PlaceSumary from './components/PlaceSumary';
import { MapContextProvider } from './store/MapContext';

function App() {
	useEffect(() => {
		function handleSavePlace(e) {
			if (e.target.classList.contains("popup-add-btn")) {
				console.log("Add place global");
			}
		}
		window.addEventListener("click", handleSavePlace)
	}, []) 


	return (
		<MapContextProvider>
			<div className='container'>
				<div className='sidebar'>
					{/* <PlaceDetail /> */}
					<PlaceSumary />
					<PlaceInput />
				</div>

				<div className='content' >
					<Map/>
				</div>
			</div>
		</MapContextProvider>
	);
}

export default App;
