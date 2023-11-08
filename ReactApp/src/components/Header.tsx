const Header = () => {
    return (
        <header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', // Aligns items on the main axis
            height: '80px',
            padding: '0 20px',
            backgroundColor: 'black',
            color: 'white',
            border: '4px solid black'
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 style={{ margin: '0', fontSize: '3em' }}>Formula One</h1>
            </div>
            <ul style={{
                listStyle: 'none',
                display: 'flex',
                margin: '0',
                padding: '0',
                gap: '20px', // Adds space between the links
            }}>
                <li><a href="#" style={{ textDecoration: 'none', color: 'white' }}>API</a></li>
                <li><a href="" style={{ textDecoration: 'none', color: 'white' }}>Game</a></li>
                <li><a href="" style={{ textDecoration: 'none', color: 'white' }}>Documentation</a></li>
                <li><a href="" style={{ textDecoration: 'none', color: 'white' }}>About</a></li>
            </ul>
        </header>
    )
}
export default Header;
