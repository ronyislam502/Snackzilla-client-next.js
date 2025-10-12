"use client";

import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white p-10 flex flex-col items-center sm:flex-row sm:justify-between sm:items-start">
      <aside className="text-center sm:text-left mb-6 sm:mb-0">
        <Image
          src="https://i.postimg.cc/gjhSbS06/resturent.png"
          height={100}
          width={120}
          className="rounded-lg mx-auto sm:mx-0"
          alt="logo"
        />
        <p className="mt-4">
          ACME Industries Ltd.
          <br />
          Providing reliable tech since 1992
        </p>
      </aside>

      <nav className="text-center sm:text-left mb-6 sm:mb-0">
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover block">Branding</a>
        <a className="link link-hover block">Design</a>
        <a className="link link-hover block">Marketing</a>
        <a className="link link-hover block">Advertisement</a>
      </nav>

      <nav className="text-center sm:text-left mb-6 sm:mb-0">
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover block">About us</a>
        <a className="link link-hover block">Contact</a>
        <a className="link link-hover block">Jobs</a>
        <a className="link link-hover block">Press kit</a>
      </nav>

      <nav className="text-center sm:text-left">
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover block">Terms of use</a>
        <a className="link link-hover block">Privacy policy</a>
        <a className="link link-hover block">Cookie policy</a>
      </nav>
    </footer>
  );
};

export default Footer;
