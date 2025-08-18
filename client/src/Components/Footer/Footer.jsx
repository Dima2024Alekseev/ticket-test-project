import "./style.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p>© {new Date().getFullYear()} Ticket System. Все права защищены</p>
            </div>
        </footer>
    );
};

export default Footer;