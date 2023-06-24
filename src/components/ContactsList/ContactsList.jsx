import ContactsListItem from '../ContactsListItem/ContactsListItem';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

const ContactsList = ({contacts, ...otherProps})=>(
    <>
    <h2 className={css.contactList__title}>Contacts</h2>
    <ul className={css.contactList__list}>
        {contacts.map(contact=>(
            <li key={contact.id} className={css.contactList__item}>
                <ContactsListItem contact={contact} {...otherProps}/>
            </li>
        
        ))}
    </ul>
    </>
);

export default ContactsList;

ContactsList.propTypes={
    contacts: PropTypes.arrayOf(
    PropTypes.exact({
        id: PropTypes.string.isRequired,
        name:  PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    }).isRequired,
    ),
    onDeleteContact: PropTypes.func.isRequired,
}; 