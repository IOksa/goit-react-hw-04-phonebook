import React, {Component} from 'react';
import ContactForm from '../ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import ContactsList from '../ContactsList/ContactsList';
import Filter from '../Filter/Filter';
import Container from '../Container/Container';
import { ToastContainer, toast } from 'react-toastify';
import css from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';

const LS_KEY='contacts';

class App extends Component{
  state = {
    contacts: [ ],
    filter: '',

  }

  componentDidMount(){
    const contacts = localStorage.getItem(LS_KEY);
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
        localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }

  }


  addContact = ({name, number})=> {
    const contact = {
      id: nanoid(),
      name,
      number,

    };
    const normalizedName = name.toLowerCase();
    const isInContacts=this.state.contacts.findIndex(({name})=>name.toLowerCase()===normalizedName );

    if(isInContacts===-1){
      this.setState(({ contacts }) => ({contacts: [ ...contacts, contact]}));
    }
    else{
      // alert(`${name} is already in contacts`);
      toast.error(`${name} is already in contacts`);
    }
   

  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };



  render(){
    const {filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return(
    <>
    <Container>
    
    <h1 className={css.phonebook__title}>Phonebook</h1>
    <ToastContainer autoClose="3000" theme="colored"/>
    <ContactForm onSubmit={this.addContact}/>
    <Filter value={filter} onChange={this.changeFilter} />
    <ContactsList contacts={visibleContacts} onDeleteContact={this.deleteContact}/>
    </Container>
    </>
    );
  }
}

export default App;
