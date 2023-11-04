function Footer(){

    const year = Date(Date.now()).split(" ")[3]

    return (
        <footer>
            <p className="footerText">© {year} - Made with ❤️ by <a href="https://github.com/capelosini" target="blank">capelosini</a></p>
        </footer>
    )
}


export default Footer