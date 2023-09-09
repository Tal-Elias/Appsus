const { useState, useEffect } = React

export function EmailFolderList({onSelectedCategory,selectedCategory}){
const [activeCategory,setActiveCategory]=useState(selectedCategory)

useEffect(()=>{
setActiveCategory(selectedCategory)
},[activeCategory])

function handleSelectedCategory(category){
console.log(category)
setActiveCategory(category)
onSelectedCategory(category)

}
return(
    <section  className="email-folder-list">
        <button onClick={()=>{handleSelectedCategory('inbox')}} className="fa inbox" ><h5>inbox</h5></button>
        <button onClick={()=>{handleSelectedCategory('sent')}}className="fa sent"><h5>sent</h5></button>
        <button onClick={()=>{handleSelectedCategory('trash')}}className="fa trash"> <h5>trash</h5></button>
        <button onClick={( )=>{handleSelectedCategory('draft')}}className="fa draft"> <h5>draft</h5></button>
    </section>
)
}