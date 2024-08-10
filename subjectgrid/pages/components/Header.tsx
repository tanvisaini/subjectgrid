import logo from '../../public/vial-logo.svg';
import Image from 'next/image';

const Header = () => {
    return (
        <div>
            <Image src="/vial-logo.svg" width={100} height={100} alt="vial logo" />
        </div>
    );
};

export default Header;