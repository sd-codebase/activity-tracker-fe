import './options.scss';
import { Header, Icon, Form, Input, Button, Table, Message } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { url } from '../../../services/url.service';
import { http } from '../../../services/http.service';


const Options = () => {
  const [option, setOption] = useState('');
  const [optionList, setOptionList] = useState([]);
  const [message, setMessage] = useState({show: false});

  useEffect(() => {
    fetchOptions();
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

  const fetchOptions = async () => {
    try {
      const {data: list} = await http.get(url('options'));
      setOptionList(list);
    } catch (error) {
      showMessage('red', 'Error while fecting options');
    }
  }

  const createOption = async () => {
    try {
      if (option) {
        const {data} = await http.post(url('options'), {name: option});
        setOptionList([data, ...optionList]);
        setOption('');
      } else {
        throw {error: 'Option cannot be empty'};
      }
    } catch (error) {
      showMessage('red', error.error || 'Error while creating option');
    }
  }

  const changeStateOfOption = async (updatingOption) => {
    try {
      updatingOption.isDeactivated = !updatingOption.isDeactivated;
      const {data} = await http.put(url(`options/${updatingOption._id}`), updatingOption);
      const updatedOptionList = optionList;
      const optionToUpdateInList = updatedOptionList.find(optionItem => optionItem._id === updatingOption._id);
      if (optionToUpdateInList) {
        optionToUpdateInList.isDeactivated = data.isDeactivated;
        setOptionList([...updatedOptionList]);
      }
    } catch (error) {
      showMessage('red', 'Error while updating option');
    }
  }

  return (
    <div>
      <Header as='h3'>
        <Icon name='options' color='blue' size='small' />
        <Header.Content>Options</Header.Content>
      </Header>
      { message.show && (
          <Message color={message.type}>{message.text}</Message>
        )
      }
      <Form onSubmit={createOption}>
        <Form.Group>
          <Form.Field inline>
            <label htmlFor='newoption'>Add new Option</label>
            <Input id='newoption' placeholder='Option' value={option} onChange={(e) => setOption(e.target.value)}/>
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
            <Table.HeaderCell>Option</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            optionList && optionList.length && optionList.map((item) => {
              const {isDeactivated, _id, name} = item;
              return (
                <Table.Row key={_id}>
                  <Table.Cell disabled={isDeactivated}>{name}</Table.Cell>
                  <Table.Cell>{isDeactivated ? <Icon name='ban' color='red'/> : <Icon name='check' color='green' />}</Table.Cell>
                  <Table.Cell className='action' onClick={() => changeStateOfOption(item)}>{isDeactivated ? 'Activate' : 'Deactivate'}</Table.Cell>
                </Table.Row>
              );
            })
          }
        </Table.Body>
      </Table>
    </div>
  )
}

export default Options