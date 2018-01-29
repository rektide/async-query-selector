import triggerableGeneration from "triggerable-generation"

export let defaults= {
	observerOptions: {
		attributes: true,
		childList: true
	}
}

export async function* AsyncQuerySelector( selector, root, { observerOptions}= { observerOptions}){
	root= root|| document
	function generator(){
		return root.querySelectorAll( selector)
	}

	// whenever triggered, run the generator
	var triggerableGeneration= TriggerableGeneration( generator)

	// whenever mutated, trigger the generator
	var observer = new MutationObserver( triggerableGeneration.trigger)
	// observe root
	observer.observe( root, observerOptions)

	yield* triggerableGeneration.asyncGenerator()
}
export default AsyncQuerySelector
