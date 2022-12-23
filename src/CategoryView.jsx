import React from "react";

export default function CategoryView(props) {
    const [categories, setCategories] = React.useState(null)

    React.useEffect(() => {
        // Shuffle array
        if(props.categories) {
          const shuffled = props.categories.sort(() => 0.5 - Math.random())          
    
        // Get sub-array of first n elements after shuffled
        const selected = shuffled.slice(0, 4)

        const selectOptions = selected.map(category => <option key={category.id} value={category.id}>{category.name}</option>)
        selectOptions.unshift(<option value="" >Select a category</option>)
        
        setCategories(selectOptions)
        }
    },[])

    return (     
    <div className="Category">
        <h2>Round {parseInt(props.round) +1}</h2>
        <h3>Player {parseInt(props.index) +1}</h3>
        <div className="Category--item"><label htmlFor="category">Choose a category:</label>
        {categories && <select id="category" value={props.player.rounds[props.round].categoryId} onChange={props.handleChange}>
            {categories}
        </select>}</div>
        <button onClick={props.handleClick}>Start quetions</button>
    </div>)
}