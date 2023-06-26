import React, {useState} from 'react';
import ContactForm from '../ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import ContactsList from '../ContactsList/ContactsList';
import Filter from '../Filter/Filter';
import Container from '../Container/Container';
import { ToastContainer, toast } from 'react-toastify';
import css from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import useLocalStorage from 'hooks/useLocalStorage';

const LS_KEY='contacts';

const App=()=>{
  //ленивая инициализация состояния - передаем ссылку на функцию, которая возвращает первоначальное значение - вызов только при первом рендере
  //const [contacts, setContacts] = useState(()=>JSON.parse(window.localStorage.getItem(LS_KEY)) ?? [ ]);

  const [contacts, setContacts] = useLocalStorage(LS_KEY, []);
  const [filter, setFilter] = useState('');

  //уже не нужно, есть useLocalStorage
  // useEffect(()=>{
  //   window.localStorage.setItem(LS_KEY, JSON.stringify(contacts));
    
  // }, [contacts]);


  const addContact = (name, number)=> {  
    const contact = {
      id: nanoid(),
      name,
      number,

    };
    const normalizedName = name.toLowerCase();
    const isInContacts=contacts.findIndex(({name})=>name.toLowerCase()===normalizedName );

    if(isInContacts===-1){
      setContacts(prevState=>[ ...prevState, contact]);
    }
    else{
      toast.error(`${name} is already in contacts`);
    }
   

  };

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
    
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const deleteContact = (contactId) => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId));
  
  };

  const visibleContacts = getVisibleContacts();

  return(
    <>
    <Container>
    
    <h1 className={css.phonebook__title}>Phonebook</h1>
    <ToastContainer autoClose="3000" theme="colored"/>
    <ContactForm onSubmit={addContact}/>
    <Filter value={filter} onChange={changeFilter} />
    <ContactsList contacts={visibleContacts} onDeleteContact={deleteContact}/>
    </Container>
    </>
  );
  
}

export default App;
