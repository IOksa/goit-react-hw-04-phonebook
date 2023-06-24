import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ value, onChange }) => (
  <>
    <label className={css.filter__label}>Find contacts by name </label>
    <input type="text" value={value} placeholder='search...' onChange={onChange} className={css.filter__input}/>
  
  </>
  );
  
  export default Filter;

  Filter.propTypes={
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired, 
    
};