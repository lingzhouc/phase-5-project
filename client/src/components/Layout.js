import Navbar from "./Navbar"

function Layout() {
    return (
        <div> 
            <Header />
            <Navbar />
            <Outlet context={context} />
            <Footer />
        </div>
    )
}

export default Layout