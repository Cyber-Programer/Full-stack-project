import React from 'react'

const NavSmall = () => {
    return (
        <div className="w-full h-[150px] relative overflow-hidden z-10">
          <div className="w-full h-full bg-[#040612ec] ">
          </div>
          <div className="absolute top-[-7rem] md:top-[-5rem] left-[-21rem] md:left-[-24rem] rotate-200 rounded-full filter blur-lg">
            <img
              src="/assets/navLeft.svg"
              alt="img"
              className=" rounded-full filter blur-lg"
            />
          </div>
          <div className="absolute top-[-8rem] right-[-22rem] ">
            <img
              src="/assets/navRight.svg"
              className="opacity-50"
              alt=""
            />
          </div>
    
          {/* Header text */}
        </div>
      );
}

export default NavSmall