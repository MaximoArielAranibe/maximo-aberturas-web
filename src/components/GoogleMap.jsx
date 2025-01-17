import React from 'react';

const GoogleMap = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.1656199010017!2d-60.56013682449095!3d-33.88538817322016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b9b536a92cfe67%3A0x5e9a011c40582540!2sMaximo%20Aberturas!5e0!3m2!1sen!2sus!4v1737127586218!5m2!1sen!2sus"
        width="260"
        height="200"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
