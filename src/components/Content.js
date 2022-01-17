import React from 'react'

export const Content = () => {

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
            <h2>this is the main content</h2>
            <p onDoubleClick={handleClick}>double click</p>
            <button onClick={handleClick}>click me</button>
            <button onClick={() => handleClick2('katie')}>name</button>
            {/* this function is not called immediatley - called on the click because its wrapped in an annon function- making it a callback that only runs when clickes */}
            <button onClick={(e) => handleClick3(e)}>event</button>
            {/* this we get the event and whatever we are connecting to it- above is targer */}
        </main>
    )
}
