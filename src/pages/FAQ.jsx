import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is RescueBites?",
    answer: "RescueBites is a community platform that connects food donors and recipients, promotes sustainable food sharing, and supports local initiatives."
  },
  {
    question: "Who can use RescueBites?",
    answer: "Anyone! Whether you're a donor, a recipient, or someone who wants to contribute to reducing food waste — RescueBites welcomes all."
  },
  {
    question: "Is using RescueBites free?",
    answer: "Yes, RescueBites is completely free to use for individuals and organizations."
  },
  {
    question: "How do I post in the community forum?",
    answer: "Just log in, navigate to the Community section, and share your post. You can also reply to others, like posts, and contribute meaningfully."
  },
  {
    question: "How do I become a food donor?",
    answer: "Register as a donor, fill in your profile, and start posting available food. Our recipients or volunteers will reach out to coordinate pickup or delivery."
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full">
            <HelpCircle className="w-6 h-6 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 mt-2">Here’s everything you need to know about RescueBites.</p>
      </motion.div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{ height: "auto" }}
            className="border border-gray-200 rounded-xl p-4 bg-white shadow-md"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center text-left text-gray-800 font-medium focus:outline-none"
            >
              <span>{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-blue-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 text-gray-600"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
