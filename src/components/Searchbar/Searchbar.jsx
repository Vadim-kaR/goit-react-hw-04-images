import PropTypes from 'prop-types';
import { Formik } from 'formik';
// import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import {
  SearchbarHeader,
  SearchBtn,
  Input,
  SearchForm,
  Error,
} from './Searchbar.styled';
import * as yup from 'yup';

const Searchbar = ({ onSubmit }) => {
  const scheme = yup.object().shape({
    name: yup.string().trim().required('This field must not be empty'),
  });

  const handleFormSubmit = ({ name }, { resetForm }) => {
    onSubmit(name);
    resetForm();
  };

  return (
    <SearchbarHeader>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={scheme}
        onSubmit={handleFormSubmit}
      >
        <SearchForm>
          <SearchBtn type="submit">
            <ImSearch size={24} />
          </SearchBtn>
          <Input
            type="text"
            name="name"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <Error component="div" name="name" />
        </SearchForm>
      </Formik>
    </SearchbarHeader>
  );
};

export { Searchbar };

Searchbar.prototype = {
  onSubmit: PropTypes.func,
};
