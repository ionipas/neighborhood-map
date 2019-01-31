import React from 'react'

function VenuesList(props) {
	return (
		<div className="venues-list">
	    {props.venues.map((venue) =>
		    <div className="venue-name" key={venue.venue.id} data-key={venue.venue.id} onClick={props.toggleBounce}>{venue.venue.name}</div>
			)}
	  </div>
	)
}

export default VenuesList
