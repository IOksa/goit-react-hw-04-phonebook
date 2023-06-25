import React, { useState } from 'react';
import css from './ContactForm.module.css';

const ContactForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');


    const handleChange = evt => {
        const { name, value } = evt.target;
    
        switch (name) {
          case 'name':
            setName(value);
            break;
    
          case 'number':
            setNumber(value);
            break;
    
          default:
            console.warn(`Тип поля name - ${name} не обрабатывается`);
        }
      };


    
    const handleSubmit = e => {
        e.preventDefault();
       
        onSubmit(name, number);
        
        setName('');
        setNumber('');
    };
 

   
    return(
        <form onSubmit={handleSubmit} className={css.phonebook__formContact}>
            <label className={css.phonebook__formContactLabel}>Name</label>
            <input
                type="name"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                value={name}
                onChange={handleChange}
                className={css.phonebook__formContactInput}
                />
            
            <label className={css.phonebook__formContactLabel}>Number</label>
            <input
                type="tel"
                name="number"
                pattern="^[0-9]+$"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                value={number}
                onChange={handleChange}
                className={css.phonebook__formContactInput}
                />
            
            <button type="submit" className={css.form__button}>
            Add contact
            </button>
        </form>
    
    
    );


    
}

export default ContactForm;