import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React, { useContext } from 'react';
import useApi from '../../hooks/useApi';
import ConfirmModal from './ConfirmModal';
import { StoreContext } from '../../context/ContextProvider';

const InviteUserModal = ({
  organizationId = null,
}) => {
  const [addUserForm] = Form.useForm();
  const { refreshUserOrg } = useContext(StoreContext);
  const {
    inviteUserToOrganization,
  } = useApi();

  const clearForm = async () => {
    await addUserForm.resetFields();
  };
  const handleBeforeSubmit = async () => {
    await addUserForm.validateFields();
  };
  const handelAddUserSubmit = async () => {
    inviteUserToOrganization({
      email: addUserForm.getFieldsValue().email,
      organizationId,
    })
      .then(refreshUserOrg())
      .then(clearForm);
  };

  return (
    <ConfirmModal
      title="Invite User to the Organization!"
      onBeforeSubmit={handleBeforeSubmit}
      onOK={handelAddUserSubmit}
      onCancel={clearForm}
      openButtonTitle="Invite User"
      successMessage="Invitation sent!"
    >
      <Form layout="vertical" scrollToFirstError form={addUserForm}>
        <FormItem
          name="email"
          label="Email"
          required
          rules={[{
            required: true,
            message: 'Please input email format.',
            type: 'email',
          }]}
        >
          <Input autoFocus />
        </FormItem>
      </Form>
    </ConfirmModal>
  );
};

export default InviteUserModal;

InviteUserModal.propTypes = {
  organizationId: PropTypes.string,
};

InviteUserModal.defaultProps = {
  organizationId: '',
};
