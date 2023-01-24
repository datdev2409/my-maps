import { Wrapper, Status } from '@googlemaps/react-wrapper'
import Map from './components/Map';
import { useState } from 'react';
import PlaceInput from './components/PlaceInput';
import PlaceSuggestList from './components/PlaceSuggestList';
import { GOOGLE_MAP_API_KEY } from './config/google_api_key';

const render = (status) => {
	const handler = {
		[Status.LOADING]: () => <h1>Loading</h1>,
		[Status.FAILURE]: () => <h1>There is an error occured</h1>,
		[Status.SUCCESS]: () => <h1>Success</h1>
	}

	return handler[status]()
};

function App() {
	const [center, setCenter] = useState({ lat: -34.397, lng: 150.644 })

	return (
		<Wrapper apiKey={GOOGLE_MAP_API_KEY} render={render} libraries={["places"]}>
			<PlaceInput setCenter={setCenter}/>
			<PlaceSuggestList />
			<Map center={center} />
		</Wrapper>
	);
}

export default App;
