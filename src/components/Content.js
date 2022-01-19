import { useState } from 'react'

export const Content = () => {
    const [name, setName] = useState('katie');

    const handleNameChange = () =>{
        const names=['katie', 'molly', 'mary', 'kiersten'];
        const int = Math.floor(Math.random()*4);
        setName(names[int]);
    }
    //how you make random selections- *4 because there are 4 names

    const handleClick = () => {
        console.log('you clicked it');
    };

    const handleClick2 = (name) => {
        console.log(`${name} you clicked it`);
    };

    const handleClick3 = (e) => {
        console.log(e.target);
        };

    return (
        <main>
        <h1>Who is driving?</h1>
            <h2>{name} is driving tonight!</h2>
            <button onClick={handleNameChange}>click to see</button>
            <br />
            <h3> random buttons in console </h3>
            <p onDoubleClick={handleClick}>double click</p>
            <button onClick={() => handleClick2('katie')}>name</button>
            {/* this function is not called immediatley - called on the click because its wrapped in an annon function- making it a callback that only runs when clickes */}
            <button onClick={(e) => handleClick3(e)}>event</button>
            {/* this we get the event and whatever we are connecting to it- above is targer */}
        </main>
    )
}
