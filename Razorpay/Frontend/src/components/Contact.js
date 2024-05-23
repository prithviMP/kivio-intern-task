import './Contact.css';
import React, { useState } from 'react';
function Contact()
{
    const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const mailtoLink = `mailto:xyz@gmail.com?subject=Message from ${name}&body=${message}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="contact-section">
      <div className="contact-left">
        <h2>Contact Us</h2>
        <p>Phone: (123) 456-7890</p>
        <p>Email: info@socialwelfareprogram.org</p>
      </div>
      <div className="contact-right">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
export default Contact;