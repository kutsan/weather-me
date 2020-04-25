import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './SearchBar.css'

const SearchBar = ({ submit }) => {
	const [city, setCity] = useState(null)

	return (
		<form
			className='search-bar'
			onSubmit={(event) => {
				event.preventDefault()

				if (city) submit(city)
			}}
		>
			<input
				className='search-bar__input'
				onChange={(event) => setCity(event.target.value)}
				name='city'
				type='search'
				placeholder='Search city...'
				aria-label='Search city'
				autoFocus
			/>
		</form>
	)
}

SearchBar.propTypes = {
	submit: PropTypes.func.isRequired
}

export default SearchBar
