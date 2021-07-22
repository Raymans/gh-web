import { Form, Input, message, Table } from 'antd';
import React, { useContext } from 'react';
import FormItem from 'antd/lib/form/FormItem';
import useApi from '../../hooks/useApi';
import ConfirmModal from './ConfirmModal';
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl';
import { StoreContext } from '../../context/ContextProvider';
import StyledTable from '../StyledComponent/StyledTable';

const { Column } = Table;

const DeptForm = ({ form }) => {
  const intl = useIntl();
  return (
    <Form layout="vertical" form={form}>
      <FormItem
        name="departmentName"
        label={intl.formatMessage({ defaultMessage: 'Department Name' })}
        required
        rules={[{
          required: true,
          message: <FormattedMessage defaultMessage="Please input Department Name"/>
        }]}
      >
        <Input autoFocus/>
      </FormItem>
    </Form>
  );
};

const Departments = () => {
  const intl = useIntl();
  const [deptForm] = Form.useForm();
  const {
    userProfile,
    departments,
    refreshDepartments
  } = useContext(StoreContext);
  const {
    createDepartment,
    deleteDepartment,
    updateDepartment
  } = useApi();

  const handleBeforeSubmit = async () => {
    await deptForm.validateFields();
  };
  const handleNewDepartment = () => {
    return createDepartment({
      departmentName: deptForm.getFieldsValue().departmentName
    })
      .then(refreshDepartments)
      .then(() => deptForm.resetFields())
      .catch(() => {
        message.error(intl.formatMessage({ defaultMessage: 'Create department fail, seems like the department is already existed.' }));
        return Promise.reject();
      });
  };

  const handleEditDepartment = (dept) => {
    return updateDepartment({
      departmentId: dept.id,
      departmentName: deptForm.getFieldsValue().departmentName
    })
      .then(refreshDepartments)
      .then(() => deptForm.resetFields())
      .catch(() => {
        message.error(intl.formatMessage({ defaultMessage: 'Update department fail, seems like the department is already existed.' }));
        return Promise.reject();
      });
  };

  const handleDeleteDept = (dept) => {
    return deleteDepartment({ departmentId: dept.id })
      .then(() => refreshDepartments())
      .catch(() => {
        message.error(intl.formatMessage({ defaultMessage: 'Delete department fail, seems like Users exist in this department.' }));
        return Promise.reject();
      });
  };

  return (
    <>
      {
        userProfile?.accountPrivilege === 'OWNER' &&
        <ConfirmModal
          openButtonTitle={intl.formatMessage({ defaultMessage: 'New Department' })}
          submitButtonTitle={intl.formatMessage({ defaultMessage: 'Create' })}
          title={intl.formatMessage({ defaultMessage: 'New Department' })}
          onBeforeSubmit={handleBeforeSubmit}
          onOK={handleNewDepartment}
          onOpen={async () => deptForm.setFieldsValue({ departmentName: '' })}
        >
          <DeptForm form={deptForm}/>
        </ConfirmModal>
      }
      <StyledTable dataSource={departments} pagination={false} size="small">
        <Column title={intl.formatMessage({ defaultMessage: 'Name' })} dataIndex="name" key="name"/>
        {
          userProfile?.accountPrivilege === 'OWNER' &&
          <Column
            align="right"
            render={(text, record) => (
              <div key={record.id}>
                <ConfirmModal
                  openButtonTitle={intl.formatMessage({ defaultMessage: 'Edit' })}
                  submitButtonTitle={intl.formatMessage({ defaultMessage: 'Update' })}
                  title={intl.formatMessage({ defaultMessage: 'Edit Department' })}
                  onBeforeSubmit={handleBeforeSubmit}
                  onOK={() => handleEditDepartment(record)}
                  onOpen={async () => deptForm.setFieldsValue({ departmentName: record.name })}
                  openButtonType="link"
                >
                  <DeptForm form={deptForm} name={record.name}/>
                </ConfirmModal>
                <ConfirmModal
                  title={intl.formatMessage({ defaultMessage: 'Delete Department' })}
                  onOK={() => handleDeleteDept(record)}
                  openButtonTitle={intl.formatMessage({ defaultMessage: 'Delete' })}
                  submitButtonTitle={intl.formatMessage({ defaultMessage: 'Delete' })}
                  danger
                  openButtonType="link"
                >
                  {intl.formatMessage({ defaultMessage: 'Are you sure you want to Delete the Department: {name}?' }, { name: record.name })}
                </ConfirmModal>
              </div>
            )}
          />
        }
      </StyledTable>
    </>
  );
};

export default Departments;
