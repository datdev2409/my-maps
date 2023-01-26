import { useState } from 'react';
import Map from './components/Map';
import PlaceInput from './components/PlaceInput';

function App() {
	const [center, setCenter] = useState([105.6390316, 10.4607423])

	return (
		<div>
			<PlaceInput setCenter={setCenter}/>
			<Map center={center}/>
		</div>
	);
}

export default App;
