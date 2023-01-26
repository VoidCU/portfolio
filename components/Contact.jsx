import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";
const Contact = () => {
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    msg: "",
  });

  let name, value;
  const postUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUserData({ ...userData, [name]: value });
  };

  const submitData = async (event) => {
    event.preventDefault();
    const { name, phone, email, subject, msg } = userData;
    if (name && phone && email && subject && msg) {
      try {
        const res = await fetch(
          "https://portfoilo-dd5cf-default-rtdb.firebaseio.com/submittedForm.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              phone,
              email,
              subject,
              msg,
            }),
          }
        );

        if (res) {
          setUserData({
            name: "",
            phone: "",
            email: "",
            subject: "",
            msg: "",
          });
          alert("Data stored");
        } else {
          alert("Fill the data");
        }
      } catch (error) {
        console.error(error);
        alert(
          "An error occurred while submitting the form. Please try again later."
        );
      }
    } else {
      alert("Fill all the data field");
    }
  };

  function sendEmail() {
    window.location = "mailto:sarojprasadmainali@gmail.com";
  }

  return (
    <div id="contact" className="w-full lg:h-screen py-8">
      <div className="max-w-[1240px] m-auto px-2 py-16  w-full">
        <p className="text-xl tracking-widest uppercase text-[#5651e5]">
          Contact
        </p>
        <h2 className="py-4">Get In Touch</h2>
        <div className="grid lg:grid-cols-5 gap-8">
          {/* left */}
          <div className="col-span-3 lg:col-span-2 w-full h-full shadow-xl shadow-gray-400 rounded-xl p-4">
            <div className="lg:p-4 h-full">
              <div>
                <img
                  className="rounded-xl hover:scale-105 ease-in duration-300"
                  src="https://img.freepik.com/free-photo/close-up-employee-with-computer-keyboard_1098-2019.jpg?w=1380&t=st=1674718979~exp=1674719579~hmac=56e49d2509dd80079c763a7816af496929ad58263efa5964ba006be4a1388a9b"
                  alt="/"
                />
              </div>
              <div>
                <h2 className="py-2">Saroj Prasad Mainali</h2>
                <p>AI enthusiast</p>
                <p className="py-4">
                  Ready to build and train Models. Be sure Dataset is Available.
                </p>
              </div>
              <div>
                <p className="uppercase pt-8">Connect with Me</p>
                <div className="flex items-center justify-between py-4">
                  <Link href="https://www.linkedin.com/in/saroj-prasad-mainali/">
                    <div className="rounded-full shadow-lg shadow-gray-400 p-6 cursir-pointer hover:scale-110 ease-in duration-300 ">
                      <FaLinkedinIn />
                    </div>
                  </Link>

                  <Link href="https://github.com/VoidCU">
                    <div className="rounded-full shadow-lg shadow-gray-400 p-6 cursir-pointer hover:scale-110 ease-in duration-300 ">
                      <FaGithub />
                    </div>
                  </Link>
                  <div
                    onClick={sendEmail}
                    className="rounded-full shadow-lg shadow-gray-400 p-6 cursir-pointer hover:scale-110 ease-in duration-300 "
                  >
                    <AiOutlineMail />
                  </div>
                  <a href="./../public/assets/output.pdf" download="Resume.pdf">
                    <div className="rounded-full shadow-lg shadow-gray-400 p-6 cursir-pointer hover:scale-110 ease-in duration-300 ">
                      <BsFillPersonLinesFill />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* right */}

          <div className="col-span-3 w-full h-auto shadow-xl shadow-gray-400 rounded-xl lg:p-4">
            <div className="p-4">
              <form action="" id="contactForm" method="POST">
                <div className="grid md:grid-cols-2 gap-4 w-full py-2">
                  <div className="flex flex-col">
                    <label className="uppercase text-sm py-2" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="border-2 rounded-lg p-3 flex border-gray-300"
                      name="name"
                      value={userData.name}
                      onChange={postUserData}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="uppercase text-sm py-2" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phone"
                      className="border-2 rounded-lg p-3 flex border-gray-300"
                      name="phone"
                      value={userData.phone}
                      onChange={postUserData}
                    />
                  </div>
                </div>
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="border-2 rounded-lg p-3 flex border-gray-300"
                    name="email"
                    value={userData.email}
                    onChange={postUserData}
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="border-2 rounded-lg p-3 flex border-gray-300"
                    name="subject"
                    value={userData.subject}
                    onChange={postUserData}
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2" htmlFor="msg">
                    Message
                  </label>
                  <textarea
                    id="msg"
                    className="border-2 rounded-lg p-3 flex border-gray-300"
                    rows="6"
                    name="msg"
                    value={userData.msg}
                    onChange={postUserData}
                  />
                </div>
                <button
                  onClick={submitData}
                  className="p-4 w-full text-gray-100  mt-4 bg-[#5651e5]"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-12">
          <Link href="/">
            <div className="rounded-full shadow-lg shadow-gray-400 p-4 cursor-pointer hover:scale-110 ease-in duration-300">
              <HiOutlineChevronDoubleUp
                size={30}
                className="m-auto text-[#5651e5]"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
