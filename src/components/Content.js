import { useState } from 'react'

export const Content = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            checked: true,
            item: "One half pound bag of Cocoa Covered Almonds Unsalted"
        },
        {
            id: 2,
            checked: false,
            item: "Item 2"
        },
        {
            id: 3,
            checked: false,
            item: "Item 3"
        }
    ]);


    return (
        <main>
        <ul>
            {items.map((item) => (
                <li key={item.id} className="item">
                    <input
                        type="checkbox"
                        checked={item.checked}
                    />
                <label>{item.item}</label>
                <button>delete</button>
                </li>
            ))}
        </ul>

        </main>
    )
}
