
const Navbar = () => {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between pl-6 py-2 border-[#2C593C6B] border-b-[1px] bg-[#fff0e0]">
            <img src="/kesaribeej.png" className="w-[80px] h-[60px]" alt="Kesari beej Logo"/>
            <div 
                className="flex items-center justify-center px-4 py-1 text-white font-semibold text-sm"
                style={{
                    backgroundImage: `url("/ribbon.png")`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    minWidth: '250px',
                    height: '60px'
                }}
            >
                <p className="text-center text-[#2C593C] font-semibold">Crop Guide / फसल मार्गदर्शिका</p>
            </div>
        </div>
    )
}

export default Navbar;