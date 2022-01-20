import { FaTrashAlt } from 'react-icons/fa';

export const Content = ({ items , handleCheck, handleDelete }) => {


    return (
        <main>
            {items.length ? (
                <ul>
                    {items.map((item) => (
                        <li key={item.id} className="item">
                            <input
                                type="checkbox"
                                onChange={() => handleCheck(item.id)}
                                checked={item.checked}
                            />
                        <label
                            style={item.checked ? { textDecoration: 'line-through'} : null}
                            onDoubleClick={() => handleCheck(item.id)}
                        >{item.item}</label>
                        <FaTrashAlt 
                            onClick={() => handleDelete(item.id)}
                            role="button" 
                            tabIndex="0" />
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={{marginTop : '2rem' }}> Your list is empty. </p>
            )}

        </main>
    )
}
