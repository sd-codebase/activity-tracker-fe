import {useState} from 'react';
import './adminLayout.scss';
import { Outlet, Link } from "react-router-dom";
import Logout from '../../../components/logout/Logout';
import {
  Header,
  Icon,
  Menu,
  Segment,
  Sidebar,
  Divider,
} from 'semantic-ui-react'


const AdminLayout = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="admin-layout">
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          onHide={() => setVisible(false)}
          vertical
          visible={visible}
          width='thin'
        >
          <Link to="/admin">
            <Menu.Item as='a' onClick={() => setVisible(false)}>
              <Icon name='dashboard' />
              Dashbord
            </Menu.Item>
          </Link>
          <Link to="/admin/uoms">
            <Menu.Item as='a' onClick={() => setVisible(false)} title='Units of measurements'>
              <Icon name='law' />
              Uom
            </Menu.Item>
          </Link>
          <Link to="/admin/options">
            <Menu.Item as='a' onClick={() => setVisible(false)}>
              <Icon name='options' />
              Options
            </Menu.Item>
          </Link>
          <Link to="/admin/forms">
            <Menu.Item as='a' onClick={() => setVisible(false)}>
              <Icon name='wpforms' />
              Forms
            </Menu.Item>
          </Link>
          <Link to="/admin/settings">
            <Menu.Item as='a' onClick={() => setVisible(false)}>
              <Icon name='settings' />
              Settings
            </Menu.Item>
          </Link>
          <Logout>
            <Menu.Item as='a' onClick={() => setVisible(false)}>
              <Icon name='power off' />
              Logout
            </Menu.Item>
          </Logout>
        </Sidebar>

        <Sidebar.Pusher dimmed={visible}>
          <Segment basic>
            <Header as='h2'>
              <Icon className='link' onClick={() => setVisible(true)} name='sidebar' color='teal' size='small' />
              <Header.Content>Dashboard</Header.Content>
            </Header>
            <Divider/>
            <Outlet/>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
      {/* <div className="side-nav">
        <div className="nav-links">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/settings">Settings</Link>
          <Logout/>
        </div>
        <div className="container">
            <Outlet/>
        </div>
      </div> */}
    </div>
  )
}

export default AdminLayout