import React from "react";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  if (isHomePage) {
    // 👉 Your BIG FOOTER (the code you pasted)
    return (
      <div className='w-full bg-[#312d2d] text-white md:content-center md:h-110 xl:block'>
        <div className='block md:flex justify-between px-6 lg:px-18 xl:upper xl:flex xl:px-30 xl:gap-56 xl:py-12'>
          <div className='Logo content-center'>
            <div className='content-center py-4 text-center'>
              <h1 className='text-3xl font-extrabold sm:text-4xl'>PrepVio</h1>
              <p>v 1.0.0</p>
            </div>
            <div className='px-8 md:hidden'>
              <hr />
            </div>
          </div>

          <div className='Contact'>
            <div className='text-center py-4 md:content-center md:text-left'>
              <h1 className='mb-3 text-2xl font-semibold'>Contact Us</h1>
              <div className='text-lg'>
                <p>Address: [Your Address]</p>
                <p>Email: support@[yourwebsite].com</p>
                <p>Phone: [+XX-XXXXXXXXXX]</p>
              </div>
            </div>
            <div className='px-8 md:hidden'>
              <hr />
            </div>
          </div>

          <div className='other-links'>
            <div className='text-center py-4 md:content-center md:text-left'>
              <h1 className='mb-3 text-2xl font-semibold'>Other Links</h1>
              <div className='text-lg'>
                <p>Our Team</p>
                <p>Feedback</p>
                <p>Terms & Conditions</p>
              </div>
            </div>
            <div className='px-8 md:hidden'>
              <hr />
            </div>
          </div>
        </div>

        <div className='hidden md:block md:px-8 lg:px-17 xl:block xl:px-30'>
          <hr />
        </div>

        <div className='text-white mt-6 text-center'>
          <div>
            <h1 className='text-2xl'>Follow Us</h1>
            {/* 👉 keep your social icons here (unchanged) */}
          </div>
          <h2 className='text-xl mt-2'>Copyright. All rights Reserved</h2>
        </div>
      </div>
    );
  }

  // 👉 SMALL FOOTER for all other pages
  return (
    <div className='w-full bg-[#312d2d] text-white py-4 text-center'>
      <h1 className='text-lg font-bold'>PrepVio</h1>
      <p className='text-sm'>© 2025 PrepVio. All Rights Reserved.</p>
    </div>
  );
}

export default Footer;
