const ProfileCard = () => {
    const certificates = [
      {
        name: "Introduction to Data Science ",
        url: "https://coursera.org/share/f32f232ffde0791eb66dce5cd0edde12"
      },
      {
        name: "Tools for Data Science",
        url: "https://coursera.org/share/023cb98a558da07d5ca785af763cdcbe"
      },
      {
        name: "Data Science Methodology",
        url: "https://coursera.org/share/f32f232ffde0791eb66dce5cd0edde12"
      },
      {
        name: "Databases and SQL for Data Science",
        url: "https://coursera.org/share/9a16adcabf3ba5f45b262df183940bfc"
      },
      {
        name: "Python for Data Science, AI & Development",
        url: "https://coursera.org/share/c6fef4e3ffcdeda6b1b5ce4e4a02a869"
      },
      {
        name: "Python Hands-on Practice",
        url: "https://www.linkedin.com/learning/certificates/de7097495e89d47f12b81958772538b65c201f1595f555358ed7db89cb1d1cf6?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B%2FJcBq02CRDy8VhzSzGzXSw%3D%3D"
      },
      {
        name: "Practice it: Python Data Structures",
        url: "https://www.linkedin.com/learning/certificates/e38bfb466d0522e5f012bc39a46d63e1eb8898245ef5b4a22505be39fd147056?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B%2FJcBq02CRDy8VhzSzGzXSw%3D%3D"
      },
      {
        name: "Full-Stack Deep Learning with Python",
        url: "https://www.linkedin.com/learning/certificates/404bb6ae1838df1ce17ccf284226f22a27d09633cb3a42f22cf65523bb7ef829?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B%2FJcBq02CRDy8VhzSzGzXSw%3D%3D"
      },
      {
        name: "Career Essentials in Generative AI ",
        url: "https://www.linkedin.com/learning/certificates/5e3972adf6e58bdb659d9d9013df650c34b4c656ab2d3276c3235d26108ef2d4?trk=share_certificate"
      }
    ];

    return (
      <div className="p-8 space-y-4">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">Ayser Ahmed Bijapur</h2>
            <p className="text-gray-600 dark:text-gray-300">
              AI Engineer | Data Science Enthusiast | Freelance - Outlier AI
            </p>
          </div>
        </div>
  
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
         Computer Engineering graduate with a strong foundation in artificial intelligence, machine learning, and software engineering.
         Hands-on experience in AI model training, evaluation, and quality analysis, along with building full-stack applications and data-driven automation tools.
         Proficient in Python, JavaScript, and TypeScript, with experience using modern frameworks, databases, and cloud-based tools.
         Actively seeking an AI Engineer role to apply machine learning, data analysis, and scalable system design to real-world problems.
        </p>

  
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Current Roles</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
            <li>Nielsen | Data Co-Ordinator |--| Outlier AI | Freelancer</li>
          </ul>
        </div>
  
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Technical Skills and Interests</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
            <li>
              <strong>Languages:</strong>
              <ul className="list-none list-inside ml-4">
                <li>→ C</li>
                <li>→ C++</li>
                <li>→ JavaScript</li>
                <li>→ TypeScript</li>
                <li>→ Java</li>
                <li>→ Python</li>
              </ul>
            </li>
            <li>
              <strong>Frameworks & Libraries:</strong>
              <ul className="list-none list-inside ml-4">
                <li>→ Node.js</li>
                <li>→ Express.js</li>
                <li>→ React.js</li>
                <li>→ Next.js</li>
                <li>→ WebSockets</li>
                <li>→ TailwindCSS</li>
              </ul>
            </li>
            <li>
              <strong>Tools:</strong>
              <ul className="list-none list-inside ml-4">
                <li>→ Git/GitHub</li>
                <li>→ Google Colab</li>
                <li>→ Docker</li>
                <li>→ AWS</li>
              </ul>
            </li>
            <li>
              <strong>Databases:</strong>
              <ul className="list-none list-inside ml-4">
                <li>→ MySQL</li>
                <li>→ PostgreSQL</li>
                <li>→ MongoDB</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Certifications</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-200">
            {certificates.map((cert, index) => (
              <li key={index}>
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline cursor-pointer"
                >
                  → {cert.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    );
  };
  
  export default ProfileCard;
  