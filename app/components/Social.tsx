import React, { useState } from "react";
import {
  GitBranch,
  Link,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

const socialLinks = [
  {
    icon: <GitBranch className="w-6 h-6" />,
    label: "GitHub",
    url: "https://github.com/AYSER02",
    color: "hover:text-purple-600 dark:hover:text-purple-400",
  },
  {
    icon: <Link className="w-6 h-6" />,
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/ayser-ahmed-bijapur",
    color: "hover:text-blue-600 dark:hover:text-purple-400",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    label: "Email",
    url: "mailto:ayser.b@gmail.com",
    color: "hover:text-red-500 dark:hover:text-purple-400",
  },
  {
    icon: <Phone className="w-6 h-6" />,
    label: "Phone",
    url: "tel:+919004063414",
    color: "hover:text-green-500 dark:hover:text-purple-400",
  },
];

const ConnectWithMe = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyPhoneNumber = (phoneNumber: string) => {
    navigator.clipboard.writeText(phoneNumber).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
    });
  };

  return (
    <div className="max-w-2xl mx-auto sm:p-8 p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Connect With Me
      </h1>

      <div className="grid gap-4">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.label === "Phone" ? undefined : link.url}
            onClick={link.label === "Phone" ? (e) => { e.preventDefault(); handleCopyPhoneNumber(link.url.replace("tel:", "")); } : undefined}
            target={link.label === "Phone" ? undefined : "_blank"}
            rel={link.label === "Phone" ? undefined : "noopener noreferrer"}
            className={`flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 
              transition-all duration-300 hover:shadow-lg ${link.color}
              bg-white/80 dark:bg-gray-700/80 group`}
          >
            <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-600 group-hover:scale-110 transition-transform">
              {link.icon}
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                {link.label}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {link.url}
              </p>
            </div>
            <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>

      {copied && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          Phone number copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default ConnectWithMe;