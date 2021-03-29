import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React, { useContext } from 'react';
import useApi from '../../hooks/useApi';
import ConfirmModal from './ConfirmModal';
import { StoreContext } from '../../context/ContextProvider';

const AddUserModal = ({
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
      .then(refreshUserOrg({ id: organizationId }))
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
            message: 'Please input email',
          }]}
        >
          <Input />
        </FormItem>
        <FormItem name="department" label="Department">
          <Input />
        </FormItem>
      </Form>
    </ConfirmModal>
  );
};

export default AddUserModal;

AddUserModal.propTypes = {
  organizationId: PropTypes.string,
};

AddUserModal.defaultProps = {
  organizationId: '',
};
