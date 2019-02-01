import React from 'react'

function VenuesList(props) {
	return (
		<div className="venues-list" role="list" aria-labelledby="header">
	    {props.venues.map((venue) =>
		    <div className="venue-name" role="listitem" key={venue.venue.id} data-key={venue.venue.id} onClick={props.toggleBounce}>{venue.venue.name}</div>
			)}
	  </div>
	)
}

export default VenuesList
