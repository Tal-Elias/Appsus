const { useState, useEffect } = React

export function EmailFolderList({onSelectedCategory}){
const [activeCategory,setactiveCategory]=useState('inbox')

function handleSelectedCategory(ev,category){
ev.preventDefault()
console.log(ev.target.value)
setactiveCategory(category)
onSelectedCategory(activeCategory)
}
return(
    <section  className="email-folder-list">
        <button onClick={(ev)=>{handleSelectedCategory(ev,'inbox')}} className="fa inbox" ><h5>inbox</h5></button>
        <button className="fa sent"><h5>sent</h5></button>
        <button className="fa trash"> <h5>trash</h5></button>
        <button className="fa draft"> <h5>draft</h5></button>
    </section>
)
}