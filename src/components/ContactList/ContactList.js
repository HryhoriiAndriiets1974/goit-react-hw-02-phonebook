import PropTypes from 'prop-types';
import css from './ContactList.module.css';

const ContactList = ({contacts, onDeleteContact}) => (
  <ul className={css.contacts}>
    {contacts.map(({id, name, number}) => (
      <li key={id} className={css.contacts__item}>
        <p className={css.contacts__name}>
          {name} : ...
          <span className={css.contacts__number}>
            {number}
          </span>
        </p>
        <button
          className={css.contacts__btn}
          type="button"
          onClick={() => onDeleteContact(id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContact: PropTypes.func.isRequired,
}

export default ContactList;
