import logo from '../../public/vial-logo.svg';
import Image from 'next/image';

const Header = () => {
    return (
        <div className="flex font-radio p-5 flex-row">
            <Image src="/vial-logo.svg" width={80} height={80} alt="vial logo" />
            <p className="font-poppins text-lg ml-2 mt-2"> Subject List </p>
        </div>
    );
};

export default Header;