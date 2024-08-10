import logo from '../../public/vial-logo.svg';
import Image from 'next/image';

const Header = () => {
    return (
        <div className="flex font-radio bg-slate-300 p-2 justify-between flex-row ">
            <Image src="/vial-logo.svg" width={100} height={100} alt="vial logo" />
            <p className="font-radio text-2xl mt-2"> HOME </p>
        </div>
    );
};

export default Header;