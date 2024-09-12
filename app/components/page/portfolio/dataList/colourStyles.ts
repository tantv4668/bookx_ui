export const colourStyles: any = {
	control: (styles: any) => ({
		...styles,
		'backgroundColor': '#1C1E22',
		'height': '24px',
		'borderColor': '#FFFFFF1F',
		'boxShadow': 'none',
		'fontSize': '12px',
		'minHeight': '24px',
		'minWidth': '96px',
		'padding': '0px 8px',
		'color': '#FFFFFF8A',
		'borderRadius': '4px',
		':hover': {
			borderColor: '#FFFFFF1F',
		},
	}),
	menu: (provided: any) => ({
		...provided,
		border: 'none',
		boxShadow: 'none',
		backgroundColor: '#1B2028',
		padding: '2px 4px',
	}),
	option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
		return {
			...styles,
			'padding': '0px 8px',
			'fontSize': '12px',
			'backgroundColor': isFocused ? '#191D24' : '#1B2028',
			'color': '#FFFFFF8A',
			'cursor': isDisabled ? 'not-allowed' : 'default',
			'border': 'none',
			'borderRadius': '4px',
			':active': {
				...styles[':active'],
				backgroundColor: '#191D24',
			},
		};
	},
	dropdownIndicator: (provided: any) => ({
		...provided,
		padding: 0,
		color: '#FFFFFF8A',
	}),
	indicatorSeparator: () => ({
		display: 'none',
	}),
	valueContainer: (provided: any) => ({
		...provided,
		padding: '0',
		margin: '-2px 0 0 0',
		color: '#FFFFFF8A',
	}),
	placeholder: (provided: any) => ({
		...provided,
		margin: '0 0px',
		color: '#FFFFFF8A',
		opacity: '1',
	}),
	input: (provided: any) => ({
		...provided,
		color: '#FFFFFF8A',
		fontSize: '12px',
	}),
	singleValue: (provided: any) => ({
		...provided,
		color: '#FFFFFF8A',
		fontSize: '12px',
	}),
};
