import React, { useEffect, useState } from "react";
import HomeHero from "./sections/HomeHero";
import AboutSection from "./sections/AboutSection";
import ServicesSection from "./sections/ServicesSection";
import ContactSection from "./sections/ContactSection";
import axios from "axios";


const Section = ({ id, title, bgColor }) => {
  return (
    <section
      id={id}
      className={`h-screen flex items-center justify-center ${bgColor}`}
    >
      <h1 className="text-4xl font-bold text-white">{title}</h1>
    </section>
  );
};

const Sections = () => {
  const [customerCount, setCustomerCount] = useState(null);

  useEffect(() => {
    let mounted = true;
  
    const fetchCount = async () => {
      try {
        // Preferred: backend returns { count: number }
        const res = await axios.get("https://rapidm2b.onrender.com/api/users/count");
  
        if (mounted && res?.data?.count != null) {
          setCustomerCount(res.data.count);
          return;
        }
  
        // Fallback: if API returns array
        if (mounted && Array.isArray(res?.data)) {
          setCustomerCount(res.data.length);
        }
      } catch (err) {
        // Last fallback — try users list endpoint
        try {
          const res2 = await axios.get("https://rapidm2b.onrender.com/api/users");
  
          if (mounted && Array.isArray(res2?.data)) {
            setCustomerCount(res2.data.length);
          }
        } catch (e) {
          console.warn("Failed to load customer count.");
          setCustomerCount(null);
        }
      }
    };
  
    fetchCount();
    return () => (mounted = false);
  }, []);

  const formatCustomerCount = (count) => {
    if (count == null) return "...";
  
    if (count < 10) return `${count}`;
  
    const buckets = [10, 50, 100, 500, 1000, 5000];
    let chosen = buckets[0];
  
    for (let i = 0; i < buckets.length; i++) {
      if (count >= buckets[i]) chosen = buckets[i];
      else break;
    }
    return `${chosen}+`;
  };
  
  

  return (
    <div>
      <HomeHero customerText={`(${formatCustomerCount(customerCount)})`} />

      <div className="h-0.5 w-9/10 bg-gray-300 mt-15 mx-auto"></div>
      <AboutSection />
      <div className="h-0.5 w-9/10 bg-gray-300 mt-20 mx-auto"></div>
      <ServicesSection />
      <div className="h-0.5 w-9/10 bg-gray-300 mt-20 mx-auto"></div>
      <ContactSection />
    </div>
  );
};

export default Sections;
