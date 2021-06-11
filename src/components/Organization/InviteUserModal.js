import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React, { useContext } from 'react';
import useApi from '../../hooks/useApi';
import ConfirmModal from './ConfirmModal';
import { StoreContext } from '../../context/ContextProvider';
import { useIntl } from 'gatsby-plugin-intl';

const InviteUserModal = ({
  organizationId = null
}) => {
  const [addUserForm] = Form.useForm();
  const { refreshUserOrg } = useContext(StoreContext);
  const {
    inviteUserToOrganization
  } = useApi();
  const intl = useIntl();

  const clearForm = async () => {
    await addUserForm.resetFields();
  };
  const handleBeforeSubmit = async () => {
    await addUserForm.validateFields();
  };
  const handelAddUserSubmit = async () => {
    await inviteUserToOrganization({
      email: addUserForm.getFieldsValue().email,
      organizationId
    })
      .then(() => refreshUserOrg())
      .then(() => clearForm);
  };

  return (
    <ConfirmModal
      title={intl.formatMessage({ defaultMessage: 'Invite User to the Organization!' })}
      onBeforeSubmit={handleBeforeSubmit}
      onOK={handelAddUserSubmit}
      onCancel={clearForm}
      openButtonTitle={intl.formatMessage({ defaultMessage: 'Invite User' })}
      successMessage={intl.formatMessage({ defaultMessage: 'Invitation sent!' })}
    >
      <Form layout="vertical" scrollToFirstError form={addUserForm}>
        <FormItem
          name="email"
          label={intl.formatMessage({ defaultMessage: 'Email' })}
          required
          rules={[{
            required: true,
            message: intl.formatMessage({ defaultMessage: 'Please input email format.' }),
            type: 'email'
          }]}
        >
          <Input autoFocus/>
        </FormItem>
      </Form>
    </ConfirmModal>
  );
};

export default InviteUserModal;

InviteUserModal.propTypes = {
  organizationId: PropTypes.string
};

InviteUserModal.defaultProps = {
  organizationId: ''
};
