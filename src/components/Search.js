import React from 'react'


function Search(props) {
	return(
    <div className={props.class} role="search">  
      <p className="search-label" aria-label="label">Search places</p>        
      <input id="search" type="search" value={props.query} onChange={event => props.updateQuery(event.target.value)} placeholder="Search..." />
        <button className="close-icon" aria-label="clear textbox" type="reset"></button>
      <button id="filter" type="submit" onClick={props.filterVenues}>Filter</button>
			<div className="venues-list" role="list" aria-labelledby="header">
		    {props.venues.map((venue) =>
			    <div className="venue-name" role="listitem" key={venue.venue.id} data-key={venue.venue.id} onClick={props.toggleBounce}>{venue.venue.name}</div>
				)}
		  </div>
    </div>
	)
}

export default Search