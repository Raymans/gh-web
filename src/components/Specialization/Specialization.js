import { Select } from 'antd';
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { StoreContext } from '../../context/ContextProvider';
import useApi from '../../hooks/useApi';
import { useIntl } from 'gatsby-plugin-intl';

const Specialization = ({
  onSelect,
  selected
}) => {
  const { getSpecializations } = useApi();
  const intl = useIntl();
  const store = useContext(StoreContext);
  const {
    specializations,
    setSpecializations
  } = store;
  const selectedValueProp = selected ? { value: selected } : '';

  useEffect(() => {
    getSpecializations()
      .then(((data = []) => {
        const { sp = '' } = queryString.parse(location.search);
        const value = data.find((s) => s.name === sp);
        setSpecializations(data);
        onSelect(value ? value.id : selected);
      }));
  }, []);

  const handleSelect = (value) => {
    onSelect(value);
  };

  return (
    specializations.length > 0
    && (
      <Select
        placeholder={intl.formatMessage({ defaultMessage: 'Specialization' })}
        optionFilterProp="children"
        {...selectedValueProp}
        style={{ width: 200 }}
        onSelect={handleSelect}
      >
        {specializations && specializations.map((spec) => (
          <Select.Option key={spec.id} value={spec.id}>{spec.name}</Select.Option>
        ))}
      </Select>
    )
  );
};

Specialization.propTypes = {
  onSelect: PropTypes.func
};

export default Specialization;

Specialization.defaultProps = {
  onSelect: () => {
  }
};
