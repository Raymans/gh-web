import {
  Form, Input, message, Table,
} from 'antd';
import React, { useEffect, useState } from 'react';
import FormItem from 'antd/lib/form/FormItem';
import useApi from '../../hooks/useApi';
import ConfirmModal from './ConfirmModal';

const { Column } = Table;

const DeptForm = ({ form }) => (
  <Form layout="vertical" form={form}>
    <FormItem
      name="departmentName"
      label="Department Name"
      required
      rules={[{
        required: true,
        message: 'Please input Department Name',
      }]}
    >
      <Input />
    </FormItem>
  </Form>
);

const Departments = () => {
  const [deptForm] = Form.useForm();
  const [departments, setDepartments] = useState([]);
  const {
    getDepartments, createDepartment, deleteDepartment, updateDepartment,
  } = useApi();

  const retrieveDepts = () => getDepartments()
    .then((data) => {
      setDepartments(data.results);
    });

  const handleBeforeSubmit = async () => {
    await deptForm.validateFields();
  };
  const handleNewDepartment = () => {
    createDepartment({
      departmentName: deptForm.getFieldsValue().departmentName,
    })
      .then(retrieveDepts)
      .then(() => deptForm.resetFields())
      .catch(() => {
        message.error('Create department fail, seems like the department is already existed.');
        throw new Error('Create department fail, seems like the department is already existed.');
      });
  };

  const handleEditDepartment = (dept) => {
    updateDepartment({
      departmentId: dept.id,
      departmentName: deptForm.getFieldsValue().departmentName,
    })
      .then(retrieveDepts)
      .then(() => deptForm.resetFields())
      .catch(() => {
        message.error('Update department fail, seems like the department is already existed.');
        throw new Error('Update department fail, seems like the department is already existed.');
      });
  };

  const handleDeleteDept = (dept) => {
    deleteDepartment({ departmentId: dept.id })
      .then(() => retrieveDepts());
  };
  useEffect(() => {
    retrieveDepts();
  }, []);
  return (
    <>
      <ConfirmModal
        openButtonTitle="New Department"
        submitButtonTitle="Create"
        title="New Department"
        onBeforeSubmit={handleBeforeSubmit}
        onOK={handleNewDepartment}
        onOpen={() => deptForm.setFieldsValue({ departmentName: '' })}
      >
        <DeptForm form={deptForm} />
      </ConfirmModal>
      <Table dataSource={departments} pagination={false} size="small">
        <Column title="Name" dataIndex="name" key="name" />
        <Column
          align="right"
          render={(text, record) => (
            <div key={record.id}>
              <ConfirmModal
                openButtonTitle="Edit"
                submitButtonTitle="Update"
                title="Edit Department"
                onBeforeSubmit={handleBeforeSubmit}
                onOK={() => handleEditDepartment(record)}
                onOpen={() => deptForm.setFieldsValue({ departmentName: record.name })}
                openButtonType="link"
              >
                <DeptForm form={deptForm} name={record.name} />
              </ConfirmModal>
              <ConfirmModal
                title="Delete Department"
                onOK={() => handleDeleteDept(record)}
                openButtonTitle="Delete"
                submitButtonTitle="Delete"
                danger
                openButtonType="link"
              >
                {`Are you sure you want to Delete the Department: ${record.name}?`}
              </ConfirmModal>
            </div>
          )}
        />
      </Table>
    </>
  );
};

export default Departments;
