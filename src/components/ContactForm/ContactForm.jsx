import React, { Component } from 'react';
import css from './ContactForm.module.css';

class ContactForm extends Component{
    state = {
        name: '',
        number: '',
    };



    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });

    };
    
    handleSubmit = e => {
        e.preventDefault();
       
        this.props.onSubmit(this.state);
    
        this.setState({ name: '', number: '' });
    };
 

    render(){
        return(
            <form onSubmit={this.handleSubmit} className={css.phonebook__formContact}>
                <label className={css.phonebook__formContactLabel}>Name</label>
                <input
                    type="name"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    value={this.state.name}
                    onChange={this.handleChange}
                    className={css.phonebook__formContactInput}
                    />
                
                <label className={css.phonebook__formContactLabel}>Number</label>
                <input
                    type="tel"
                    name="number"
                    pattern="^[0-9]+$"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    value={this.state.number}
                    onChange={this.handleChange}
                    className={css.phonebook__formContactInput}
                    />
               
                <button type="submit" className={css.form__button}>
                Add contact
                </button>
            </form>
        
        
        );


    }  
}

export default ContactForm;