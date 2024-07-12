function handleSubmitAllClick() {
	const forms = document.querySelectorAll("form");
	const formData1 = new FormData(forms[0]);
	const formData2 = new FormData(forms[1]);
	
	let reqData = {}
	
	for(let entry of formData1.entries()) {
		const [ key, value ] = entry;
		reqData = {
			...reqData,
			[key]: value
		}
	}
	
	let duplicatedKeys = [];
	let keyCount = {}
	
	for(let key of formData2.keys()) {
		if(Object.keys(keyCount).includes(key)) {
			keyCount = {
				...keyCount,
				[key]: keyCount[key] + 1
			}
			continue;
		}
		keyCount = {
			...keyCount,
			[key]: 1
		}
	}
	
	for(let key of Object.keys(keyCount)) {
		if(keyCount[key] > 1) {
			duplicatedKeys = [ ...duplicatedKeys, key ];
		}
	}
	
	console.log(keyCount);
	console.log(duplicatedKeys);
	
	for(let entry of formData2.entries()) {
		const [ key, value ] = entry;
		if(duplicatedKeys.includes(key)) {
			reqData = {
				...reqData,
				[key]: [ ...(!reqData[key] ? [] : reqData[key]), value ]
			}
			continue;
		}
		reqData = {
			...reqData,
			[key]: value
		}
		
	}
	
	console.log(reqData);
	
	const queryString = new URLSearchParams(reqData).toString();
	
	fetch(`http://localhost:8080/dvd/form?${queryString}`,{
		method: "get"
	})
	
}






