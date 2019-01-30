import React from 'react'

function VenuesList(props) {
	return (
		<div className="venues-list">
	    {props.venues.map((venue) =>
		    <div key={venue.venue.id}>
		      <div className="venue-name">{venue.venue.name}</div>
		    </div>
			)}
	  </div>
	)
}

export default VenuesList
