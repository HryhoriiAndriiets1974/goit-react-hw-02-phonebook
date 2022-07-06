import { Component } from "react";
import {nanoid} from 'nanoid';
import Form from "./Form";
import ContactList from "./ContactList";
import Filter from "./Filter";

class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }

  changeFilter = e => {
    this.setState({filter: e.currentTarget.value});
  }

  newContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  delContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
      filter: '',
    }));
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(({ contacts }) => {
      if (contacts.some(contact => contact.name === name)) {
        return alert(`${contact.name} is already in contacts`);
      }
      if (contacts.some(contact => contact.number === number)) {
        return alert(`${contact.number} is already in contacts`);
      }
      return {contacts: [contact, ...contacts],};
    });
  };

  render () {
    const { contacts, filter} = this.state;
    const visibleContacts = this.newContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <Form
          onSubmit={this.addContact}
        />
        <h1>Contacts :</h1>
        <Filter
          value={filter}
          onChange={this.changeFilter}
        />
       {  contacts.length
            ? <ContactList
                contacts={visibleContacts}
                onDeleteContact={this.delContact}
              />
            : <p>Your phonebook is empty !!!</p>
        }
      </div>
    )
  }
};

export default App;
