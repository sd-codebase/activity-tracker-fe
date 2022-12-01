import './forms.scss';
import { Header, Icon, Form, Input, Button, Table, Message } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { url } from '../../../services/url.service';
import { http } from '../../../services/http.service';

const Forms = () => {
  const [form, setForm] = useState('');
  const [formList, setFormList] = useState([]);
  const [message, setMessage] = useState({show: false});

  useEffect(() => {
    fetchForms();
  }, []);

  const showMessage = (type, text) => {
    setMessage({show: true, type, text});
    const timer = setTimeout(() => {
      if (setMessage) {
        setMessage({show: false});
      }
      if (timer) {
        clearTimeout()
      }
    }, 2000);
  }

  const fetchForms = async () => {
    try {
      const {data: list} = await http.get(url('forms'));
      setFormList(list);
    } catch (error) {
      showMessage('red', 'Error while fecting forms');
    }
  }

  const createForm = async () => {
    try {
      if (form) {
        const {data} = await http.post(url('forms'), {name: form});
        setFormList([data, ...formList]);
        setForm('');
      } else {
        throw {error: 'Form cannot be empty'};
      }
    } catch (error) {
      showMessage('red', error.error || 'Error while creating form');
    }
  }

  const changeStateOfForm = async (updatingForm) => {
    try {
      updatingForm.isDeactivated = !updatingForm.isDeactivated;
      const {data} = await http.put(url(`forms/${updatingForm._id}`), updatingForm);
      const updatedFormList = formList;
      const formToUpdateInList = updatedFormList.find(formItem => formItem._id === updatingForm._id);
      if (formToUpdateInList) {
        formToUpdateInList.isDeactivated = data.isDeactivated;
        setFormList([...updatedFormList]);
      }
    } catch (error) {
      showMessage('red', 'Error while updating form');
    }
  }

  return (
    <div>
      <Header as='h3'>
        <Icon name='wpforms' color='blue' size='small' />
        <Header.Content>Forms</Header.Content>
      </Header>
      { message.show && (
          <Message color={message.type}>{message.text}</Message>
        )
      }
      <Form onSubmit={createForm}>
        <Form.Group>
          <Form.Field inline>
            <label htmlFor='newform'>Add new Form</label>
            <Input id='newform' placeholder='Form Name' value={form} onChange={(e) => setForm(e.target.value)}/>
          </Form.Field>
          <Button primary type='submit'>
            <Icon name='plus'/>
            Create
          </Button>
        </Form.Group>
      </Form>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Form</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            formList && formList.length && formList.map((item) => {
              const {isDeactivated, _id, name} = item;
              return (
                <Table.Row key={_id}>
                  <Table.Cell disabled={isDeactivated}>{name}</Table.Cell>
                  <Table.Cell>{isDeactivated ? <Icon name='ban' color='red'/> : <Icon name='check' color='green' />}</Table.Cell>
                  <Table.Cell>
                    <div className="action">
                      <span onClick={() => changeStateOfForm(item)}>
                        {isDeactivated ? 'Activate' : 'Deactivate'}
                      </span>
                      <Icon name='edit' color='yellow'/>
                      <Icon name='eye' color='green'/>
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })
          }
        </Table.Body>
      </Table>
    </div>
  )
}

export default Forms