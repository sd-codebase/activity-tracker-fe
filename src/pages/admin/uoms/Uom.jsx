import './uom.scss'
import { Header, Icon, Form, Input, Button, Table, Message } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { url } from '../../../services/url.service';
import { http } from '../../../services/http.service';


const Uom = () => {
  const [uom, setUom] = useState('');
  const [uomList, setUomList] = useState([]);
  const [message, setMessage] = useState({show: false});

  useEffect(() => {
    fetchUoms();
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

  const fetchUoms = async () => {
    try {
      const {data: list} = await http.get(url('uoms'));
      setUomList(list);
    } catch (error) {
      showMessage('red', 'Error while fecting uoms');
    }
  }

  const createUom = async () => {
    try {
      if (uom) {
        const {data} = await http.post(url('uoms'), {name: uom});
        setUomList([data, ...uomList]);
        setUom('');
      } else {
        throw {error: 'Uom cannot be empty'};
      }
    } catch (error) {
      showMessage('red', error.error || 'Error while creating uom');
    }
  }

  const changeStateOfUom = async (updatingUom) => {
    try {
      updatingUom.isDeactivated = !updatingUom.isDeactivated;
      const {data} = await http.put(url(`uoms/${updatingUom._id}`), updatingUom);
      const updatedUomList = uomList;
      const uomToUpdateInList = updatedUomList.find(uomItem => uomItem._id === updatingUom._id);
      if (uomToUpdateInList) {
        uomToUpdateInList.isDeactivated = data.isDeactivated;
        setUomList([...updatedUomList]);
      }
    } catch (error) {
      showMessage('red', 'Error while updating uom');
    }
  }

  return (
    <div>
      <Header as='h3'>
        <Icon name='law' color='blue' size='small' />
        <Header.Content>Units of Measurements</Header.Content>
      </Header>
      { message.show && (
          <Message color={message.type}>{message.text}</Message>
        )
      }
      <Form onSubmit={createUom}>
        <Form.Group>
          <Form.Field inline>
            <label htmlFor='newuom'>Add new Uom</label>
            <Input id='newuom' placeholder='Unit of measurement' value={uom} onChange={(e) => setUom(e.target.value)}/>
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
            <Table.HeaderCell>Uom</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            uomList && uomList.length && uomList.map((item) => {
              const {isDeactivated, _id, name} = item;
              return (
                <Table.Row key={_id}>
                  <Table.Cell disabled={isDeactivated}>{name}</Table.Cell>
                  <Table.Cell>{isDeactivated ? <Icon name='ban' color='red'/> : <Icon name='check' color='green' />}</Table.Cell>
                  <Table.Cell className='action' onClick={() => changeStateOfUom(item)}>{isDeactivated ? 'Activate' : 'Deactivate'}</Table.Cell>
                </Table.Row>
              );
            })
          }
        </Table.Body>
      </Table>
    </div>
  )
}

export default Uom