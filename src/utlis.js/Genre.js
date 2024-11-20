import React from 'react';

export default function Genre({ item, checked, onChange }) {
    return (
        <div className='filter'>
            {item.name}
            <input
                type='checkbox'
                value={item.id}
                checked={checked}
                onChange={onChange}
            />
        </div>
    );
}
