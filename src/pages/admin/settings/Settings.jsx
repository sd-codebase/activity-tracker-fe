import { Header, Icon  } from 'semantic-ui-react';

const AdminSettings = () => {
  return (
    <div>
      <Header as='h3'>
        <Icon name='settings' color='blue' size='small' />
        <Header.Content>Settings</Header.Content>
      </Header>
    </div>
  )
}

export default AdminSettings