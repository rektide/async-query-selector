# Async Query Selector

> A live querySelctorAll, as an async iterator

Create a querySelectorAll which will be re-run in response to DOM Mutation events. Already returned elements will not be returned again.

# Example

In the example below, the async query selector is setup to log all img's to console. Then, once running, a new image is added to the page. This too is logged, demonstrating the "live"-ness of the async-query-selector.

```
import AsyncQuerySelector from "async-query-selector"
async function logImgs(){
	for await( let img of AsyncQuerySelector( "img")){
		console.log({ img})
	}
}
logImgs()
var porg= document.createElemnt("img")
// via https://twitter.com/kyle_newman/status/914273019819970561
porg.src= "https://pbs.twimg.com/media/DRmCuNzW4AEXkM9.jpg:large"
document.body.appendChild( porg) //=> {img: ...}
```
