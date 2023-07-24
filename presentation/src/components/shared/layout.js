import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Layout(props){
   return( <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Oriflame</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/products">Products</Nav.Link>
            <Nav.Link href="/customers">Customers</Nav.Link>
            <NavDropdown title="Order Management" id="basic-nav-dropdown">
              <NavDropdown.Item href="/add">Company Order</NavDropdown.Item>
              <NavDropdown.Item href="/add-customerOrder">
               Customer Order
              </NavDropdown.Item>          
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    <Container>
        {props.children}
    </Container>
    </>)
}

export default Layout;