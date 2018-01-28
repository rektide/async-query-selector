import defer from "p-defer"

export let defaults= {
	observerOptions: {
		attributes: true,
		childList: true
	}
}

export async function* AsyncQuerySelector( selector, root, { observerOptions}= { observerOptions}){
	root= root|| document

	// listen for mutations
	var
	  // `mutated` signals the DOM has changed & a new pass needs to be run
	  mutated= Defer(),
	  observer = new MutationObserver( function( mutationList){
		// signal that there has been a mutation to anyone listening
		mutated.resolve()
		// wait for a new mutation
		mutated= defer()
	})
	observer.observe( root, { attributes: true, childList: true})

	// loop through, reporting new elements, then wait for next mutation
	var known= new WeakSet()
	while( true){
		// run the query selector
		var found= root.querySelectorAll( selector)
		for( var i= 0; i< found.length; ++i){
			var elem= found[ i]
			if( known.has( elem)){
				// skip any elements we've already returned
				continue
			}
			// the element is new to us
			known.add( elem) // now we know it
			yield start[ i] // and yield it
		}
		await mutated.promise // wait until next mutation
	}
	
}
export default AsyncQuerySelector
