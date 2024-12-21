import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../reusable/Button';
import FormInput from '../reusable/FormInput';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import $ from 'jquery';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = document.querySelector('#register');
    const formData = new FormData(form);
    const register = Object.fromEntries(formData.entries());

    if (!validateEmail(register.email)) {
      toast.error('Please enter a valid email.', {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark"
      });
      return;
    }

    setIsLoading(true);

    const name = register.name;

    $.ajax({
      type: 'post',
      url: 'https://carenthusiastkenya.co.ke/ianoemail.php',
      data: register,
      success: function (response) {
        console.log(response);

        if (response.trim() === '1') {
          toast.success(`🎉 ${name} your Email has been sent successfully!`, {
            position: toast.POSITION.TOP_CENTER,
            theme: "dark",
            className: 'black-toast', 
            onClose: () => {
              setFormData({
                name: '',
                email: '',
                message: ''
              });
              form.reset();
            }
          });
        } else {
          toast.error('Failed to send email.', {
            position: toast.POSITION.TOP_CENTER,
            theme: "dark"
          });
        }
      },
      error: function (error) {
        console.error('Error:', error);
        toast.error(
          <>
            Error! <u>{name}</u> had an issue. Contact me at iankangacha@gmail.com.
          </>,
          {
          position: toast.POSITION.TOP_CENTER,
          theme: "dark"
        });
      },
      complete: function () {
        setIsLoading(false);
      }
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="w-full lg:w-1/2">
      <div className="leading-loose">
        <form
          onSubmit={handleSubmit}
          className="max-w-xl m-4 p-6 sm:p-10 bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-xl text-left"
          id="register"
        >
          <p className="font-general-medium text-primary-dark dark:text-primary-light text-2xl mb-8">
            Contact Form
          </p>
          <FormInput
            inputLabel="Full Name"
            labelFor="name"
            inputType="text"
            inputId="name"
            inputName="name"
            placeholderText="Your Name"
            ariaLabelName="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <FormInput
            inputLabel="Email"
            labelFor="email"
            inputType="email"
            inputId="email"
            inputName="email"
            placeholderText="Your email"
            ariaLabelName="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="mt-6">
            <label
              className="block text-lg text-primary-dark dark:text-primary-light mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
              id="message"
              name="message"
              cols="14"
              rows="6"
              aria-label="Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="font-general-medium w-40 px-4 py-2.5 text-white text-center font-medium tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg mt-6 duration-500">
            <Button
              title="Send Message"
              type="submit"
              aria-label="Send Message"
            />
          </div>

          {isLoading && (
            <div className="flex justify-center items-center mt-6">
              <ClipLoader color="white" loading={true} css={css} size={35} />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
